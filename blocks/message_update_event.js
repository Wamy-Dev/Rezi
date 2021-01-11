module.exports = {
    name: "Message Update [Event]",

    description: "When a message is updated/edited, this event will trigger.",

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
            "id": "old_message",
            "name": "Old Message",
            "description": "Type: Object\n\nDescription: The message before the update.",
            "types": ["object"]
        },
        {
            "id": "new_message",
            "name": "New Message",
            "description": "Type: Object\n\nDescription: The message after the update.",
            "types": ["object"]
        }
    ],

    code(cache) {
        this.events.on("messageUpdate", (oldMsg, newMsg) => {
            this.StoreOutputValue(oldMsg, "old_message", cache);
			this.StoreOutputValue(newMsg, "new_message", cache);
            this.RunNextBlock("action", cache);
        });
    }
}