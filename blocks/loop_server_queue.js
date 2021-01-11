module.exports = {
    name: "Loop Server Queue",

    description: "Sets a loop for a server audio queue.",

    category: "Audio Stuff",

    inputs: [
        {
            "id": "action",
            "name": "Action",
            "description": "Acceptable Types: Action\n\nDescription: Executes this block.",
            "types": ["action"]
        },
        {
            "id": "server",
            "name": "Server",
            "description": "Acceptable Types: Object, Text, Unspecified\n\nDescription: The server to loop its audio queue. Supports server ID.",
            "types": ["object", "text", "unspecified"],
            "required": true
        }
    ],

    options: [
        {
            "id": "loop_type",
            "name": "Loop Type",
            "description": "Description: The type of loop to be performed on the server audio queue.",
            "type": "SELECT",
            "options": {
                "queue": "Loop Whole Queue",
                "current": "Loop Current Audio",
                "off": "No Loop"
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
        const server = this.GetInputValue("server", cache);
        const loop_type = this.GetOptionValue("loop_type", cache) + "";

        this.setLoopQueue(typeof server == "object" ? server.id : server + "", loop_type);

        this.RunNextBlock("action", cache);
    }
}