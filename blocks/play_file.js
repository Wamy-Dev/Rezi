module.exports = {
    name: "Play File",

    description: "Plays the audio of a file on the voice channel.",

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
            "description": "Acceptable Types: Object, Text, Unspecified\n\nDescription: The server to put this file audio. Supports server ID.",
            "types": ["object", "text", "unspecified"],
            "required": true
        },
        {
            "id": "file_path",
            "name": "File Path",
            "description": "Acceptable Types: Text, Unspecified\n\nDescription: The file path to play its audio (i.e. \"./Music/kpop.mp3\").",
            "types": ["text", "unspecified"],
            "required": true
        },
        {
            "id": "seek",
            "name": "Seek",
            "description": "Acceptable Types: Number, Unspecified\n\nDescription: The time to seek to. Default: \"0\" or the current seek. (OPTIONAL)",
            "types": ["number", "unspecified"]
        },
        {
            "id": "volume",
            "name": "Volume",
            "description": "Acceptable Types: Number, Boolean, Unspecified\n\nDescription: The volume to play at. Put the boolean \"false\" to disable volume transforms for this stream to improve performance. Default: \"1\" or the current volume. (OPTIONAL)",
            "types": ["number", "boolean", "unspecified"]
        },
        {
            "id": "bitrate",
            "name": "Bitrate",
            "description": "Acceptable Types: Number, Text, Unspecified\n\nDescription: The bitrate (quality) of the audio in kbps. If set to \"auto\", the voice channel's bitrate will be used. Default: \"auto\" or the current bitrate. (OPTIONAL)",
            "types": ["number", "text", "unspecified"]
        },
        {
            "id": "custom_position",
            "name": "Custom Position",
            "description": "Acceptable Types: Number, Unspecified\n\nDescription: The custom position to add the audio to the server queue. Starts at \"0\". (Only use this input if you selected the option \"Custom Position\")",
            "types": ["number", "unspecified"]
        }
    ],

    options: [
        {
            "id": "audio_behavior_type",
            "name": "Audio Behavior Type",
            "description": "Description: The type of audio behavior.",
            "type": "SELECT",
            "options": {
                "add_last": "Add To Server Queue (Last Position)",
                "add_first": "Add To Server Queue (First Position)",
                "add_random": "Add To Server Queue (Random Position)",
                "add_custom": "Add To Server Queue (Custom Position)",
                "play_now": "Play Now"
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

    async code(cache) {
        const path = require("path");

        const server = this.GetInputValue("server", cache);
        const file_path = path.resolve(this.GetInputValue("file_path", cache) + "");
        const seek = this.GetInputValue("seek", cache, true);
        const volume = this.GetInputValue("volume", cache, true);
        const bitrate = this.GetInputValue("bitrate", cache, true);
        const custom_position = parseInt(this.GetInputValue("custom_position", cache));
        const audio_behavior_type = this.GetOptionValue("audio_behavior_type", cache) + "";

        const _server = typeof server == "object" ? server.id : server + "";

        const fs = require("fs");

        if(!file_path || !fs.existsSync(file_path)) {
            console.log(`Play File ERROR: The file path ("${file_path}") does not exist or is invalid.`);
            return this.RunNextBlock("action", cache);
        }

        const options = {
            type: "file",
            url: file_path
        }

        if(seek) options.seek = parseInt(seek.value);
        if(volume) options.volume = volume.volume;
        if(bitrate) options.bitrate = seek.bitrate;

        let position = -1;
        switch (audio_behavior_type) {
            case "add_last":
                // position = -1;
                break;
            case "add_first":
            case "play_now":
                position = 0;
                break;
            case "add_random":
                const serverQueue = this.getServerQueue(_server);
                position = serverQueue ? Math.round(Math.random() * serverQueue.queue.length) : 0;
                break;
            case "add_custom":
                position = custom_position;
                break;
        }

        this.addQueue(_server, options, position, audio_behavior_type == "play_now");

        this.RunNextBlock("action", cache);
    }
}