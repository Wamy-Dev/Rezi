module.exports = {
    name: "Get Webhook Info",

    description: "Gets the webhook information.",

    category: "Webhook Stuff",

    inputs: [
        {
            "id": "action",
            "name": "Action",
            "description": "Acceptable Types: Action\n\nDescription: Executes this block.",
            "types": ["action"]
        },
        {
            "id": "webhook",
            "name": "Webhook",
            "description": "Acceptable Types: Object, Unspecified\n\nDescription: The webhook to get the information.",
            "types": ["object", "unspecified"],
            "required": true
        }
    ],

    options: [
        {
            "id": "webhook_info",
            "name": "Webhook Info",
            "description": "Description: The webhook information to get.",
            "type": "SELECT",
            "options": {
                1: "Webhook Avatar ID [Text]",
                2: "Webhook Avatar URL [Text]",
                3: "Webhook Channel ID [Text]",
                4: "Webhook Created At [Date]",
                5: "Webhook Server ID [Text]",
                6: "Webhook ID [Text]",
                7: "Webhook Name [Text]",
                8: "Webhook Owner [User]",
                9: "Webhook Token [Text]",
                10: "Webhook Type [Text]",
                11: "Webhook URL [Text]",
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
            "description": "Type: Unspecified\n\nDescription: The information obtained from the webhook.",
            "types": ["unspecified"]
        }
    ],

    async code(cache) {
        const webhook = this.GetInputValue("webhook", cache);
        const webhook_info = parseInt(this.GetOptionValue("webhook_info", cache));

        let result;
        switch(webhook_info) {
            case 1:
                result = webhook.avatar;
                break;
            case 2:
                result = webhook.avatarURL({dynamic: true, format: "png"});
                break;
            case 3:
                result = webhook.channelID;
                break;
            case 4:
                result = webhook.createdAt;
                break;
            case 5:
                result = webhook.guildID;
                break;
            case 6:
                result = webhook.id;
                break;
            case 7:
                result = webhook.name;
                break;
            case 8:
                result = webhook.owner;
                break;
            case 9:
                result = webhook.token;
                break;
            case 10:
                result = webhook.type;
                break;
            case 11:
                result = webhook.url;
                break;
        }

        this.StoreOutputValue(result, "result", cache);
        this.RunNextBlock("action", cache);
    }
}