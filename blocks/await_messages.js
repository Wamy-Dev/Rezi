module.exports = {
    name: "Await Message(s)",

    description: "Awaits for the message(s). Useful for making questions for an user. Please join our Discord server or read the DBB Docs if you do not understand how this block works.",

    category: "Message Stuff",

    inputs: [
        {
            "id": "action",
            "name": "Action",
            "description": "Acceptable Types: Action\n\nDescription: Executes this block.",
            "types": ["action"]
        },
        {
            "id": "channel",
            "name": "Channel",
            "description": "Acceptable Types: Object, Unspecified\n\nDescription: The text channel or DM channel to await for the message(s).",
            "types": ["object", "unspecified"],
            "required": true
        },
        {
            "id": "javascript_filter_code",
            "name": "JavaScript Filter Code",
            "description": "Acceptable Types: Text, Unspecified\n\nDescription: The JavaScript code to filter the result.\n\nVariables:\n\"message\" -> The message object\n\"user\" -> The message author [User]\n\"member\" -> The message author [Member]",
            "types": ["text", "unspecified"],
            "required": true
        },
        {
            "id": "max_messages",
            "name": "Maximum Messages",
            "description": "Acceptable Types: Number, Unspecified\n\nDescription: The maximum amount of messages to collect. Default: \"1\". (OPTIONAL)",
            "types": ["number", "unspecified"]
        },
        {
            "id": "max_time",
            "name": "Maximum Time (Milliseconds)",
            "description": "Acceptable Types: Number, Unspecified\n\nDescription: How long to run the collector of messages in milliseconds. Default: \"60000\". (OPTIONAL)",
            "types": ["number", "unspecified"]
        },
    ],

    options: [],

    outputs: [
        {
            "id": "action1",
            "name": "Action",
            "description": "Type: Action\n\nDescription: Executes the following blocks after the message(s) is/are received.",
            "types": ["action"]
        },
        {
            "id": "action2",
            "name": "Action (Timeout)",
            "description": "Type: Action\n\nDescription: Executes the following blocks after the timeout expires.",
            "types": ["action"]
        },
        {
            "id": "messages",
            "name": "Messages",
            "description": "Type: List\n\nDescription: The list containing the message(s) received.",
            "types": ["list"]
        }
    ],

    code(cache) {
        const channel = this.GetInputValue("channel", cache);
        const javascript_filter_code = this.GetInputValue("javascript_filter_code", cache);
        const max_messages = parseInt(this.GetInputValue("max_messages", cache));
        const max_time = parseInt(this.GetInputValue("max_time", cache));

        channel.awaitMessages(message => {
            const user = message.author;
            const member = message.member;

            try {
				return Boolean(eval(javascript_filter_code));
			} catch {
				return false;
			}
        }, {
            errors: ["time"],
            max: max_messages,
			time: max_time
        })
        .then(msgs => {
            this.StoreOutputValue(msgs.array(), "messages", cache);
            this.RunNextBlock("action1", cache);
        })
        .catch(msgs => {
            this.StoreOutputValue(msgs.array(), "messages", cache);
            this.RunNextBlock("action2", cache);
        });
    }
}