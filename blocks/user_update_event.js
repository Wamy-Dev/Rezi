module.exports = {
    name: "User Update [Event]",

    description: "When an user's detail (username, tag, avatar, etc...) is updated, this event will trigger.",

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
            "id": "old_user",
            "name": "Old User",
            "description": "Type: Object\n\nDescription: The user before the update.",
            "types": ["object"]
        },
        {
            "id": "new_user",
            "name": "New User",
            "description": "Type: Object\n\nDescription: The user after the update.",
            "types": ["object"]
        }
    ],

    code(cache) {
        this.events.on("userUpdate", (old_user, new_user) => {
            this.StoreOutputValue(old_user, "old_user", cache);
			this.StoreOutputValue(new_user, "new_user", cache);
            this.RunNextBlock("action", cache);
        });
    }
}