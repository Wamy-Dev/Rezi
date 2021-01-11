module.exports = {
    name: "Get Invite Info",

    description: "Gets the invite information.",

    category: "Invite Stuff",

    inputs: [
        {
            "id": "action",
            "name": "Action",
            "description": "Acceptable Types: Action\n\nDescription: Executes this block.",
            "types": ["action"]
        },
        {
            "id": "invite",
            "name": "Invite",
            "description": "Acceptable Types: Object, Unspecified\n\nDescription: The invite to get the information.",
            "types": ["object", "unspecified"],
            "required": true
        }
    ],

    options: [
        {
            "id": "invite_info",
            "name": "Invite Info",
            "description": "Description: The invite information to get.\n\nNOTE: The only guaranteed options are \"Invite Code\", \"Invite URL\", \"Invite Server\", \"Invite Channel\" and \"Invite Inviter\". The other options can not work (it's the Discord API's fault).",
            "type": "SELECT",
            "options": {
                1: "Invite Channel [Channel]",
                2: "Invite Code [Text]",
                3: "Invite Created At [Date]",
                4: "Invite Expires At [Date]",
                5: "Invite Server [Server]",
                6: "Invite Inviter [User]",
                7: "Invite Maximum Age In Seconds [Number]",
                8: "Invite Maximum Uses [Number]",
                9: "Invite Server Total Member Count [Number]",
                10: "Invite Server Online Member Count [Number]",
                11: "Is Invite Temporary? [Boolean]",
                12: "Invite URL [Text]",
                13: "Invite Uses [Number]",
                14: "Invite Target User [User]",
                15: "Invite Target User Type [Text]",
                16: "Is Invite Deletable By The Bot? [Boolean]"
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
            "description": "Type: Unspecified\n\nDescription: The information obtained from the invite.",
            "types": ["unspecified"]
        }
    ],

    code(cache) {
        const invite = this.GetInputValue("invite", cache);
        const invite_info = parseInt(this.GetOptionValue("invite_info", cache));

        let result;
        switch(invite_info) {
            case 1:
                result = invite.channel;
                break;
            case 2:
                result = invite.code;
                break;
            case 3:
                result = invite.createdAt;
                break;
            case 4:
                result = invite.expiresAt;
                break;
            case 5:
                result = invite.guild;
                break;
            case 6:
                result = invite.inviter;
                break;
            case 7:
                result = invite.maxAge;
                break;
            case 8:
                result = invite.maxUses;
                break;
            case 9:
                result = invite.memberCount;
                break;
            case 10:
                result = invite.presenceCount;
                break;
            case 11:
                result = invite.temporary;
                break;
            case 12:
                result = invite.url;
                break;
            case 13:
                result = invite.uses;
                break;
            case 14:
                result = invite.targetUser;
                break;
            case 15:
                var type = invite.targetUserType;
                switch(type) {
                    case 1:
                        result = "Stream";
                        break;
                    default:
                        result = type;
                        break;
                }
                break;
            case 16:
                result = invite.deletable;
                break;
        }

        this.StoreOutputValue(result, "result", cache);
        this.RunNextBlock("action", cache);
    }
}