module.exports = {
    name: "Rich Presence Update [Event]",

    description: "When a rich presence is updated, this event will trigger.",

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
            "id": "old_presence",
            "name": "Old Rich Presence",
            "description": "Type: Object, Undefined\n\nDescription: The rich presence before the update if existed.",
            "types": ["object", "undefined"]
        },
        {
            "id": "new_presence",
            "name": "New Rich Presence",
            "description": "Type: Object\n\nDescription: The rich presence after the update.",
            "types": ["object"]
        }
    ],

    code(cache) {
        this.events.on("presenceUpdate", (old_presence, new_presence) => {
            this.StoreOutputValue(old_presence, "old_presence", cache);
			this.StoreOutputValue(new_presence, "new_presence", cache);
            this.RunNextBlock("action", cache);
        });
    }
}