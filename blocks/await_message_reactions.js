module.exports = {
    name: "Await Message Reaction(s)",

    description: "Awaits for the message reaction(s). Useful for making questions for an user using message reaction. Please join our Discord server or read the DBB Docs if you do not understand how this block works.",

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
            "description": "Acceptable Types: Object, Unspecified\n\nDescription: The message to await for the reaction(s).",
            "types": ["object", "unspecified"],
            "required": true
        },
        {
            "id": "javascript_filter_code",
            "name": "JavaScript Filter Code",
            "description": "Acceptable Types: Text, Unspecified\n\nDescription: The JavaScript code to filter the result.\n\nVariables:\n\"reaction\" -> The message reaction object\n\"user\" -> The user object that reacted",
            "types": ["text", "unspecified"],
            "required": true
        },
        {
            "id": "max_reactions",
            "name": "Maximum Reactions",
            "description": "Acceptable Types: Number, Unspecified\n\nDescription: The maximum total amount of reactions to collect. Default: \"1\". (OPTIONAL)",
            "types": ["number", "unspecified"]
        },
        {
            "id": "max_emojis",
            "name": "Maximum Emojis",
            "description": "Acceptable Types: Number, Unspecified\n\nDescription: The maximum number of emojis to collect. (OPTIONAL)",
            "types": ["number", "unspecified"]
        },
        {
            "id": "max_users",
            "name": "Maximum Users",
            "description": "Acceptable Types: Number, Unspecified\n\nDescription: The maximum number of users to react. (OPTIONAL)",
            "types": ["number", "unspecified"]
        },
        {
            "id": "max_time",
            "name": "Maximum Time (Milliseconds)",
            "description": "Acceptable Types: Number, Unspecified\n\nDescription: How long to run the collector of message reactions in milliseconds. Default: \"60000\". (OPTIONAL)",
            "types": ["number", "unspecified"]
        },
    ],

    options: [],

    outputs: [
        {
            "id": "action1",
            "name": "Action",
            "description": "Type: Action\n\nDescription: Executes the following blocks after the message reaction(s) is/are received.",
            "types": ["action"]
        },
        {
            "id": "action2",
            "name": "Action (Timeout)",
            "description": "Type: Action\n\nDescription: Executes the following blocks after the timeout expires.",
            "types": ["action"]
        },
        {
            "id": "message_reactions",
            "name": "Message Reactions",
            "description": "Type: List\n\nDescription: The list containing the message reaction(s) received.",
            "types": ["list"]
        }
    ],

    code(cache) {
        const message = this.GetInputValue("message", cache);
        const javascript_filter_code = this.GetInputValue("javascript_filter_code", cache);
        const max_reactions = parseInt(this.GetInputValue("max_reactions", cache));
        const max_emojis = parseInt(this.GetInputValue("max_emojis", cache));
        const max_users = parseInt(this.GetInputValue("max_users", cache));
        const max_time = parseInt(this.GetInputValue("max_time", cache));

        message.awaitReactions((reaction, user) => {
            try {
				return Boolean(eval(javascript_filter_code));
			} catch {
				return false;
			}
        }, {
            errors: ["time"],
            max: max_reactions,
            maxEmojis: max_emojis,
            maxUsers: max_users,
            time: max_time
        })
        .then(reactions => {
            this.StoreOutputValue(reactions.array(), "messages", cache);
            this.RunNextBlock("action1", cache);
        })
        .catch(reactions => {
            this.StoreOutputValue(reactions.array(), "messages", cache);
            this.RunNextBlock("action2", cache);
        });
    }
}