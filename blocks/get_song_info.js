module.exports = {
    name: "Get Song Info",

    description: "Gets the song information.",

    category: "Internet Stuff",

    inputs: [
        {
            "id": "action",
            "name": "Action",
            "description": "Acceptable Types: Action\n\nDescription: Executes this block.",
            "types": ["action"]
        },
        {
            "id": "song_name",
            "name": "Song Name",
            "description": "Acceptable Types: Text, Unspecified\n\nDescription: The name of the song to search for.",
            "types": ["text", "unspecified"],
            "required": true
        }
    ],

    options: [
        {
            "id": "song_info",
            "name": "Song Info",
            "description": "Description: The song information to get.",
            "type": "SELECT",
            "options": {
                "name": "Song Title [Text]",
                "artist": "Song Artist [Text]",
                "lyrics": "Song Lyrics [Text]"
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
            "description": "Type: Unspecified\n\nDescription: The information obtained from the song.",
            "types": ["unspecified"]
        }
    ],

    async code(cache) {
        const song_name = this.GetInputValue("song_name", cache) + "";
        const song_info = this.GetOptionValue("song_info", cache) + "";

        const fetch = await this.require("node-fetch");

        const res = await fetch("https://api.canarado.xyz/lyrics/" + encodeURIComponent(song_name));

        let result;
        if(!res.status.failed) {
            const song = res.content[0];

            switch(song_info) {
                case "title":
                    result = song.title;
                    break;
                case "artist":
                    result = song.artist;
                    break;
                case "lyrics":
                    result = song.lyrics;
                    break;
            }
        }

        this.StoreOutputValue(result, "result", cache);
        this.RunNextBlock("action", cache);
    }
}