module.exports = {
    name: "Edit Webhook",

    description: "Edits a webhook.",

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
            "description": "Acceptable Types: Object, Unspecified\n\nDescription: The webhook to edit.",
            "types": ["object", "unspecified"],
            "required": true
        },
        {
            "id": "webhook_name",
            "name": "Webhook Name",
            "description": "Acceptable Types: Text, Unspecified\n\nDescription: The new name for this webhook. (OPTIONAL)",
            "types": ["text", "unspecified"]
        },
        {
            "id": "webhook_avatar",
            "name": "Webhook Avatar",
            "description": "Acceptable Types: Text, Object, Unspecified\n\nDescription: The new avatar for this webhook. Supports URL and file path. (OPTIONAL)",
            "types": ["text", "object", "unspecified"]
        },
        {
            "id": "webhook_channel",
            "name": "Webhook Channel",
            "description": "Acceptable Types: Object, Text, Unspecified\n\nDescription: The new channel for this webhook. Supports Channel ID. (OPTIONAL)",
            "types": ["object", "text", "unspecified"]
        },
        {
            "id": "reason",
            "name": "Reason",
            "description": "Acceptable Types: Text, Unspecified\n\nDescription: The reason for editing this webhook. This will appear in Audit Log of the server. (OPTIONAL)",
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
        }
    ],

    code(cache) {
        const webhook = this.GetInputValue("webhook", cache);
        const webhook_name = this.GetInputValue("webhook_name", cache);
        const webhook_avatar = this.GetInputValue("webhook_avatar", cache);
        const webhook_channel = this.GetInputValue("webhook_channel", cache);
        const reason = this.GetInputValue("reason", cache);

        const data = {
            name: webhook_name,
            avatar: webhook_avatar,
            channel: webhook_channel
        }

        Object.keys(data).forEach(key => {
            if([undefined, null, NaN].includes(data[key])) delete data[key];
        });

        webhook.edit(data, reason).then(() => {
            this.RunNextBlock("action", cache);
        });
    }
}