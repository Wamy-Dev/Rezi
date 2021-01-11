module.exports = {
    name: "Bot Typing",

    description: "Starts or stops the typing indicator of your bot in a channel.",

    category: "Bot Stuff",

    inputs: [
        {
            "id": "action",
            "name": "Action",
            "description": "Acceptable Types: Action\n\nDescription: Executes this block.",
            "types": ["action"]
        },
        {
            "id": "channel",
            "name": "Channel",
            "description": "Acceptable Types: Object, Unspecified\n\nDescription: The channel to start or stop the typing indicator of your bot.",
            "types": ["object", "unspecified"],
            "required": true
        }
    ],

    options: [
        {
            "id": "typing_indicator_type",
            "name": "Typing Indicator Type",
            "description": "Description: The type of typing indicator.",
            "type": "SELECT",
            "options": {
                "start": "Start Typing",
                "stop": "Stop Typing"
            }
        }
    ],

    outputs: [
        {
            "id": "action",
            "name": "Action",
            "description": "Acceptable Types: Action\n\nDescription: Executes the following blocks when this block finishes its task.",
            "types": ["action"]
        }
    ],

    code(cache) {
        const channel = this.GetInputValue("channel", cache);
        const typing_option = this.GetOptionValue("typing_option", cache);

        if(typing_option == "start") {
            channel.startTyping();
        } else {
            channel.stopTyping(true);
        }

        this.RunNextBlock("action", cache);
    }
}