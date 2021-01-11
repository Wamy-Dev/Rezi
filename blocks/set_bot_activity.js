module.exports = {
    name: "Set Bot Activity",

    description: "Sets an activity to your bot.",

    category: "Bot Stuff",

    inputs: [
        {
            "id": "action",
            "name": "Action",
            "description": "Acceptable Types: Action\n\nDescription: Executes this block.",
            "types": ["action"]
        },
        {
            "id": "activity_name",
            "name": "Activity Text",
            "description": "Acceptable Types: Text, Unspecified\n\nDescription: The activity text for the activity.",
            "types": ["text", "unspecified"],
            "required": true
        },
        {
            "id": "activity_url",
            "name": "Activity Stream URL",
            "description": "Acceptable Types: Text, Unspecified\n\nDescription: The stream URL of Twitch or YouTube for the activity. (Only use this input if you selected \"Streaming\" option in \"Activity Type\")",
            "types": ["text", "unspecified"]
        }
    ],

    options: [
        {
            "id": "activity_type",
            "name": "Activity Type",
            "description": "Description: The type of activity to your bot.",
            "type": "SELECT",
            "options": {
                "playing": "Playing",
                "listening": "Listening to",
                "watching": "Watching",
                "streaming": "Streaming"
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
        const activity_name = this.GetInputValue("activity_name", cache);
        const activity_twitch_url = this.GetInputValue("activity_url", cache);
        const activity_type = this.GetOptionValue("activity_type", cache);

        this.client.user.setActivity(activity_name, {
            "type": activity_type.toUpperCase(),
            "url": activity_twitch_url
        });

        this.RunNextBlock("action", cache);
    }
}