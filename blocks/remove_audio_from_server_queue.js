module.exports = {
    name: "Remove Audio From Server Queue",

    description: "Remove an audio from the server audio queue.",

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
            "description": "Acceptable Types: Object, Text, Unspecified\n\nDescription: The server to remove the audio from its audio queue. Supports server ID.",
            "types": ["object", "text", "unspecified"],
            "required": true,
        },
        {
            "id": "custom_position",
            "name": "Custom Position",
            "description": "Acceptable Types: Number, Unspecified\n\nDescription: The custom position to remove the audio from the server audio queue. (Only use this input if you selected the option \"Custom Position\")",
            "types": ["number", "unspecified"]
        }
    ],

    options: [
        {
            "id": "position_type",
            "name": "Position Type",
            "description": "Description: The position of the audio in the server audio queue to remove it.",
            "type": "SELECT",
            "options": {
                "first": "First Position",
                "last": "Last Position",
                "random": "Random Position",
                "custom": "Custom Position"
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
        const custom_position = parseInt(this.GetInputValue("custom_position", cache));
        const position_type = this.GetOptionValue("position_type", cache);

        const serverQueue = this.getServerQueue(typeof server == "object" ? server.id : server + "");
        if(serverQueue) {
            const queue = serverQueue.queue;
            switch(position_type) {
                case "first":
                    queue.queue.shift();
                    break;
                case "last":
                    queue.pop();
                    break;
                case "random":
                    queue.splice(Math.floor(Math.random() * (queue.length - 1)), 1);
                    break;
                case "custom":
                    queue.splice(custom_position - 1, 1);
                    break;
            }
        }

        this.RunNextBlock("action", cache);
    }
}