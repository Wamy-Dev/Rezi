module.exports = {
    name: "Check Message Arguments",

    description: "Checks the number of message arguments.",

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
            "description": "Acceptable Types: Object, Unspecified\n\nDescription: The message to check the number of arguments.",
            "types": ["object", "unspecified"],
            "required": true
        },
        {
            "id": "number",
            "name": "Number",
            "description": "Acceptable Types: Number, Unspecified\n\nDescription: The number related to your selection in \"Arguments Type\" and \"Comparison Type\". Default: \"1\". (OPTIONAL)",
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
            "id": "arguments_type",
            "name": "Arguments Type",
            "description": "Description: The type of message arguments to check.",
            "type": "SELECT",
            "options": {
                "arguments": "Number of Arguments",
                "mentioned_users": "Number of Mentioned Users",
                "mentioned_members": "Number of Mentioned Members",
                "mentioned_roles": "Number of Mentioned Roles",
                "mentioned_channels": "Number of Mentioned Channels"
            }
        },
        {
            "id": "comparison_type",
            "name": "Comparison Type",
            "description": "Description: The comparison type between the numbers from the \"Argument Type\" option and the \"Number\" input.",
            "type": "SELECT",
            "options": {
                "equal": "Equal To",
                "not_equal": "Not Equal",
                "greater_than": "Greater Than",
                "less_than": "Less Than",
                "greater_than_or_equal": "Greater Than or Equal To",
                "less_than_or_equal": "Less Than or Equal To"
            }
        }
    ],

    outputs: [
        {
            "id": "action1",
            "name": "Action (If True)",
            "description": "Type: Action\n\nDescription: Executes the following blocks if true.",
            "types": ["action"]
        },
        {
            "id": "action2",
            "name": "Action (If False)",
            "description": "Type: Action\n\nDescription: Executes the following blocks if false.",
            "types": ["action"]
        }
    ],

    code(cache) {
        const message = this.GetInputValue("message", cache);
        const number = parseInt(this.GetInputValue("number", cache, false, 1));
        const separator = this.GetInputValue("custom_argument_separator", cache, false, "/\\s+/");
        const arguments_type = this.GetOptionValue("arguments_type", cache) + "";
        const comparison_type = this.GetOptionValue("comparison_type", cache) + "";

        const content = message.content.trim();

        let result = 0;
        switch(arguments_type) {
            case "arguments":
                result = content.split(this.ConvertRegex(separator)).length - 1;
                break;
            case "mentioned_users":
                result = message.mentions.users.size;
                break;
            case "mentioned_members":
                result = message.mentions.members.size;
                break;
            case "mentioned_roles":
                result = message.mentions.roles.size;
                break
            case "mentioned_channels":
                result = message.mentions.channels.size;
                break;
        }

        let result2;
        switch(comparison_type) {
            case "equal":
                result2 = result == number;
                break;
            case "not_equal":
                result2 = result != number;
                break;
            case "greater_than":
                result2 = result > number;
                break;
            case "less_than":
                result2 = result < number;
                break;
            case "greater_than_or_equal":
                result2 = result >= number;
                break;
            case "less_than_or_equal":
                result2 = result <= number;
                break;
        }

        this.RunNextBlock(result2 ? "action1" : "action2", cache);
    }
}