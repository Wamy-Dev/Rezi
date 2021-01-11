module.exports = {
    name: "Find Webhook",

    description: "Finds a webhook.",

    category: "Webhook Stuff",

    inputs: [
        {
            "id": "action",
            "name": "Action",
            "description": "Acceptable Types: Action\n\nDescription: Executes this block.",
            "types": ["action"]
        },
        {
            "id": "webhook_id",
            "name": "Webhook ID",
            "description": "Acceptable Types: Text, Unspecified\n\nDescription: The webhook id to find the webhook.",
            "types": ["text", "unspecified"],
            "required": true
        },
        {
            "id": "webhook_token",
            "name": "Webhook Token",
            "description": "Acceptable Types: Text, Unspecified\n\nDescription: The webhook token to find the webhook.",
            "types": ["text", "unspecified"],
            "required": true
        }
    ],

    options: [],

    outputs: [
        {
            "id": "action",
            "name": "Action",
            "description": "Acceptable Types: Action\n\nDescription: Executes the following blocks when this block finishes its task.",
            "types": ["action"]
        },
        {
            "id": "webhook",
            "name": "Webhook",
            "description": "Type: Object\n\nDescription: The webhook found if possible.",
            "types": ["object"]
        }
    ],

    async code(cache) {
        const webhook_id = this.GetInputValue("webhook_id", cache);
        const webhook_token = this.GetInputValue("webhook_token", cache);

        let webhook;
        try {
            webhook = await this.client.fetchWebhook(webhook_id, webhook_token);
        } catch {}

        this.StoreOutputValue(webhook, "webhook", cache);
        this.RunNextBlock("action", cache);
    }
}