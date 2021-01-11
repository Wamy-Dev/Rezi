module.exports = {
    name: "Check If User Reacted",

    description: "Checks if the user reacted to the message reaction.",

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
            "description": "Acceptable Types: Object, Unspecified\n\nDescription: The message reaction to check if has the user.",
            "types": ["object", "unspecified"],
            "required": true
        },
        {
            "id": "user",
            "name": "User",
            "description": "Acceptable Types: Object, Text Unspecified\n\nDescription: The user to check if reacted to the message reaction. Supports User ID.",
            "types": ["object", "text", "unspecified"],
            "required": true
        }
    ],

    options: [],

    outputs: [
        {
            "id": "action1",
            "name": "Action (If True)",
            "description": "Type: Action\n\nDescription: Executes the following blocks if the user reacted to the message reaction.",
            "types": ["action"]
        },
        {
            "id": "action2",
            "name": "Action (If False)",
            "description": "Type: Action\n\nDescription: Executes the following blocks if the user did not react to the message reaction.",
            "types": ["action"]
        }
    ],

    code(cache) {
        const message_reaction = this.GetInputValue("message_reaction", cache);
        const user = this.GetInputValue("user", cache);

        let result = false;
        if(typeof user == "string") {
            result = message_reaction.users.cache.has(user);
        } else {
            result = message_reaction.users.cache.some(a => a.id == user.id);
        }

        this.RunNextBlock(result ? "action1" : "action2", cache);
    }
}