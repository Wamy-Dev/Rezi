module.exports = {
    name: "Skip Audio",

    description: "Skips the current audio playing on the server.",

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
            "description": "Acceptable Types: Object, Text, Unspecified\n\nDescription: The server to skip its current audio. Supports server ID.",
            "types": ["object", "text", "unspecified"],
            "required": true
        },
        {
            "id": "number_skips",
            "name": "Number of Skips",
            "description": "Acceptable Types: Number, Unspecified\n\nDescription: The number of skips. Default: \"1\". (OPTIONAL)",
            "types": ["number", "unspecified"]
        }
    ],

    options: [],

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
        const number_skips = parseInt(this.GetInputValue("number_skips", cache));

        this.skipAudio(typeof server == "object" ? server.id : server + "", number_skips - 1);

        this.RunNextBlock("action", cache);
    }
}