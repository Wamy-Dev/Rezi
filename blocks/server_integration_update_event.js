module.exports = {
    name: "Server Integration Update [Event]",

    description: "When a server integration is updated, this event will trigger.",

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
            "id": "server",
            "name": "Server",
            "description": "Type: Object\n\nDescription: The server whose integration was updated.",
            "types": ["object"]
        },
        {
            "id": "server_integration",
            "name": "Server Integration (UNSTABLE)",
            "description": "Type: Object, Undefined\n\nDescription: The updated server integration. (This can be UNSTABLE and INACCURATE and can return an undefined value)",
            "types": ["object", "undefined"]
        },
        {
            "id": "user",
            "name": "User (UNSTABLE)",
            "description": "Type: Object, Undefined\n\nDescription: The user who updated the server integration. (This can be UNSTABLE and INACCURATE and can return an undefined value)",
            "types": ["object", "undefined"]
        },
        {
            "id": "reason",
            "name": "Reason (UNSTABLE)",
            "description": "Type: Text\n\nDescription: The reason for updating the server integration if any. (This can be UNSTABLE and INACCURATE)",
            "types": ["text"]
        }
    ],

    code(cache) {
        const unstable_outputs = this.GetOptionValue("unstable_outputs", cache) + "";

        this.events.on("guildIntegrationsUpdate", async server => {
            const current = Date.now() - 30000;

            this.StoreOutputValue(server, "server", cache);

            if(unstable_outputs == "yes" && server && server.me && server.me.hasPermission("VIEW_AUDIT_LOG")) {
                const entry = await server.fetchAuditLogs({type: "INTEGRATION_UPDATE", limit: 5}).then(audit => audit.entries.find(a => a.createdTimestamp >= current));
                if(entry) {
                    const server_integration = entry.target;
                    if(server_integration) this.StoreOutputValue(server_integration, "server_integration", cache);

                    const executor = entry.executor;
                    if(executor) this.StoreOutputValue(executor, "user", cache);

                    this.StoreOutputValue(entry.reason || "", "reason", cache);
                }
            }

            this.RunNextBlock("action", cache);
        });
    }
}