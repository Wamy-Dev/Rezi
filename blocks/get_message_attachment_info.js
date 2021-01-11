module.exports = {
    name: "Get Message Attachment Info",

    description: "Gets the message attachment information.",

    category: "Message Stuff",

    inputs: [
        {
            "id": "action",
            "name": "Action",
            "description": "Acceptable Types: Action\n\nDescription: Executes this block.",
            "types": ["action"]
        },
        {
            "id": "message_attachment",
            "name": "Message Attachment",
            "description": "Acceptable Types: Object, Unspecified\n\nDescription: The message attachment to get the information.",
            "types": ["object", "unspecified"],
            "required": true
        }
    ],

    options: [
        {
            "id": "message_attachment_info",
            "name": "Message Attachment Info",
            "description": "Description: The message attachment information to get.",
            "type": "SELECT",
            "options": {
                1: "Message Attachment Height [Number]",
                2: "Message Attachment Width [Number]",
                3: "Message Attachment Name [Text]",
                4: "Message Attachment ID [Text]",
                5: "Message Attachment URL [Text]",
                6: "Message Attachment Proxy URL [Text]",
                7: "Message Attachment File Size [Number]",
                8: "Is Message Attachment Spoiler? [Boolean]",
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
            "description": "Type: Unspecified\n\nDescription: The information obtained from the message attachment.",
            "types": ["unspecified"]
        }
    ],

    async code(cache) {
        const message_attachment = this.GetInputValue("message_attachment", cache);
        const message_attachment_info = parseInt(this.GetOptionValue("message_attachment_info", cache));

        let result;
        switch(message_attachment_info) {
            case 1:
                result = message_attachment.height;
                break;
            case 2:
                result = message_attachment.width;
                break;
            case 3:
                result = message_attachment.name;
                break;
            case 4:
                result = message_attachment.id;
                break;
            case 5:
                result = message_attachment.url;
                break;
            case 6:
                result = message_attachment.proxyURL;
                break;
            case 7:
                result = message_attachment.size;
                break;
            case 8:
                result = message_attachment.spoiler;
                break;
        }

        this.StoreOutputValue(result, "result", cache);
        this.RunNextBlock("action", cache);
    }
}