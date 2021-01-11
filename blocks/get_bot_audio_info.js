module.exports = {
    name: "Get Bot Audio Info",

    description: "Gets the bot audio information from the server.\n\nNOTE: Your bot needs to be on a voice channel and playing any audio for this block to work well.",

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
            "description": "Acceptable Types: Object, Unspecified\n\nDescription: The server to get the bot audio information.",
            "types": ["object", "unspecified"],
            "required": true
        }
    ],

    options: [
        {
            "id": "audio_info",
            "name": "Audio Info",
            "description": "Description: The bot audio information to get from the server.",
            "type": "SELECT",
            "options": {
                1: "Server Queue URLs List [List <Text>]",
                2: "Number Of Audios In Server Queue [Number]",
                3: "Next URL In Server Queue [Text]",
                4: "Audio Volume [Number]",
                5: "Audio Volume (Decibels) [Number]",
                6: "Audio Volume (Logarithmic Scale) [Number]",
                7: "Audio Bitrate [Number]",
                8: "Current Audio Created At [Date]",
                9: "Current Audio Played At [Date]",
                10: "Current Audio Seek Position (Seconds) [Number]",
                11: "Current Audio Source [Text]",
                12: "Current Audio YouTube Playlist URL [Text]",
                13: "Is Audio Paused? [Boolean]",
                14: "Is There Any Audio? [Boolean]"
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
            "id": "result",
            "name": "Result",
            "description": "Type: Unspecified\n\nDescription: The information obtained from the bot audio.",
            "types": ["unspecified"]
        }
    ],

    async code(cache) {
        const server = this.GetInputValue("server", cache);
        const audio_info = parseInt(this.GetOptionValue("audio_info", cache));

        let result;

        const serverQueue = this.getServerQueue(server.id);

        const voice = server.voice;
        const connection = voice && voice.connection;
        const dispatcher = connection && connection.dispatcher;

        if(serverQueue) {
            switch(audio_info) {
                case 1:
                    result = serverQueue.queue.map(item => item.url);
                    break;
                case 2:
                    result = serverQueue.queue.length;
                    break;
                case 3:
                    var first = serverQueue.queue[0];
                    result = first && first.url;
                    break;
                case 4:
                    result = parseInt(serverQueue.volume) || 1;
                    break;
                case 5:
                    result = Math.log10(parseInt(serverQueue.volume) || 1) * 20;
                    break;
                case 6:
                    result = Math.pow(parseInt(serverQueue.volume) || 1, 1 / 1.660964);
                    break;
                case 7:
                    result = dispatcher && dispatcher.streamOptions.bitrate;
                    break;
                case 8:
                    result = serverQueue.current.time && new Date(parseInt(serverQueue.current.time));
                    break;
                case 9:
                    result = dispatcher && new Date(parseInt(dispatcher.startTime));
                    break;
                case 10:
                    result = dispatcher && new Date(Date.now() - parseInt(dispatcher.startTime));
                    break;
                case 11:
                    switch(serverQueue.current.type) {
                        case "yt":
                            result = "YouTube";
                            break;
                        case "file":
                            result = "File";
                            break;
                        case "url":
                            result = "URL";
                            break;
                        default:
                            result = "Unknown";
                            break;
                    }
                    break;
                case 12:
                    var current = serverQueue.current;
                    result = current && current.playlist;
                    break;
                case 13:
                    result = dispatcher && dispatcher.paused;
                    break;
                case 14:
                    result = !serverQueue.current && !serverQueue.queue.length;
                    break;
            }
        }

        this.StoreOutputValue(result, "result", cache);
        this.RunNextBlock("action", cache);
    }
}