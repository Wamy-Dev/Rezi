module.exports = {
    name: "Send Webhook Message",

    description: "Sends a message with a webhook.",

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
            "description": "Acceptable Types: Object, Unspecified\n\nDescription: The webhook to send this message.",
            "types": ["object", "unspecified"],
            "required": true
        },
        {
            "id": "webhook_username_override",
            "name": "Webhook Username Override",
            "description": "Acceptable Types: Text, Unspecified\n\nDescription: The webhook username override for this message. (OPTIONAL)",
            "types": ["text", "unspecified"]
        },
        {
            "id": "webhook_avatar_url_override",
            "name": "Webhook Avatar URL Override",
            "description": "Acceptable Types: Text, Unspecified\n\nDescription: The webhook avatar URL override for this message. (OPTIONAL)",
            "types": ["text", "unspecified"]
        },
        {
            "id": "text",
            "name": "Text",
            "description": "Acceptable Types: Text, Unspecified\n\nDescription: The text to put in the message. (OPTIONAL)",
            "types": ["text", "unspecified"]
        },
        {
            "id": "embed",
            "name": "Embed",
            "description": "Acceptable Types: Object, Unspecified\n\nDescription: The embed to put in the message. (OPTIONAL)",
            "types": ["object", "unspecified"]
        },
        {
            "id": "attachment",
            "name": "Attachment",
            "description": "Acceptable Types: Object, Text, Unspecified\n\nDescription: The attachment to put in the message. Supports Image, file path and URL. (OPTIONAL)",
            "types": ["object", "text", "unspecified"]
        },
        {
            "id": "split_message",
            "name": "Split Message",
            "description": "Acceptable Types: Boolean, Unspecified\n\nDescription: Whether to split the message text into multiple messages if it exceeds the characters limit (2000). (OPTIONAL)",
            "types": ["boolean", "unspecified"]
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
            "id": "message",
            "name": "Message",
            "description": "Type: Object, List\n\nDescription: The message obtained. If \"Split Message\" is enabled, this will return a list containing all message objects instead of a single one.",
            "types": ["object", "list"]
        }
    ],

    code(cache) {
        const webhook = this.GetInputValue("webhook", cache);
        const text = this.GetInputValue("text", cache);
        const webhook_username_override = this.GetInputValue("webhook_username_override", cache);
        const webhook_avatar_url_override = this.GetInputValue("webhook_avatar_url_override", cache);
        const embed = this.GetInputValue("embed", cache);
        const attachment = this.GetInputValue("attachment", cache);
        const split_message = Boolean(this.GetInputValue("split_message", cache));

        webhook.send(text, {
            username: webhook_username_override,
            avatarURL: webhook_avatar_url_override,
            embeds: embed ? [embed] : null,
            files: attachment ? [attachment] : null,
            split: split_message ? {char: ""} : false
        }).then(msg => {
            this.StoreOutputValue(split_message ? (Array.isArray(msg) ? msg : [msg]) : msg, "message", cache);
            this.RunNextBlock("action", cache);
        });
    }
}