module.exports = {
    name: "Remove Message Embed Field",

    description: "Removes a field from the message embed.",

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
            "description": "Acceptable Types: Object, Unspecified\n\nDescription: The message embed to remove the field.",
            "types": ["object", "unspecified"],
            "required": true
        },
        {
            "id": "custom_position",
            "name": "Custom Position",
            "description": "Acceptable Types: Number, Unspecified\n\nDescription: The custom position to remove the field from the message embed. Starts at \"1\". (Only use this input if you selected the option \"Custom Position\")",
            "types": ["number", "unspecified"]
        }
    ],

    options: [
        {
            "id": "position_type",
            "name": "Position Type",
            "description": "Description: The position to remove the field from the message embed.",
            "type": "SELECT",
            "options": {
                "first": "First Position",
                "last": "Last Position",
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
            "description": "Type: Object\n\nDescription: The message embed with the field removed.",
            "types": ["object"]
        }
    ],

    code(cache) {
        const message_embed = this.GetInputValue("message_embed", cache);
        const position_type = this.GetOptionValue("position_type", cache) + "";

        const fields = message_embed.fields;

        switch(position_type) {
            case "first":
                fields.shift();
                break;
            case "last":
                fields.pop();
                break;
            case "random":
                fields.splice(Math.floor(Math.random() * fields.length), 1);
                break;
            case "custom":
                const custom_position = parseInt(this.GetInputValue("custom_position", cache));

                fields.splice(custom_position - 1, 1);
                break;
        }

        this.StoreOutputValue(message_embed, "message_embed", cache);
        this.RunNextBlock("action", cache);
    }
}