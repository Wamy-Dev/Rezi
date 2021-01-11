module.exports = {
    name: "Create Webhook",

    description: "Creates a new webhook for the text channel.",

    category: "Webhook Stuff",

    inputs: [
        {
            "id": "action",
            "name": "Action",
            "description": "Acceptable Types: Action\n\nDescription: Executes this block.",
            "types": ["action"]
        },
        {
            "id": "text_channel",
            "name": "Text Channel",
            "description": "Acceptable Types: Object, Unspecified\n\nDescription: The text channel to create this webhook.",
            "types": ["object", "unspecified"],
            "required": true
        },
        {
            "id": "webhook_name",
            "name": "Webhook Name",
            "description": "Acceptable Types: Text, Unspecified\n\nDescription: The name for this webhook.",
            "types": ["text", "unspecified"],
            "required": true
        },
        {
            "id": "webhook_avatar",
            "name": "Webhook Avatar",
            "description": "Acceptable Types: Text, Object, Unspecified\n\nDescription: The avatar for this webhook. Supports Image, image file path and URL. (OPTIONAL)",
            "types": ["text", "object", "unspecified"]
        },
        {
            "id": "reason",
            "name": "Reason",
            "description": "Acceptable Types: Text, Unspecified\n\nDescription: The reason for creating this webhook. This will appear in Audit Log of the server. (OPTIONAL)",
            "types": ["text", "unspecified"]
        }
    ],

    options: [],

    outputs: [
        {
            "id": "action",
            "name": "Action",
            "description": "Type: Action\n\nDescription: Executes the following blocks when this block finishes its task.",
            "types": ["action"]
        },
        {
            "id": "webhook",
            "name": "Webhook",
            "description": "Type: Object\n\nDescription: This webhook created.",
            "types": ["object"]
        }
    ],

    code(cache) {
        const text_channel = this.GetInputValue("text_channel", cache);
        const webhook_name = this.GetInputValue("webhook_name", cache);
        const webhook_avatar = this.GetInputValue("webhook_avatar", cache);
        const reason = this.GetInputValue("reason", cache);

        const data = {
            avatar: webhook_avatar,
            reason
        }

        Object.keys(data).forEach(key => {
            if([undefined, null, NaN].includes(data[key])) delete data[key];
        });

        text_channel.createWebhook(webhook_name, data).then(webhook => {
            this.StoreOutputValue(webhook, "webhook", cache);
            this.RunNextBlock("action", cache);
        });
    }
}