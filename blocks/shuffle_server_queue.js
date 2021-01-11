module.exports = {
    name: "Shuffle Server Queue",

    description: "Shuffles or restores the server queue if possible.",

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
            "description": "Acceptable Types: Object, Text, Unspecified\n\nDescription: The server to shuffle its audio queue. Supports server ID.",
            "types": ["object", "text", "unspecified"],
            "required": true
        }
    ],

    options: [
        {
            "id": "action_type",
            "name": "Action Type",
            "description": "Description: The type of action to be performed on the server audio queue.",
            "type": "SELECT",
            "options": {
                "shuffle": "Shuffle Server Queue",
                "restore": "Restore Server Queue"
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
        const action_type = this.GetOptionValue("action_type", cache) + "";

        this.shuffleQueue(typeof server == "object" ? server.id : server + "", action_type == "shuffle");

        this.RunNextBlock("action", cache);
    }
}