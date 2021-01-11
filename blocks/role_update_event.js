module.exports = {
    name: "Role Update [Event]",

    description: "When a role is updated, this event will trigger.",

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
            "id": "old_role",
            "name": "Old Role",
            "description": "Type: Object\n\nDescription: The role before the update.",
            "types": ["object"]
        },
        {
            "id": "new_role",
            "name": "New Role",
            "description": "Type: Object\n\nDescription: The role after the update.",
            "types": ["object"]
        },
        {
            "id": "user",
            "name": "User (UNSTABLE)",
            "description": "Type: Object, Undefined\n\nDescription: The user who updated the role. (This can be UNSTABLE and INACCURATE and can return an undefined value)",
            "types": ["object", "undefined"]
        },
        {
            "id": "reason",
            "name": "Reason (UNSTABLE)",
            "description": "Type: Text\n\nDescription: The reason for updating the role if any. (This can be UNSTABLE and INACCURATE)",
            "types": ["text"]
        }
    ],

    code(cache) {
        const unstable_outputs = this.GetOptionValue("unstable_outputs", cache) + "";

        this.events.on("roleUpdate", async (old_role, new_role) => {
            const current = Date.now() - 30000;

            this.StoreOutputValue(old_role, "old_role", cache);
            this.StoreOutputValue(new_role, "new_role", cache);

            const server = new_role.guild;

            if(unstable_outputs == "yes" && server && server.me && server.me.hasPermission("VIEW_AUDIT_LOG")) {
                const entry = await server.fetchAuditLogs({type: "ROLE_UPDATE", limit: 5}).then(audit => audit.entries.find(a => a.target.id == new_role.id && a.createdTimestamp >= current));
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