module.exports = {
    name: "Get Message Argument(s)",

    description: "Gets the message argument(s).",

    category: "Message Stuff",

    inputs: [
        {
            "id": "action",
            "name": "Action",
            "description": "Acceptable Types: Action\n\nDescription: Executes this block.",
            "types": ["action"]
        },
        {
            "id": "message",
            "name": "Message",
            "description": "Acceptable Types: Object, Unspecified\n\nDescription: The message to get the argument(s).",
            "types": ["object", "unspecified"],
            "required": true
        },
        {
            "id": "argument_number",
            "name": "Argument Number",
            "description": "Acceptable Types: Number, Unspecified\n\nDescription: The number related to your selection in the \"Argument Type\" option. Starts at \"1\". Default: \"1\". (OPTIONAL)",
            "types": ["number", "unspecified"]
        },
        {
            "id": "custom_argument_separator",
            "name": "Custom Argument Separator",
            "description": "Acceptable Types: Text, Unspecified\n\nDescription: The custom separator for the message arguments. Supports RegExp. Default: \"/\\s+/\" (space). (OPTIONAL)",
            "types": ["text", "unspecified"]
        }
    ],

    options: [
        {
            "id": "argument_type",
            "name": "Argument Type",
            "description": "Description: The message argument to get.",
            "type": "SELECT",
            "options": {
                "one_argument": "One Argument",
                "multiple_arguments": "Multiple Arguments",
                "mentioned_user": "Mentioned User",
                "mentioned_member": "Mentioned Member",
                "mentioned_role": "Mentioned Role",
                "mentioned_channel": "Mentioned Channel"
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
            "description": "Type: Unspecified\n\nDescription: The message argument obtained if possible.",
            "types": ["unspecified"]
        }
    ],

    code(cache) {
        const message = this.GetInputValue("message", cache);
        const separator = this.GetInputValue("custom_argument_separator", cache, false, "/\\s+/");
        const argument_number = Math.max(0, parseInt(this.GetInputValue("argument_number", cache, false, 1)));
        const argument_type = this.GetOptionValue("argument_type", cache) + "";

        const content = message.content.trim();

        let result;
        switch(argument_type) {
            case "one_argument":
                result = content.split(this.ConvertRegex(separator))[argument_number];
                break;
            case "multiple_arguments":
                if(argument_number > 0) {
                    const matches = [...content.matchAll(this.ConvertRegex(separator, "g"))];

                    if(argument_number > matches.length) result = "";
                    else {
                        const match = matches[argument_number - 1];
                        result = content.substring(match.index + match[0].length);
                    }
                } else {
                    result = content;
                }
                break;
            case "mentioned_user":
                if(message.mentions.users.size) {
                    const users = message.mentions.users.array();
                    if(users[argument_number - 1]) result = users[argument_number - 1];
                }
                break;
            case "mentioned_member":
                if(message.mentions.members.size) {
                    const members = message.mentions.members.array();
                    if(members[argument_number - 1]) result = members[argument_number - 1];
                }
                break;
            case "mentioned_role":
                if(message.mentions.roles.size) {
                    const roles = message.mentions.roles.array();
                    if(roles[argument_number - 1]) result = roles[argument_number - 1];
                }
                break
            case "mentioned_channel":
                if(message.mentions.channels.size) {
                    const channels = message.mentions.channels.array();
                    if(channels[argument_number - 1]) result = channels[argument_number - 1];
                }
                break;
        }

        this.StoreOutputValue(result, "result", cache);
        this.RunNextBlock("action", cache);
    }
}