module.exports = {
    name: "Get YouTube Video Info",

    description: "Gets the YouTube video information.",

    category: "Internet Stuff",

    inputs: [
        {
            "id": "action",
            "name": "Action",
            "description": "Acceptable Types: Action\n\nDescription: Executes this block.",
            "types": ["action"]
        },
        {
            "id": "search_value",
            "name": "Search Value",
            "description": "Acceptable Types: Text, Unspecified\n\nDescription: The value to search for the video.",
            "types": ["text", "unspecified"],
            "required": true
        },
        {
            "id": "result_number",
            "name": "Result Number",
            "description": "Acceptable Types: Number, Unspecified\n\nDescription: The number of the resulting video. Starts at \"1\". Default: \"1\". (OPTIONAL)",
            "types": ["number", "unspecified"]
        }
    ],

    options: [
        {
            "id": "video_info",
            "name": "Video Info",
            "description": "Description: The YouTube video information to get.",
            "type": "SELECT",
            "options": {
                1: "Video Title [Text]",
                2: "Video Description [Text]",
                3: "Video Duration (Raw) [Text]",
                4: "Video Duration (Seconds) [Number]",
                5: "Video Views [Number]",
                6: "Video Thumbnail [Text]",
                7: "Video Uploaded At (Raw) [Text]",
                8: "Video URL [Text]",
                9: "Video Channel Name [Text]",
                10: "Video Channel URL [Text]",
                11: "Is Video Channel Verified? [Boolean]",
                12: "Is Live? [Boolean]",
                13: "Is A Movie? [Boolean]",
                14: "Movie Directors List [List <Text>]",
                15: "Movie Actors List [List <Text>]",
                16: "Movie Meta List [List <Text>]"
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
            "description": "Type: Unspecified\n\nDescription: The information obtained from the YouTube video.",
            "types": ["unspecified"]
        }
    ],

    async code(cache) {
        const search_value = this.GetInputValue("search_value", cache) + "";
        const result_number = parseInt(this.GetInputValue("result_number", cache, false, 1));
        const video_info = parseInt(this.GetOptionValue("video_info", cache));

        const ytsr = await this.require("ytsr");

        const res = await ytsr(search_value, {limit: result_number});

        let result;

        if(res.items.length) {
            const video = res.items[result_number - 1];

            switch(video_info) {
                case 1:
                    result = video.title;
                    break;
                case 2:
                    result = video.description;
                    break;
                case 3:
                    result = video.duration;
                    break;
                case 4:
                    var duration = video.duration.split(":").reverse();
                    var fakeDate = new Date(0);
                    fakeDate.setSeconds(duration[0]);
                    fakeDate.setMinutes(duration[1]);
                    fakeDate.setHours(duration[2]);
                    result = fakeDate.getTime();
                    break;
                case 5:
                    result = video.views;
                    break;
                case 6:
                    result = video.thumbnail.split('?')[0];
                    break;
                case 7:
                    result = video.uploaded_at;
                    break;
                case 8:
                    result = video.link;
                    break;
                case 9:
                    result = video.author.name;
                    break;
                case 10:
                    result = video.author.ref;
                    break;
                case 11:
                    result = video.author.verified;
                    break;
                case 12:
                    result = video.live;
                    break;
                case 13:
                    result = video.type == "movie";
                    break;
                case 14:
                    result = video.director && video.director.split(",").map(a => a.trim());
                    break;
                case 15:
                    result = video.actors;
                    break;
                case 16:
                    result = video.meta;
                    break;
            }
        }

        this.StoreOutputValue(result, "result", cache);
        this.RunNextBlock("action", cache);
    }
}