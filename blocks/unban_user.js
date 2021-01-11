module.exports = {
    name: "Unban User",

    description: "Unbans an user from the server.",

    category: "Server Stuff",

    inputs: [
        {
            "id": "action",
            "name": "Action",
            "description": "Acceptable Types: Action\n\nDescription: Executes this block.",
            "types": ["action"]
        },
        {
            "id": "server",
            "name": "Server",
            "description": "Acceptable Types: Object, Unspecified\n\nDescription: The server to unban the user.",
            "types": ["object", "unspecified"],
            "required": true
        },
        {
            "id": "user",
            "name": "User",
            "description": "Acceptable Types: Object, Text, Unspecified\n\nDescription: The user to unban from the server. Supports Member object and User ID.",
            "types": ["object", "text", "unspecified"],
            "required": true
        },
        {
            "id": "reason",
            "name": "Reason",
            "description": "Acceptable Types: Text, Unspecified\n\nDescription: The reason for unbanning the user from the server. This will appear in Audit Log of the server. (OPTIONAL)",
            "types": ["text", "unspecified"]
        }
    ],

    options: [],

    outputs: [
        {
            "id": "action",
            "name": "Action",
            "description": "Type: Action\n\nDescription: Executes the following blocks when this block finishes its task.",
            "types": ["action"]
        }
    ],

    code(cache) {
        const server = this.GetInputValue("server", cache);
        const user = this.GetInputValue("user", cache);
        const reason = this.GetInputValue("reason", cache);

        server.members.unban(user, reason).then(() => {
            this.RunNextBlock("action", cache);
        });
    }
}