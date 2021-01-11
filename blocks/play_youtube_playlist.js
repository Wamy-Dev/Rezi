module.exports = {
    name: "Play YouTube Playlist",

    description: "Plays the audio of each video from a YouTube playlist on the voice channel.",

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
            "description": "Acceptable Types: Object, Text, Unspecified\n\nDescription: The server to put the audio of each video from the YouTube playlist. Supports server ID.",
            "types": ["object", "text", "unspecified"],
            "required": true
        },
        {
            "id": "playlist_id",
            "name": "YouTube Playlist URL/ID",
            "description": "Acceptable Types: Text, Unspecified\n\nDescription: The URL of the YouTube playlist.",
            "types": ["text", "unspecified"],
            "required": true
        },
        {
            "id": "max_results",
            "name": "Max Results",
            "description": "Acceptable Types: Number, Unspecified\n\nDescription: The maximum number of videos to get from the YouTube playlist. Set to \"0\" to get all videos (performance will decrease). Default: \"50\". (OPTIONAL)",
            "types": ["number", "unspecified"]
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
            "description": "Acceptable Types: Number, Text, Unspecified\n\nDescription: The bitrate (quality) of the audios in kbps. If set to \"auto\", the voice channel's bitrate will be used. Default: \"auto\" or the current bitrate. (OPTIONAL)",
            "types": ["number", "text", "unspecified"]
        },
        {
            "id": "custom_position",
            "name": "Custom Position",
            "description": "Acceptable Types: Number, Unspecified\n\nDescription: The custom position to add the audios to the server queue. Starts at \"0\". (Only use this input if you selected the option \"Custom Position\")",
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
        },
        {
            "id": "audio_quality_type",
            "name": "Audio Quality Type",
            "description": "Description: The type of audio quality.",
            "type": "SELECT",
            "options": {
                "highestaudio": "Highest Audio Quality",
                "lowestaudio": "Lowest Audio Quality"
            }
        }
    ],

    outputs: [
        {
            "id": "action",
            "name": "Action",
            "description": "Type: Action\n\nDescription: Executes the following blocks when this block finishes its task.",
            "types": ["action"]
        },
        {
            "id": "number_audios",
            "name": "Number of Audios",
            "description": "Type: Number\n\nDescription: The number of added video audios.",
            "types": ["number"]
        }
    ],

    async code(cache) {
        const server = this.GetInputValue("server", cache);
        const playlist_id = this.GetInputValue("playlist_id", cache) + "";
        const max_results = this.GetInputValue("max_results", cache, true);
        const seek = this.GetInputValue("seek", cache, true);
        const volume = this.GetInputValue("volume", cache, true);
        const bitrate = this.GetInputValue("bitrate", cache, true);
        const custom_position = parseInt(this.GetInputValue("custom_position", cache));
        const audio_behavior_type = this.GetOptionValue("audio_behavior_type", cache) + "";
        const audio_quality_type = this.GetOptionValue("audio_quality_type", cache) + "";

        const _server = typeof server == "object" ? server.id : server + "";

        const options = {
            type: "yt",
            quality: audio_quality_type
        }

        if(seek) options.seek = parseInt(seek.value);
        if(volume) options.volume = volume.volume;
        if(bitrate) options.bitrate = seek.bitrate;

        const ytpl = await this.require("ytpl");

        if(!playlist_id || !ytpl.validateURL(playlist_id)) {
            console.log(`Play YouTube Playlist ERROR: The playlist URL/ID ("${playlist_id}") does not exist or is invalid.`);
            return this.RunNextBlock("action", cache);
        }

        const videos = await ytpl(playlist_id, {limit: max_results ? parseInt(max_results.value) : 50}).then(result => result.items);

        const list = [];
        for (const video of videos) {
            list.push(Object.assign({
                url: video.id,
                playlist: await ytpl.getPlaylistID(playlist_id)
            }, options))
        }

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

        this.addQueue(_server, list, position, audio_behavior_type == "play_now");

        this.StoreOutputValue(videos.length, "number_audios", cache);
        this.RunNextBlock("action", cache);
    }
}