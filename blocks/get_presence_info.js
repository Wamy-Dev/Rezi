module.exports = {
    name: "Get Rich Presence Info",

    description: "Gets the rich presence information.",

    category: "User Stuff",

    inputs: [
        {
            "id": "action",
            "name": "Action",
            "description": "Acceptable Types: Action\n\nDescription: Executes this block.",
            "types": ["action"]
        },
        {
            "id": "presence",
            "name": "Rich Presence",
            "description": "Acceptable Types: Object, Unspecified\n\nDescription: The rich presence to get the information.",
            "types": ["object", "unspecified"],
            "required": true
        }
    ],

    options: [
        {
            "id": "presence_info",
            "name": "Rich Presence Info",
            "description": "Description: The rich presence information to get.",
            "type": "SELECT",
            "options": {
                1: "Rich Presence Name [Text]",
                2: "Rich Presence Details [Text]",
                3: "Rich Presence State/Custom Status [Text]",
                4: "Rich Presence Party ID [Text]",
                5: "Current Rich Presence Party Size [Number]",
                6: "Maximum Rich Presence Party Size [Number]",
                7: "Rich Presence Date Start [Date]",
                8: "Rich Presence Date End [Date]",
                9: "Rich Presence Large Image Text [Text]",
                10: "Rich Presence Small Image Text [Text]",
                11: "Rich Presence Large Image URL [Text]",
                12: "Rich Presence Small Image URL [Text]",
                13: "Rich Presence Large Image ID [Text]",
                14: "Rich Presence Small Image ID [Text]",
                15: "Rich Presence Stream URL [Text]",
                16: "Rich Presence Type [Text]",
                17: "Rich Presence Aplication ID [Text]",
                18: "Rich Presence Created At [Date]",
                19: "Rich Presence Emoji (Custom Status) [Text]"
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
            "description": "Type: Unspecified\n\nDescription: The information obtained from the rich presence.",
            "types": ["unspecified"]
        }
    ],

    code(cache) {
        const presence = this.getInputValue("presence", cache);
        const presence_info = parseInt(this.getOptionValue("presence_info", cache));

        const activity = presence.activities[0];

        let result;
        switch(presence_info) {
            case 1:
                result = activity.name;
                break;
            case 2:
                result = activity.details;
                break;
            case 3:
                result = activity.state;
                break;
            case 4:
                result = activity.party && activity.party.id;
                break;
            case 5:
                result = activity.party && activity.party.size[0];
                break;
            case 6:
                result = activity.party && activity.party.size[1];
                break;
            case 7:
                result = activity.timestamps && activity.timestamps.start;
                break;
            case 8:
                result = activity.timestamps && activity.timestamps.end;
                break;
            case 9:
                result = activity.assets && activity.assets.largeText;
                break;
            case 10:
                result = activity.assets && activity.assets.smallText;
                break;
            case 11:
                result = activity.assets && activity.assets.largeImageURL({format: "png"});
                break;
            case 12:
                result = activity.assets && activity.assets.smallImageURL({format: "png"});
                break;
            case 13:
                result = activity.assets && activity.assets.largeImage;
                break;
            case 14:
                result = activity.assets && activity.assets.smallImage;
                break;
            case 15:
                result = activity.url;
                break;
            case 16:
                switch(activity.type) {
                    case "PLAYING":
                        result = "Playing";
                        break;
                    case "STREAMING":
                        result = "Streaming";
                        break;
                    case "LISTENING":
                        result = "Listening";
                        break;
                    case "WATCHING":
                        result = "Watching";
                        break;
                    case "CUSTOM_STATUS":
                        result = "Custom Status";
                        break;
                    default:
                        result = "Unknown";
                        break;
                }
                break;
            case 17:
                result = activity.applicationID;
                break;
            case 18:
                result = activity.createdAt;
                break;
            case 19:
                result = activity.emoji;
                break;
        }

        this.StoreOutputValue(result, "result", cache);
        this.RunNextBlock("action", cache);
    }
}