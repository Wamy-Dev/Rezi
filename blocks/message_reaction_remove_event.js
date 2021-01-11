module.exports = {
    name: "Message Reaction Remove [Event]",

    description: "When a reaction is removed from a message (all users of the message reaction are removed), this event will trigger.",

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
            "description": "Type: Object\n\nDescription: The removed message reaction.",
            "types": ["object"]
        }
    ],

    code(cache) {
        this.events.on("messageReactionRemoveEmoji", message_reaction => {
            this.StoreOutputValue(message_reaction, "message_reaction", cache);
            this.RunNextBlock("action", cache);
        });
    }
}