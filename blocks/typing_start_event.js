module.exports = {
    name: "Typing Start [Event]",

    description: "When an user starts typing in a channel, this event will trigger.",

    category: "Events",

    auto_execute: true,

    inputs: [],

    options: [],

    outputs: [
        {
            "id": "action",
            "name": "Action",
            "description": "Type: Action\n\nDescription: Executes the following blocks when this block finishes its task.",
            "types": ["action"]
        },
        {
            "id": "channel",
            "name": "Channel",
            "description": "Type: Object\n\nDescription: The channel the user started typing in.",
            "types": ["object"]
        },
        {
            "id": "user",
            "name": "User",
            "description": "Type: Object\n\nDescription: The user who started typing.",
            "types": ["object"]
        }
    ],

    code(cache) {
        this.events.on("typingStart", (channel, user) => {
            this.StoreOutputValue(channel, "channel", cache);
			this.StoreOutputValue(user, "user", cache);
            this.RunNextBlock("action", cache);
        });
    }
}