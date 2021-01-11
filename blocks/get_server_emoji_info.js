module.exports = {
    name: "Get Server Emoji Info",

    description: "Gets the server emoji information.",

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
            "description": "Acceptable Types: Object, Unspecified\n\nDescription: The server emoji to get the information.",
            "types": ["object", "unspecified"],
            "required": true
        }
    ],

    options: [
        {
            "id": "server_emoji_info",
            "name": "Server Emoji Info",
            "description": "Description: The server emoji information to get.",
            "type": "SELECT",
            "options": {
                1: "Is Server Emoji Animated? [Boolean]",
                2: "Server Emoji Created At [Date]",
                3: "Is Server Emoji Deletable By The Bot? [Boolean]",
                4: "Is Server Emoji Deleted? [Boolean]",
                5: "Server Emoji Server [Server]",
                6: "Server Emoji ID [Text]",
                7: "Server Emoji Identifier [Text]",
                8: "Is Server Emoji Managed By An External Service? [Boolean]",
                9: "Server Emoji Name [Text]",
                10: "Does Server Emoji Require Colons Surrounding It? [Boolean]",
                11: "Server Emoji Role List [List <Role>]",
                12: "Server Emoji URL [Text]",
                13: "Server Emoji Author [User]",
                14: "Server Emoji Mention [Text]",
                15: "Is Server Emoji Available? [Boolean]",
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
            "id": "result",
            "name": "Result",
            "description": "Type: Unspecified\n\nDescription: The information obtained from the server emoji.",
            "types": ["unspecified"]
        }
    ],

    async code(cache) {
        const server_emoji = this.GetInputValue("server_emoji", cache);
        const server_emoji_info = parseInt(this.GetOptionValue("server_emoji_info", cache));

        let result;
        switch(server_emoji_info) {
            case 1:
                result = server_emoji.animated;
                break;
            case 2:
                result = server_emoji.createdAt;
                break;
            case 3:
                result = server_emoji.deletable;
                break;
            case 4:
                result = server_emoji.deleted;
                break;
            case 5:
                result = server_emoji.guild;
                break;
            case 6:
                result = server_emoji.id;
                break;
            case 7:
                result = server_emoji.identifier;
                break;
            case 8:
                result = server_emoji.managed;
                break;
            case 9:
                result = server_emoji.name;
                break;
            case 10:
                result = server_emoji.requiresColons;
                break;
            case 11:
                result = server_emoji.roles.cache.array();
                break;
            case 12:
                result = server_emoji.url;
                break;
            case 13:
                result = await server_emoji.fetchAuthor();
                break;
            case 14:
                result = server_emoji.toString();
                break;
            case 15:
                result = server_emoji.available;
                break;
        }

        this.StoreOutputValue(result, "result", cache);
        this.RunNextBlock("action", cache);
    }
}