module.exports = {
    name: "Message Update [Event]",

    description: "When a server is updated (name, region, AFK channel, etc...), this event will trigger.",

    category: "Events",

    auto_execute: true,

    inputs: [],

    options: [
        {
            "id": "unstable_outputs",
            "name": "Unstable Outputs",
            "description": "Description: Process unstable outputs. It is not recommended due to low performance and accuracy, as values are not provided directly by the Discord API, using the server Audit Log instead.",
            "type": "SELECT",
            "options": {
                "no": "No",
                "yes": "Yes (Not Recommended)",
            }
        }
    ],

    outputs: [
        {
            "id": "action",
            "name": "Action",
            "description": "Type: Action\n\nDescription: Executes the following blocks when this block finishes its task.",
            "types": ["action"]
        },
        {
            "id": "old_server",
            "name": "Old Server",
            "description": "Type: Object\n\nDescription: The server before the update.",
            "types": ["object"]
        },
        {
            "id": "new_server",
            "name": "New Server",
            "description": "Type: Object\n\nDescription: The server after the update.",
            "types": ["object"]
        },
        {
            "id": "user",
            "name": "User (UNSTABLE)",
            "description": "Type: Object, Undefined\n\nDescription: The user who updated the server. (This can be UNSTABLE and INACCURATE and can return an undefined value)",
            "types": ["object", "undefined"]
        },
        {
            "id": "reason",
            "name": "Reason (UNSTABLE)",
            "description": "Type: Text\n\nDescription: The reason for updating the server if any. (This can be UNSTABLE and INACCURATE)",
            "types": ["text"]
        }
    ],

    code(cache) {
        const unstable_outputs = this.GetOptionValue("unstable_outputs", cache) + "";

        this.events.on("guildUpdate", async (oldServer, newServer) => {
            const current = Date.now() - 30000;

            this.StoreOutputValue(oldServer, "old_server", cache);
            this.StoreOutputValue(newServer, "new_server", cache);

            if(unstable_outputs == "yes" && newServer.me && newServer.me.hasPermission("VIEW_AUDIT_LOG")) {
                const entry = await newServer.fetchAuditLogs({type: "GUILD_UPDATE", limit: 5}).then(audit => audit.entries.find(a => a.target.id == newServer.id && a.createdTimestamp >= current));
                if(entry) {
                    const executor = entry.executor;
                    if(executor) this.StoreOutputValue(executor, "user", cache);

                    this.StoreOutputValue(entry.reason || "", "reason", cache);
                }
            }
            
            this.RunNextBlock("action", cache);
        });
    }
}