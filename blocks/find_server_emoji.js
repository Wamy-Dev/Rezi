module.exports = {
    name: "Find Server Emoji",

    description: "Finds a server emoji.",

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
            "description": "Acceptable Types: Object, Unspecified\n\nDescription: The server to find the server emoji. If possible, use this input to avoid finding the emoji on an unintended server. (OPTIONAL)",
            "types": ["object", "unspecified"]
        },
        {
            "id": "search_value",
            "name": "Search Value",
            "description": "Acceptable Types: Text, Unspecified\n\nDescription: The value according to your choice in the \"Find Server Emoji By\" option.",
            "types": ["text", "unspecified"],
            "required": true
        }
    ],

    options: [
        {
            "id": "find_server_emoji_by",
            "name": "Find Server Emoji By",
            "description": "Description: The type of search for the server emoji.",
            "type": "SELECT",
            "options": {
                "id": "Server Emoji ID",
                "name": "Server Emoji Name",
                "url": "Server Emoji URL"
            }
        }
    ],

    outputs: [
        {
            "id": "action",
            "name": "Action",
            "description": "Acceptable Types: Action\n\nDescription: Executes the following blocks when this block finishes its task.",
            "types": ["action"]
        },
        {
            "id": "server_emoji",
            "name": "Server Emoji",
            "description": "Type: Object\n\nDescription: The server emoji found if possible.",
            "types": ["object"]
        }
    ],

    code(cache) {
        const server = this.GetInputValue("server", cache);
        const search_value = this.GetInputValue("search_value", cache);
        const find_server_emoji_by = this.GetOptionValue("find_server_emoji_by", cache);

        const emojis = server ? server.emojis.cache : this.client.emojis.cache;

        let result;
        switch(find_server_emoji_by) {
            case "id":
                result = emojis.get(search_value + "");
                break;
            case "name":
                result = emojis.find(c => c.name == search_value);
                break;
            case "url":
                result = emojis.find(c => c.url == search_value);
                break;
        }

        this.StoreOutputValue(result, "server_emoji", cache);
        this.RunNextBlock("action", cache);
    }
}