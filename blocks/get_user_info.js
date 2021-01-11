module.exports = {
    name: "Get User Info",

    description: "Gets the user information.",

    category: "User Stuff",

    inputs: [
        {
            "id": "action",
            "name": "Action",
            "description": "Acceptable Types: Action\n\nDescription: Executes this block.",
            "types": ["action"]
        },
        {
            "id": "user",
            "name": "User",
            "description": "Acceptable Types: Object, Unspecified\n\nDescription: The user to get the information.",
            "types": ["object", "unspecified"],
            "required": true
        }
    ],

    options: [
        {
            "id": "user_info",
            "name": "User Info",
            "description": "Description: The user information to get.",
            "type": "SELECT",
            "options": {
                1: "User Avatar ID [Text]",
                2: "User Avatar URL [Text]",
                3: "Is User A Bot? [Boolean]",
                4: "User Created At [Date]",
                5: "User Default Avatar URL [Text]",
                6: "User Discriminator [Text]",
                7: "User Display Avatar URL [Text]",
                8: "User DM Channel [DM Channel]",
                9: "User Flags [List <Text>]",
                10: "User ID [Text]",
                11: "User Last Message [Message]",
                12: "User Last Message ID [Text]",
                13: "User Last Message Channel ID [Text]",
                14: "User Rich Presence [Rich Presence]",
                15: "User Tag [Text]",
                16: "User Username [Text]",
                17: "User Status [Text]",
                18: "Is User Using Desktop? [Boolean]",
                19: "Is User Using Mobile? [Boolean]",
                20: "Is User Using Web? [Boolean]",
                21: "User Mention [Text]",
                22: "User Locale [Text]",
                23: "Is An Official Discord System User? [Boolean]",
                24: "Is Bot Owner? [Boolean]"
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
            "description": "Type: Unspecified\n\nDescription: The information obtained from the user.",
            "types": ["unspecified"]
        }
    ],

    async code(cache) {
        const user = this.GetInputValue("user", cache);
        const user_info = parseInt(this.GetOptionValue("user_info", cache));

        let result;
        switch(user_info) {
            case 1:
                result = user.avatar;
                break;
            case 2:
                result = user.avatarURL({dynamic: true, format: "png"});
                break;
            case 3:
                result = user.bot;
                break;
            case 4:
                result = user.createdAt;
                break;
            case 5:
                result = user.defaultAvatarURL;
                break;
            case 6:
                result = user.discriminator;
                break;
            case 7:
                result = user.displayAvatarURL({dynamic: true, format: "png"});
                break;
            case 8:
                result = await user.createDM();
                break;
            case 9:
                result = await user.fetchFlags().then(flags => flags.toArray().map(a => a.replace(/_/g, " ").replace(/\w\S*/g, a => a[0].toUpperCase() + a.substring(1).toLowerCase())));
                break;
            case 10:
                result = user.id;
                break;
            case 11:
                result = user.lastMessage;
                break;
            case 12:
                result = user.lastMessageID;
                break;
            case 13:
                result = user.lastMessageChannelID;
                break;
            case 14:
                result = user.presence;
                break;
            case 15:
                result = user.tag;
                break;
            case 16:
                result = user.username;
                break;
            case 17:
                switch(user.presence.status) {
                    case "online":
                        result = "Online";
                        break;
                    case "idle":
                        result = "Idle";
                        break;
                    case "dnd":
                        result = "Do Not Disturb";
                        break;
                    case "offline":
                        result = "Offline";
                        break;
                }
                break;
            case 18:
                var device = user.presence.clientStatus;
                result = device && Object.keys(device).includes("desktop");
                break;
            case 19:
                var device = user.presence.clientStatus;
                result = device && Object.keys(device).includes("mobile");
                break;
            case 20:
                var device = user.presence.clientStatus;
                result = device && Object.keys(device).includes("web");
                break;
            case 21:
                result = user.toString();
                break;
            case 22:
                result = user.locale;
                break;
            case 23:
                result = user.system;
                break;
            case 24:
                result = this.getDBB().Data.data.dbb.owners.includes(user.id);
                break;
        }

        this.StoreOutputValue(result, "result", cache);
        this.RunNextBlock("action", cache);
    }
}