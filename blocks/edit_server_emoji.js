module.exports = {
    name: "Edit Server Emoji",

    description: "Edits a server emoji.",

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
            "description": "Acceptable Types: Object, Unspecified\n\nDescription: The server emoji to edit.",
            "types": ["object", "unspecified"],
            "required": true
        },
        {
            "id": "emoji_name",
            "name": "Emoji Name",
            "description": "Acceptable Types: Text, Unspecified\n\nDescription: The new name for this emoji. (OPTIONAL)",
            "types": ["text", "unspecified"]
        },
        {
            "id": "emoji_roles",
            "name": "Emoji Roles",
            "description": "Acceptable Types: List, Unspecified\n\nDescription: The new list of roles to restrict this emoji. (OPTIONAL)",
            "types": ["list", "unspecified"]
        },
        {
            "id": "reason",
            "name": "Reason",
            "description": "Acceptable Types: Text, Unspecified\n\nDescription: The reason for editing this emoji. This will appear in Audit Log of the server. (OPTIONAL)",
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
        const emoji_name = this.GetInputValue("emoji_name", cache);
        const emoji_roles = this.GetInputValue("emoji_roles", cache);
        const reason = this.GetInputValue("reason", cache);

        const data = {
            name: emoji_name,
            roles: emoji_roles,
        }

        Object.keys(data).forEach(key => {
            if([undefined, null, NaN].includes(data[key])) delete data[key];
        });

        server_emoji.edit(data, reason).then(() => {
            this.RunNextBlock("action", cache);
        });
    }
}