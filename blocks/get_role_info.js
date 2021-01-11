module.exports = {
    name: "Get Role Info",

    description: "Gets the role information.",

    category: "Role Stuff",

    inputs: [
        {
            "id": "action",
            "name": "Action",
            "description": "Acceptable Types: Action\n\nDescription: Executes this block.",
            "types": ["action"]
        },
        {
            "id": "role",
            "name": "Role",
            "description": "Acceptable Types: Object, Unspecified\n\nDescription: The role to get the information.",
            "types": ["object", "unspecified"],
            "required": true
        }
    ],

    options: [
        {
            "id": "role_info",
            "name": "Role Info",
            "description": "Description: The role information to get.",
            "type": "SELECT",
            "options": {
                1: "Role Position [Number]",
                2: "Role Base 10 Color [Number]",
                3: "Role Created At [Date]",
                4: "Has Role Been Deleted? [Boolean]",
                5: "Is Role Editable By The Bot? [Boolean]",
                6: "Role Server [Server]",
                7: "Role Hex Color [Text]",
                8: "Is Role Separate From Others? [Boolean]",
                9: "Role ID [Text]",
                10: "Is Role Managed By An External Service? [Boolean]",
                11: "Role Member List [List <Member>]",
                12: "Is Role Mentionable? [Boolean]",
                13: "Role Name [Text]",
                14: "Role Permissions [Permissions]",
                15: "Role Raw Position (API) [Number]",
                16: "Role Mention [Text]"
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
            "description": "Type: Unspecified\n\nDescription: The information obtained from the role.",
            "types": ["unspecified"]
        }
    ],

    code(cache) {
        const role = this.GetInputValue("role", cache);
        const role_info = parseInt(this.GetOptionValue("role_info", cache));

        let result;
        switch(role_info) {
            case 1:
                result = role.position;
                break;
            case 2:
                result = role.color;
                break;
            case 3:
                result = role.createdAt;
                break;
            case 4:
                result = role.deleted;
                break;
            case 5:
                result = role.editable;
                break;
            case 6:
                result = role.guild;
                break;
            case 7:
                result = role.hexColor;
                break;
            case 8:
                result = role.hoist;
                break;
            case 9:
                result = role.id;
                break;
            case 10:
                result = role.managed;
                break;
            case 11:
                result = role.members.array();
                break;
            case 12:
                result = role.mentionable;
                break;
            case 13:
                result = role.name;
                break;
            case 14:
                result = role.serialize();
                break;
            case 15:
                result = role.rawPosition;
                break;
            case 16:
                result = role.toString();
                break;
        }

        this.StoreOutputValue(result, "result", cache);
        this.RunNextBlock("action", cache);
    }
}