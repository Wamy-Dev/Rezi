module.exports = {
    name: "Create Server Emoji",

    description: "Creates a new emoji for the server.",

    category: "Server Emoji Stuff",

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
            "description": "Acceptable Types: Object, Unspecified\n\nDescription: The server to create this emoji.",
            "types": ["object", "unspecified"],
            "required": true
        },
        {
            "id": "emoji_image",
            "name": "Emoji Image",
            "description": "Acceptable Types: Text, Object, Unspecified\n\nDescription: The image for this emoji. Supports Image, image file path and URL.",
            "types": ["text", "object", "unspecified"],
            "required": true
        },
        {
            "id": "emoji_name",
            "name": "Emoji Name",
            "description": "Acceptable Types: Text, Unspecified\n\nDescription: The name for this emoji.",
            "types": ["text", "unspecified"],
            "required": true
        },
        {
            "id": "emoji_roles",
            "name": "Emoji Roles",
            "description": "Acceptable Types: List, Unspecified\n\nDescription: The list of roles to restrict this emoji. (OPTIONAL)",
            "types": ["list", "unspecified"]
        },
        {
            "id": "reason",
            "name": "Reason",
            "description": "Acceptable Types: Text, Unspecified\n\nDescription: The reason for creating this emoji. This will appear in Audit Log of the server. (OPTIONAL)",
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
        },
        {
            "id": "server_emoji",
            "name": "Server Emoji",
            "description": "Type: Object\n\nDescription: This server emoji created.",
            "types": ["object"]
        }
    ],

    code(cache) {
        const server = this.GetInputValue("server", cache);
        const emoji_image = this.GetInputValue("emoji_image", cache);
        const emoji_name = this.GetInputValue("emoji_name", cache);
        const emoji_roles = this.GetInputValue("emoji_roles", cache);
        const reason = this.GetInputValue("reason", cache);

        const data = {
            roles: emoji_roles,
            reason
        }

        Object.keys(data).forEach(key => {
            if([undefined, null, NaN].includes(data[key])) delete data[key];
        });

        server.emojis.create(emoji_image, emoji_name, data).then(server_emoji => {
            this.StoreOutputValue(server_emoji, "server_emoji", cache);
            this.RunNextBlock("action", cache);
        });
    }
}