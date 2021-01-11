module.exports = {
    name: "Create Message Attachment",

    description: "Creates an attachment for a message.",

    category: "Message Stuff",

    inputs: [
        {
            "id": "action",
            "name": "Action",
            "description": "Acceptable Types: Action\n\nDescription: Executes this block.",
            "types": ["action"]
        },
        {
            "id": "attachment_content",
            "name": "Attachment Content",
            "description": "Acceptable Types: Text, Object, Unspecified\n\nDescription: The content for this attachment. Supports Image, file path and URL.",
            "types": ["text", "object", "unspecified"],
            "required": true
        },
        {
            "id": "attachment_name",
            "name": "Attachment File Name",
            "description": "Acceptable Types: Text, Unspecified\n\nDescription: The file name for this attachment. Default: \"file\". (OPTIONAL)",
            "types": ["text", "unspecified"]
        },
        {
            "id": "custom_attachment_extension",
            "name": "Custom Attachment File Extension",
            "description": "Acceptable Types: Text, Unspecified\n\nDescription: The custom file extension for the attachment. Only use this input if you selected the option \"Custom Extension\" in \"File Extension Type\". (OPTIONAL)",
            "types": ["text", "unspecified"]
        },
        {
            "id": "attachment_spoiler",
            "name": "Attachment Spoiler",
            "description": "Acceptable Types: Boolean, Unspecified\n\nDescription: Whether this attachment is a spoiler. Default: \"false\". (OPTIONAL)",
            "types": ["boolean", "unspecified"]
        }
    ],

    options: [
        {
            "id": "file_extension_type",
            "name": "File Extension Type",
            "description": "Description: The type of extension for the image file.",
            "type": "SELECT",
            "options": {
                "txt": ".txt",
                "json": ".json",
                "png": ".png",
                "jpg": ".jpg",
                "gif": ".gif",
                "custom": "Custom Extension"
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
            "id": "message_attachment",
            "name": "Message Attachment",
            "description": "Type: Object\n\nDescription: This message attachment created.",
            "types": ["object"]
        }
    ],

    code: function(cache) {
        const attachment_content = this.GetInputValue("attachment_content", cache);
        let attachment_name = this.GetInputValue("attachment_name", cache) + "";
        const attachment_spoiler = !!this.GetInputValue("attachment_spoiler", cache);
        const file_extension_type = this.GetOptionValue("file_extension_type", cache) + "";

        if(attachment_spoiler) attachment_name = "SPOILER_" + attachment_name;

        let extension = ".txt";
        switch(file_extension_type) {
            case "json":
                extension = ".json"
                break;
            case "png":
                extension = ".png"
                break;
            case "jpg":
                extension = ".jpg"
                break;
            case "gif":
                extension = ".gif"
                break;
            case "custom":
                const custom = this.GetInputValue("custom_file_extension", cache) + "";
                extension = custom[0] == "." ? custom : "." + custom;
                break;
            /*case "txt":
            default:
                break;*/
        }

        const DiscordJS = require("discord.js");
        this.StoreOutputValue(new DiscordJS.MessageAttachment(attachment_content, attachment_name + extension), "message_attachment", cache);
        this.RunNextBlock("action", cache);
    }
}