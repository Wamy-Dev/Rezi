module.exports = {
    name: "Get Server Preview Info",

    description: "Gets the server preview information.",

    category: "Server Stuff",

    inputs: [
        {
            "id": "action",
            "name": "Action",
            "description": "Acceptable Types: Action\n\nDescription: Executes this block.",
            "types": ["action"]
        },
        {
            "id": "server_preview",
            "name": "Server Preview",
            "description": "Acceptable Types: Object, Unspecified\n\nDescription: The server preview to get the information.",
            "types": ["object", "unspecified"],
            "required": true
        }
    ],

    options: [
        {
            "id": "server_preview_info",
            "name": "Server Preview Info",
            "description": "Description: The server preview information to get.",
            "type": "SELECT",
            "options": {
                1: "Server Preview Total Member Count (Approximate) [Number]",
                2: "Server Preview Online Member Count (Approximate) [Number]",
                3: "Server Preview Description [Text]",
                4: "Server Preview Discovery Splash [Text]",
                5: "Server Preview Discovery Splash URL [Text]",
                6: "Server Preview Emojis [List <Server Emoji>]",
                7: "Server Preview Features [List <Text>]",
                8: "Server Preview Icon [Text]",
                9: "Server Preview Icon URL [Text]",
                10: "Server Preview ID [Text]",
                11: "Server Preview Name [Text]",
                12: "Server Preview Splash [Text]",
                13: "Server Preview Splash URL [Text]",
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
            "description": "Type: Unspecified\n\nDescription: The information obtained from the server preview.",
            "types": ["unspecified"]
        }
    ],

    code: function(cache) {
        const server_preview = this.GetInputValue("server_preview", cache);
        const server_preview_info = parseInt(this.GetOptionValue("server_preview_info", cache));

        let result;
        switch(server_preview_info) {
            case 1:
                result = server_preview.approximateMemberCount;
                break;
            case 2:
                result = server_preview.approximatePresenceCount;
                break;
            case 3:
                result = server_preview.description;
                break;
            case 4:
                result = server_preview.discoverySplash;
                break;
            case 5:
                result = server_preview.discoverySplashURL({dynamic: true, format: "png"});
                break;
            case 6:
                result = server_preview.emojis.array();
                break;
            case 7:
                result = server_preview.features.replace(/_/g, " ").replace(/\w\S*/g, a => a[0].toUpperCase() + a.substring(1).toLowerCase());
                break;
            case 8:
                result = server_preview.icon;
                break;
            case 9:
                result = server_preview.iconURL({dynamic: true, format: "png"});
                break;
            case 10:
                result = server_preview.id;
                break;
            case 11:
                result = server_preview.name;
                break;
            case 12:
                result = server_preview.splash;
                break;
            case 13:
                result = server_preview.splashURL({dynamic: true, format: "png"});
                break;
        }

        this.StoreOutputValue(result, "result", cache);
        this.RunNextBlock("action", cache);
    }
}