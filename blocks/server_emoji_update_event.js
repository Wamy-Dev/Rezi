module.exports = {
    name: "Server Emoji Update [Event]",

    description: "When an emoji is updated in a server, this event will trigger.",

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
            "id": "server_emoji",
            "name": "Server Emoji",
            "description": "Type: Object\n\nDescription: The updated server emoji.",
            "types": ["object"]
        },
        {
            "id": "old_server_emoji",
            "name": "Old Server Emoji",
            "description": "Type: Object\n\nDescription: The server emoji before the update.",
            "types": ["object"]
        },
        {
            "id": "new_server_emoji",
            "name": "New Server Emoji",
            "description": "Type: Object\n\nDescription: The server emoji after the update.",
            "types": ["object"]
        },
        {
            "id": "user",
            "name": "User (UNSTABLE)",
            "description": "Type: Object, Undefined\n\nDescription: The user who updated the server emoji. (This can be UNSTABLE and INACCURATE and can return an undefined value)",
            "types": ["object", "undefined"]
        },
        {
            "id": "reason",
            "name": "Reason (UNSTABLE)",
            "description": "Type: Text\n\nDescription: The reason for updating the server emoji if any. (This can be UNSTABLE and INACCURATE)",
            "types": ["text"]
        }
    ],

    code(cache) {
        const unstable_outputs = this.GetOptionValue("unstable_outputs", cache) + "";

        this.events.on("emojiUpdate", async (old_server_emoji, new_server_emoji) => {
            const current = Date.now() - 30000;

            this.StoreOutputValue(old_server_emoji, "old_server_emoji", cache);
            this.StoreOutputValue(new_server_emoji, "new_server_emoji", cache);

            const server = server_emoji.guild;

            if(unstable_outputs == "yes" && server && server.me && server.me.hasPermission("VIEW_AUDIT_LOG")) {
                const entry = await server.fetchAuditLogs({type: "EMOJI_DELETE", limit: 5}).then(audit => audit.entries.find(a => a.target.id == server_emoji.id && a.createdTimestamp >= current));
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