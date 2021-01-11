module.exports = {
    name: "Delete Server Emoji",

    description: "Deletes the server emoji.",

    category: "Server Emoji Stuff",

    inputs: [
        {
            "id": "action",
            "name": "Action",
            "description": "Acceptable Types: Action\n\nDescription: Executes this block.",
            "types": ["action"]
        },
        {
            "id": "server_emoji",
            "name": "Server Emoji",
            "description": "Acceptable Types: Object, Unspecified\n\nDescription: The server emoji to delete.",
            "types": ["object", "unspecified"],
            "required": true
        },
        {
            "id": "reason",
            "name": "Reason",
            "description": "Acceptable Types: Text, Unspecified\n\nDescription: The reason for deleting the server emoji. This will appear in Audit Log of the server. (OPTIONAL)",
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
        const server_emoji = this.GetInputValue("server_emoji", cache);
        const reason = this.GetInputValue("reason", cache);

        server_emoji.delete(reason).then(() => {
            this.RunNextBlock("action", cache);
        });
    }
}