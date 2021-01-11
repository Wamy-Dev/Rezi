module.exports = {
    name: "Get Voice Channel Info",

    description: "Gets the voice channel information.",

    category: "Channel Stuff",

    inputs: [
        {
            "id": "action",
            "name": "Action",
            "description": "Acceptable Types: Action\n\nDescription: Executes this block.",
            "types": ["action"]
        },
        {
            "id": "voice_channel",
            "name": "Voice Channel",
            "description": "Acceptable Types: Object, Unspecified\n\nDescription: The voice channel to get the information.",
            "types": ["object", "unspecified"],
            "required": true
        }
    ],

    options: [
        {
            "id": "voice_channel_info",
            "name": "Voice Channel Info",
            "description": "Description: The voice channel information to get.",
            "type": "SELECT",
            "options": {
                1: "Voice Channel Bitrate [Number]",
                2: "Voice Channel Created At [Date]",
                3: "Is Voice Channel Deletable By The Bot? [Boolean]",
                4: "Has Voice Channel Been Deleted? [Boolean]",
                5: "Is Voice Channel Editable By The Bot? [Boolean]",
                6: "Is Voice Channel Full? [Boolean]",
                7: "Voice Channel Server [Server]",
                8: "Voice Channel ID [Text]",
                9: "Is Voice Channel Joinable By The Bot? [Boolean]",
                10: "Is Voice Channel Manageable By The Bot? [Boolean]",
                11: "Voice Channel Member List [List <Member>]",
                12: "Voice Channel Name [Text]",
                13: "Voice Channel Category [Category]",
                14: "Voice Channel Category ID [Text]",
                15: "Is Voice Channel Permissions Synced With Category? [Boolean]",
                16: "Voice Channel Position [Number]",
                17: "Voice Channel Raw Position (API) [Number]",
                18: "Is Bot Able To Speak In The Voice Channel? [Boolean]",
                19: "Voice Channel Type [Text]",
                20: "Voice Channel User Limit [Number]",
                21: "Is Bot Able To Access The Voice Channel? [Boolean]",
                22: "Voice Channel Invite List [List <Invite>]",
                23: "Voice Channel Mention [Text]"
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
            "description": "Type: Unspecified\n\nDescription: The information obtained from the voice channel.",
            "types": ["unspecified"]
        }
    ],

    async code(cache) {
        const voice_channel = this.GetInputValue("voice_channel", cache);
        const voice_channel_info = parseInt(this.GetOptionValue("voice_channel_info", cache));

        let result;
        switch(voice_channel_info) {
            case 1:
                result = voice_channel.bitrate;
                break;
            case 2:
                result = voice_channel.createdAt;
                break;
            case 3:
                result = voice_channel.deletable;
                break;
            case 4:
                result = voice_channel.deleted;
                break;
            case 5:
                result = voice_channel.editable;
                break;
            case 6:
                result = voice_channel.full;
                break;
            case 7:
                result = voice_channel.guild;
                break;
            case 8:
                result = voice_channel.id;
                break;
            case 9:
                result = voice_channel.joinable;
                break;
            case 10:
                result = voice_channel.manageable;
                break;
            case 11:
                result = voice_channel.members.array();
                break;
            case 12:
                result = voice_channel.name;
                break;
            case 13:
                result = voice_channel.parent;
                break;
            case 14:
                result = voice_channel.parentID;
                break;
            case 15:
                result = voice_channel.permissionsLocked || false;
                break;
            case 16:
                result = voice_channel.position;
                break;
            case 17:
                result = voice_channel.rawPosition;
                break;
            case 18:
                result = voice_channel.speakable;
                break;
            case 19:
                switch(voice_channel.type) {
                    case "dm":
                        result = "DM";
                        break;
                    case "text":
                        result = "Text";
                        break;
                    case "voice":
                        result = "Voice";
                        break;
                    case "category":
                        result = "Category";
                        break;
                    case "news":
                        result = "News";
                        break;
                    case "store":
                        result = "Store";
                        break;
                    default:
                    case "unknown":
                        result = "Unknown";
                        break;
                }
                break;
            case 20:
                result = voice_channel.userLimit;
                break;
            case 21:
                result = voice_channel.viewable;
                break;
            case 22:
                result = await voice_channel.fetchInvites().then(a => a.array());
                break;
            case 23:
                result = voice_channel.toString();
                break;
        }

        this.StoreOutputValue(result, "result", cache);
        this.RunNextBlock("action", cache);
    }
}