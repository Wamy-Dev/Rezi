module.exports = {
    name: "Delete Messages",

    description: "Deletes messages in bulk from the text channel.",

    category: "Channel Stuff",

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
            "description": "Acceptable Types: Object, Unspecified\n\nDescription: The text channel to delete the messages in bulk.",
            "types": ["object", "unspecified"],
            "required": true
        },
        {
            "id": "amount_to_delete",
            "name": "Amount To Delete",
            "description": "Acceptable Types: Number, Unspecified\n\nDescription: The number of text channel messages to delete.",
            "types": ["number", "unspecified"],
            "required": true
        },
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
            "id": "messages",
            "name": "Messages",
            "description": "Types: List\n\nDescription: The list of messages deleted.",
            "types": ["list"]
        }
    ],

    code(cache) {
        const text_channel = this.GetInputValue("text_channel", cache);
        const amount_to_delete = Math.max(0, parseInt(this.GetInputValue("amount_to_delete", cache)));

        text_channel.bulkDelete(amount_to_delete).then(msgs => {
            this.StoreOutputValue(msgs.array(), "messages", cache);
            this.RunNextBlock("action", cache);
        });
    }
}