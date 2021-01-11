module.exports = {
    name: "Get Text Channel Info",

    description: "Gets the text channel information.",

    category: "Channel Stuff",

    inputs: [
        {
            "id": "action",
            "name": "Action",
            "description": "Acceptable Types: Action\n\nDescription: Executes this block.",
            "types": ["action"]
        },
        {
            "id": "text_channel",
            "name": "Text Channel",
            "description": "Acceptable Types: Object, Unspecified\n\nDescription: The text channel to get the information.",
            "types": ["object", "unspecified"],
            "required": true
        }
    ],

    options: [
        {
            "id": "text_channel_info",
            "name": "Text Channel Info",
            "description": "Description: The text channel information to get.",
            "type": "SELECT",
            "options": {
                1: "Text Channel Created At [Date]",
                2: "Is Text Channel Deletable By The Bot? [Boolean]",
                3: "Has Text Channel Been Deleted? [Boolean]",
                4: "Text Channel Server [Server]",
                5: "Text Channel ID [Text]",
                6: "Text Channel Last Message [Message]",
                7: "Text Channel Last Message ID [Text]",
                8: "Text Channel Last Pinned Message Pinned At [Date]",
                9: "Is Text Channel Manageable By The Bot? [Boolean]",
                10: "Text Channel Member List [List <Member>]",
                11: "Text Channel Message List [List <Message>]",
                12: "Text Channel Pinned Message List [List <Message>]",
                13: "Text Channel Name [Text]",
                14: "Is Text Channel NSFW? [Boolean]",
                15: "Text Channel Category [Category]",
                16: "Text Channel Category ID [Text]",
                17: "Is Text Channel Permissions Synced With Category? [Boolean]",
                18: "Text Channel Position [Number]",
                19: "Text Channel Slowmode (Seconds) [Number]",
                20: "Text Channel Raw Position (API) [Number]",
                21: "Text Channel Topic [Text]",
                22: "Text Channel Type [Text]",
                23: "Is Text Channel Bot Typing Indicator Visible? [Boolean]",
                24: "Text Channel Bot Typing Indicator Count [Number]",
                25: "Is Bot Able To Access The Text Channel? [Boolean]",
                26: "Text Channel Invite List [List <Invite>]",
                27: "Text Channel Webhook List [List <Webhook>]",
                28: "Text Channel Mention [Text]"
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
            "description": "Type: Unspecified\n\nDescription: The information obtained from the text channel.",
            "types": ["unspecified"]
        }
    ],

    async code(cache) {
        const text_channel = this.GetInputValue("text_channel", cache);
        const text_channel_info = parseInt(this.GetOptionValue("text_channel_info", cache));

        let result;
        switch(text_channel_info) {
            case 1:
                result = text_channel.createdAt;
                break;
            case 2:
                result = text_channel.deletable;
                break;
            case 3:
                result = text_channel.deleted;
                break;
            case 4:
                result = text_channel.guild;
                break;
            case 5:
                result = text_channel.id;
                break;
            case 6:
                result = text_channel.lastMessage;
                break;
            case 7:
                result = text_channel.lastMessageID;
                break;
            case 8:
                result = text_channel.lastPinAt;
                break;
            case 9:
                result = text_channel.manageable;
                break;
            case 10:
                result = text_channel.members.array();
                break;
            case 11:
                result = text_channel.messages.cache.array();
                break;
            case 12:
                result = await text_channel.messages.fetchPinned().then(a => a.array());
                break;
            case 13:
                result = text_channel.name;
                break;
            case 14:
                result = text_channel.nsfw;
                break;
            case 15:
                result = text_channel.parent;
                break;
            case 16:
                result = text_channel.parentID;
                break;
            case 17:
                result = text_channel.permissionsLocked || false;
                break;
            case 18:
                result = text_channel.position;
                break;
            case 19:
                result = text_channel.rateLimitPerUser;
                break;
            case 20:
                result = text_channel.rawPosition;
                break;
            case 21:
                result = text_channel.topic || "";
                break;
            case 22:
                switch(text_channel.type) {
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
            case 23:
                result = text_channel.typing;
                break;
            case 24:
                result = text_channel.typingCount;
                break;
            case 25:
                result = text_channel.viewable;
                break;
            case 26:
                result = await text_channel.fetchInvites().then(a => a.array());
                break;
            case 27:
                result = await text_channel.fetchWebhooks().then(a => a.array());
                break;
            case 28:
                result = text_channel.toString();
                break;
        }

        this.StoreOutputValue(result, "result", cache);
        this.RunNextBlock("action", cache);
    }
}