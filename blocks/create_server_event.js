module.exports = {
    name: "Bot Join Server [Event]",

    description: "When your bot joins a server, this event will trigger.",

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
            "id": "server",
            "name": "Server",
            "description": "Type: Object\n\nDescription: The server your bot joined.",
            "types": ["object"]
        }
    ],

    code(cache) {
        this.events.on("guildCreate", server => {
            this.StoreOutputValue(server, "server", cache);
            this.RunNextBlock("action", cache);
        });
    }
}