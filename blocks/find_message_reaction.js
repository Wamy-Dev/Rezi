module.exports = {
    name: "Find Message Reaction",

    description: "Finds a reaction from the message.",

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
            "description": "Acceptable Types: Object, Unspecified\n\nDescription: The message to find the reaction.",
            "types": ["object", "unspecified"],
            "required": true
        },
        {
            "id": "search_value",
            "name": "Search Value",
            "description": "Acceptable Types: Unspecified, Text, Number\n\nDescription: The value according to your choice in the \"Find Message Reaction By\" option.",
            "types": ["unspecified", "text", "number", "object"],
            "required": true
        }
    ],

    options: [
        {
            "id": "find_message_reaction_by",
            "name": "Find Message Reaction By",
            "description": "Description: The type of search for the message reaction.",
            "type": "SELECT",
            "options": {
                "emoji_id": "Message Reaction Emoji Name/ID",
                "count": "Message Reaction Count"
            }
        }
    ],

    outputs: [
        {
            "id": "action",
            "name": "Action",
            "description": "Acceptable Types: Action\n\nDescription: Executes the following blocks when this block finishes its task.",
            "types": ["action"]
        },
        {
            "id": "message_reaction",
            "name": "Message Reaction",
            "description": "Type: Object\n\nDescription: The message reaction found if possible.",
            "types": ["object"]
        }
    ],

    code(cache) {
        const message = this.GetInputValue("message", cache);
        const search_value = this.GetInputValue("search_value", cache);
        const find_message_reaction_by = this.GetOptionValue("find_message_reaction_by", cache) + "";

        const reactions = message.reactions.cache;

        let result;
        switch(find_message_reaction_by) {
            case "emoji_id":
                result = reactions.get(search_value + "");
                break;
            case "count":
                result = reactions.find(c => c.count === search_value);
                break;
        }

        this.StoreOutputValue(result, "message_reaction", cache);
        this.RunNextBlock("action", cache);
    }
}