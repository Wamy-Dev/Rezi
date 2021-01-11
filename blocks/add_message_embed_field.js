module.exports = {
    name: "Add Message Embed Field",

    description: "Adds a field to the message embed.",

    category: "Message Embed Stuff",

    inputs: [
        {
            "id": "action",
            "name": "Action",
            "description": "Acceptable Types: Action\n\nDescription: Executes this block.",
            "types": ["action"]
        },
        {
            "id": "message_embed",
            "name": "Message Embed",
            "description": "Acceptable Types: Object, Unspecified\n\nDescription: The message embed to add this field.",
            "types": ["object", "unspecified"],
            "required": true
        },
        {
            "id": "field_name",
            "name": "Field Name",
            "description": "Acceptable Types: Text, Unspecified\n\nDescription: The field name to add to the message embed. Default: Blank. (OPTIONAL)",
            "types": ["text", "unspecified"]
        },
        {
            "id": "field_value",
            "name": "Field Value",
            "description": "Acceptable Types: Text, Unspecified\n\nDescription: The field value to add to the message embed. Default: Blank. (OPTIONAL)",
            "types": ["text", "unspecified"]
        },
        {
            "id": "field_inline",
            "name": "Field Inline",
            "description": "Acceptable Types: Boolean, Unspecified\n\nDescription: The field inline to display to the message embed. Default: \"false\". (OPTIONAL)",
            "types": ["boolean", "unspecified"]
        },
        {
            "id": "custom_position",
            "name": "Custom Position",
            "description": "Acceptable Types: Number, Unspecified\n\nDescription: The custom position to add this field to the message embed. Starts at \"1\". (Only use this input if you selected the option \"Custom Position\")",
            "types": ["number", "unspecified"]
        }
    ],

    options: [
        {
            "id": "position_type",
            "name": "Position Type",
            "description": "Description: The position to add this field to the message embed.",
            "type": "SELECT",
            "options": {
                "last": "Last Position",
                "first": "First Position",
                "random": "Random Position",
                "custom": "Custom Position"
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
            "id": "message_embed",
            "name": "Message Embed",
            "description": "Type: Object\n\nDescription: The message embed with this field added.",
            "types": ["object"]
        }
    ],

    code(cache) {
        const message_embed = this.GetInputValue("message_embed", cache);
        const field_name = this.GetInputValue("field_name", cache, false, "\u200b") + "";
        const field_value = this.GetInputValue("field_value", cache, false, "\u200b") + "";
        const field_inline = Boolean(this.GetInputValue("field_inline", cache));
        const position_type = this.GetOptionValue("position_type", cache) + "";

        switch(position_type) {
            case "first":
                message_embed.spliceFields(0, 0, {
                    name: field_name,
                    value: field_value,
                    inline: field_inline
                });
                break;
            default:
            case "last":
                message_embed.addField(field_name, field_value, field_inline);
                break;
            case "random":
                message_embed.spliceFields(Math.round(Math.random() * message_embed.fields.length), 0, {
                    name: field_name,
                    value: field_value,
                    inline: field_inline
                });
                break;
            case "custom":
                const custom_position = parseInt(this.GetInputValue("custom_position", cache));

                message_embed.spliceFields(Math.max(0, custom_position - 1), 0, {
                    name: field_name,
                    value: field_value,
                    inline: field_inline
                });
                break;
        }

        this.StoreOutputValue(message_embed, "message_embed", cache);
        this.RunNextBlock("action", cache);
    }
}