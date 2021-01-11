module.exports = {
    name: "Get Message Reaction Info",

    description: "Gets the message reaction information.",

    category: "Message Stuff",

    inputs: [
        {
            "id": "action",
            "name": "Action",
            "description": "Acceptable Types: Action\n\nDescription: Executes this block.",
            "types": ["action"]
        },
        {
            "id": "message_reaction",
            "name": "Message Reaction",
            "description": "Acceptable Types: Object, Unspecified\n\nDescription: The message reaction to get the information.",
            "types": ["object", "unspecified"],
            "required": true
        }
    ],

    options: [
        {
            "id": "message_reaction_info",
            "name": "Message Reaction Info",
            "description": "Description: The message reaction information to get.",
            "type": "SELECT",
            "options": {
                1: "Message Reaction Emoji [Server Emoji]",
                2: "Did The Bot React? [Boolean]",
                3: "Reaction Message [Message]",
                4: "Message Reaction User List [List <User>]",
                5: "Message Reaction Count [Number]"
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
            "description": "Type: Unspecified\n\nDescription: The information obtained from the message reaction.",
            "types": ["unspecified"]
        }
    ],

    async code(cache) {
        const message_reaction = this.GetInputValue("message_reaction", cache);
        const message_reaction_info = parseInt(this.GetOptionValue("message_reaction_info", cache));

        let result;
        switch(message_reaction_info) {
            case 1:
                result = message_reaction.emoji;
                break;
            case 2:
                result = message_reaction.me;
                break;
            case 3:
                result = message_reaction.message;
                break;
            case 4:
                result = message_reaction.users.cache.array();
                break;
            case 5:
                result = message_reaction.users.cache.size;
                break;
        }

        this.StoreOutputValue(result, "result", cache);
        this.RunNextBlock("action", cache);
    }
}