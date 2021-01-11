module.exports = {
    name: "Get Message Embed Info",

    description: "Gets the message embed information.",

    category: "Message Embed Stuff",

    inputs: [
        {
            "id": "action",
            "name": "Action",
            "description": "Acceptable Types: Action\n\nDescription: Executes this block.",
            "types": ["action"]
        },
        {
            "id": "message_embed",
            "name": "Message Embed",
            "description": "Acceptable Types: Object, Unspecified\n\nDescription: The message embed to get the information.",
            "types": ["object", "unspecified"],
            "required": true
        }
    ],

    options: [
        {
            "id": "message_embed_info",
            "name": "Message Embed Info",
            "description": "Description: The message embed information to get.",
            "type": "SELECT",
            "options": {
                1: "Message Embed Title [Text]",
                2: "Message Embed Author Name [Text]",
                3: "Message Embed Author URL [Text]",
                4: "Message Embed Author Icon URL [Text]",
                5: "Message Embed Author Icon Proxied URL [Text]",
                6: "Message Embed Color (Hex) [Text]",
                7: "Message Embed Color (Base 10) [Text]",
                8: "Message Embed Created At [Date]",
                9: "Message Embed Description [Text]",
                10: "Message Embed Fields [List <Embed Fields>]",
                11: "Message Embed Files [List <Embed Files>]",
                12: "Message Embed Footer Text [Text]",
                13: "Message Embed Footer Icon URL [Text]",
                14: "Message Embed Footer Icon Proxied URL [Text]",
                15: "Message Embed Image URL [Text]",
                16: "Message Embed Image Proxied URL [Text]",
                17: "Message Embed Image Height [Number]",
                18: "Message Embed Image Width [Number]",
                19: "Message Embed Thumbnail URL [Text]",
                20: "Message Embed Thumbnail Proxied URL [Text]",
                21: "Message Embed Thumbnail Height [Number]",
                22: "Message Embed Thumbnail Width [Number]",
                23: "Message Embed Characters Number [Number]",
                24: "Message Embed Provider Text [Text]",
                25: "Message Embed Provider URL [Text]",
                26: "Message Embed Timestamp [Date]",
                27: "Message Embed Type [Text]",
                28: "Message Embed URL [Text]",
                29: "Message Embed Video URL [Text]",
                30: "Message Embed Video Proxied URL [Text]",
                31: "Message Embed Video Height [Number]",
                32: "Message Embed Video Width [Number]"
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
            "description": "Type: Unspecified\n\nDescription: The information obtained from the message embed.",
            "types": ["unspecified"]
        }
    ],

    code(cache) {
        const message_embed = this.GetInputValue("message_embed", cache);
        const message_embed_info = parseInt(this.GetOptionValue("message_embed_info", cache));

        let result;
        switch(message_embed_info) {
            case 1:
                result = message_embed.title;
                break;
            case 2:
                var a = message_embed.author;
                if(a) result = a.name;
                break;
            case 3:
                var a = message_embed.author;
                if(a) result = a.url;
                break;
            case 4:
                var a = message_embed.author;
                if(a) result = a.iconURL;
                break;
            case 5:
                var a = message_embed.author;
                if(a) result = a.proxyIconURL;
                break;
            case 6:
                result = message_embed.hexColor;
                break;
            case 7:
                result = message_embed.color;
                break;
            case 8:
                result = message_embed.createdAt;
                break;
            case 9:
                result = message_embed.description;
                break;
            case 10:
                result = message_embed.fields;
                break;
            case 11:
                result = message_embed.files;
                break;
            case 12:
                var a = message_embed.footer;
                if(a) result = a.text;
                break;
            case 13:
                var a = message_embed.footer;
                if(a) result = a.iconURL;
                break;
            case 14:
                var a = message_embed.footer;
                if(a) result = a.proxyIconURL;
                break;
            case 15:
                var a = message_embed.image;
                if(a) result = a.url;
                break;
            case 16:
                var a = message_embed.image;
                if(a) result = a.proxyURL;
                break;
            case 17:
                var a = message_embed.image;
                if(a) result = a.height;
                break;
            case 18:
                var a = message_embed.image;
                if(a) result = a.width;
                break;
            case 19:
                var a = message_embed.thumbnail;
                if(a) result = a.url;
                break;
            case 20:
                var a = message_embed.thumbnail;
                if(a) result = a.proxyURL;
                break;
            case 21:
                var a = message_embed.thumbnail;
                if(a) result = a.height;
                break;
            case 22:
                var a = message_embed.thumbnail;
                if(a) result = a.width;
                break;
            case 23:
                result = message_embed.length;
                break;
            case 24:
                var a = message_embed.provider;
                if(a) result = a.name;
                break;
            case 25:
                var a = message_embed.provider;
                if(a) result = a.url;
                break;
            case 26:
                var a = message_embed.timestamp;
                if(a >= 0) result = new Date(a.url);
                break;
            case 27:
                switch(message_embed.type) {
                    case "rich":
                        result = "Rich";
                        break;
                    case "image":
                        result = "Image";
                        break;
                    case "video":
                        result = "Video";
                        break;
                    case "gifv":
                        result = "Gifv";
                        break;
                    case "article":
                        result = "Article";
                        break;
                    case "link":
                        result = "Link";
                        break;
                    default:
                        result = "Unknown";
                        break;
                }
                break;
            case 28:
                result = message_embed.url;
                break;
            case 29:
                var a = message_embed.video;
                if(a) result = a.url;
                break;
            case 30:
                var a = message_embed.video;
                if(a) result = a.proxyURL;
                break;
            case 31:
                var a = message_embed.video;
                if(a) result = a.height;
                break;
            case 32:
                var a = message_embed.video;
                if(a) result = a.width;
                break;
        }

        this.StoreOutputValue(result, "result", cache);
        this.RunNextBlock("action", cache);
    }
}