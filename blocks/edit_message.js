module.exports = {
    name: "Edit Message",

    description: "Edits a message.",

    category: "Message Stuff",

    inputs: [
        {
            "id": "action",
            "name": "Action",
            "description": "Acceptable Types: Action\n\nDescription: Executes this block.",
            "types": ["action"]
        },
        {
            "id": "message",
            "name": "Message",
            "description": "Acceptable Types: Object, Unspecified\n\nDescription: The message to edit.",
            "types": ["object", "unspecified"],
            "required": true
        },
        {
            "id": "message_text",
            "name": "Message Text",
            "description": "Acceptable Types: Text, Unspecified\n\nDescription: The new text for this message. (OPTIONAL)",
            "types": ["text", "unspecified"]
        },
        {
            "id": "message_embed",
            "name": "Message Embed",
            "description": "Acceptable Types: Object, Unspecified\n\nDescription: The new embed for this message. (OPTIONAL)",
            "types": ["object", "unspecified"]
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
        const message = this.GetInputValue("message", cache);
        const message_text = this.GetInputValue("message_text", cache);
        const message_embed = this.GetInputValue("message_embed", cache);

        message.edit(message_text, message_embed ? {
            embed: message_embed
        } : undefined).then(() => {
            this.RunNextBlock("action", cache);
        });
    }
}