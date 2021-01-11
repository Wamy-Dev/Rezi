module.exports = {
    name: "Server Unavailable [Event]",

    description: "When a server becomes unavailable, likely due to a server outage, this event will trigger.",

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
            "description": "Type: Object\n\nDescription: The server that has become unavailable.",
            "types": ["object"]
        }
    ],

    code(cache) {
        this.events.on("guildUnavailable", server => {
            this.StoreOutputValue(server, "server", cache);
            this.RunNextBlock("action", cache);
        });
    }
}