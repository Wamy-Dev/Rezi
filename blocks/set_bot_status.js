module.exports = {
    name: "Set Bot Status",

    description: "Sets a status to your bot.",

    category: "Bot Stuff",

    inputs: [
        {
            "id": "action",
            "name": "Action",
            "description": "Acceptable Types: Action\n\nDescription: Executes this block.",
            "types": ["action"]
        }
    ],

    options: [
        {
            "id": "status_type",
            "name": "Status Type",
            "description": "Description: The type of status for your bot.",
            "type": "SELECT",
            "options": {
                "online": "Online",
                "dnd": "Do Not Disturb",
                "idle": "Idle",
                "invisible": "Invisible"
            }
        }
    ],

    outputs: [
        {
            "id": "action",
            "name": "Action",
            "description": "Type: Action\n\nDescription: Executes the following blocks when this block finishes its task.",
            "types": ["action"]
        }
    ],

    code(cache) {
        const status_type = this.GetOptionValue("status_type", cache);

        this.client.user.setStatus(status_type);

        this.RunNextBlock("action", cache);
    }
}