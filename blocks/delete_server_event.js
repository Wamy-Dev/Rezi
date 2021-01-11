module.exports = {
    name: "Bot Leave Server [Event]",

    description: "When your bot leaves a server, a server kicks your bot or a server is deleted, this event will trigger.",

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
            "description": "Type: Object\n\nDescription: The target server.",
            "types": ["object"]
        }
    ],

    code(cache) {
        this.events.on("guildDelete", server => {
            this.StoreOutputValue(server, "server", cache);
            this.RunNextBlock("action", cache);
        });
    }
}