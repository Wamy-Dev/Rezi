module.exports = {
    name: "Message Send [Event]",

    description: "When a message is sent/created, this event will trigger",

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
            "id": "message",
            "name": "Message",
            "description": "Type: Object\n\nDescription: The message sent by the user.",
            "types": ["object"]
        }
    ],

    code(cache) {
        this.events.on("message", msg => {
            this.StoreOutputValue(msg, "message", cache);
            this.RunNextBlock("action", cache);
        });
    }
}