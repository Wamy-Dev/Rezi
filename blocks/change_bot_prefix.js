module.exports = {
    name: "Change Bot Prefix",

    description: "Changes the bot prefix to be used in commands. Supports server prefix too.",

    category: "Bot Stuff",

    inputs: [
        {
            "id": "action",
            "name": "Action",
            "description": "Acceptable Types: Action\n\nDescription: Executes this block.",
            "types": ["action"]
        },
        {
            "id": "prefix",
            "name": "New Prefix",
            "description": "Acceptable Types: Text, Unspecified\n\nDescription: The new prefix to change.",
            "types": ["text", "unspecified"],
            "required": true
        },
        {
            "id": "server",
            "name": "Server",
            "description": "Acceptable Types: Object, Unspecified\n\nDescription: Put a server here to change its prefix instead of the bot's main prefix. (OPTIONAL)",
            "types": ["object", "unspecified"]
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
        const prefix = this.GetInputValue("prefix", cache) + "";
        const server = this.GetInputValue("server", cache, true);

        this.setPrefix(prefix, server ? server.value : false);

        this.RunNextBlock("action", cache);
    }
}