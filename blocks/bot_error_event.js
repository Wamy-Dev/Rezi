module.exports = {
    name: "Bot Error [Event]",

    description: "When there is a bot error, this event will trigger.",

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
            "id": "error_message",
            "name": "Error Message",
            "description": "Type: Object\n\nDescription: The bot error message.",
            "types": ["object"]
        }
    ],

    code(cache) {
        this.events.on("error", error => {
            this.StoreOutputValue(error, "error", cache);
            this.RunNextBlock("action", cache);
        });
    }
}