module.exports = {
    name: "Set Audio Volume",

    description: "Sets a new volume for the current audio being played by your bot.",

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
            "description": "Acceptable Types: Object, Unspecified\n\nDescription: The server to set the new volume for the current audio being played by your bot.",
            "types": ["object", "unspecified"],
            "required": true,
        },
        {
            "id": "volume",
            "name": "Volume",
            "description": "Acceptable Types: Number, Unspecified\n\nDescription: The new volume for the current audio being played by your bot.",
            "types": ["number", "unspecified"],
            "required": true
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
        const volume = parseInt(this.GetInputValue("volume", cache));

        this.setAudioVolume(server, volume);

        this.RunNextBlock("action", cache);
    }
}