module.exports = {
    name: "Message User Reaction Remove [Event]",

    description: "When an user reaction is removed from a message, this event will trigger.",

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
            "id": "message_reaction",
            "name": "Message Reaction",
            "description": "Type: Object\n\nDescription: The message reaction the user was removed.",
            "types": ["object"]
        },
        {
            "id": "user",
            "name": "User",
            "description": "Type: Object\n\nDescription: The user who removed the reaction from the message.",
            "types": ["object"]
        }
    ],

    code(cache) {
        this.events.on("messageReactionRemove", (message_reaction, user) => {
            this.StoreOutputValue(message_reaction, "message_reaction", cache);
			this.StoreOutputValue(user, "user", cache);
            this.RunNextBlock("action", cache);
        });
    }
}