module.exports = {
    name: "Members Chunk [Event]",

    description: "When a chunk of members is received, this event will trigger.",

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
            "id": "list",
            "name": "Members List",
            "description": "Type: List\n\nDescription: The list containing the members of the chunk.",
            "types": ["list"]
        },
        {
            "id": "server",
            "name": "Server",
            "description": "Type: Object\n\nDescription: The server related to the members chunk.",
            "types": ["object"]
        }
    ],

    code(cache) {
        this.events.on("guildMembersChunk", (list, server) => {
            this.StoreOutputValue(list.array(), "list", cache);
            this.StoreOutputValue(server, "server", cache);
            this.RunNextBlock("action", cache);
        });
    }
}