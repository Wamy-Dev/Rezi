module.exports = {
    name: "Draw Text On Canvas",

    description: "Draws a text on the canvas.",

    category: "Canvas Stuff",

    inputs: [
        {
            "id": "action",
            "name": "Action",
            "description": "Acceptable Types: Action\n\nDescription: Executes this block.",
            "types": ["action"]
        },
        {
            "id": "canvas",
            "name": "Canvas",
            "description": "Acceptable Types: Object, Unspecified\n\nDescription: The canvas to draw the text.",
            "types": ["object", "unspecified"],
            "required": true
        },
        {
            "id": "text",
            "name": "Text",
            "description": "Acceptable Types: Text, Unspecified\n\nDescription: The text for drawing on the canvas.",
            "types": ["text", "unspecified"],
            "required": true
        },
        {
            "id": "x",
            "name": "Position X",
            "description": "Acceptable Types: Number, Text, Unspecified\n\nDescription: The position X (horizontal) for the text. Supports percentage (i.e. \"50%\"). Default: \"0\". (OPTIONAL)",
            "types": ["number", "text", "unspecified"]
        },
        {
            "id": "y",
            "name": "Position Y",
            "description": "Acceptable Types: Number, Text, Unspecified\n\nDescription: The position Y (vertical) for the text. Supports percentage (i.e. \"50%\"). Default: \"0\". (OPTIONAL)",
            "types": ["number", "text", "unspecified"]
        },
        {
            "id": "font",
            "name": "Font Name/Path",
            "description": "Acceptable Types: Text, Unspecified\n\nDescription: The font name or the custom font path for the text. Default: \"Arial\". (OPTIONAL)",
            "types": ["text", "unspecified"]
        },
        {
            "id": "font_size",
            "name": "Font Size",
            "description": "Acceptable Types: Number, Unspecified\n\nDescription: The size (pixels) for the text. Default: \"30\". (OPTIONAL)",
            "types": ["number", "unspecified"]
        },
        {
            "id": "color",
            "name": "Text Color",
            "description": "Acceptable Types: Number, Unspecified\n\nDescription: The color for the text. Default: \"black\". (OPTIONAL)",
            "types": ["number", "unspecified"]
        },
        {
            "id": "opacity",
            "name": "Opacity",
            "description": "Acceptable Types: Number, Unspecified\n\nDescription: The opacity (0-1) for the canvas 2. Default: \"1\". (OPTIONAL)",
            "types": ["number", "unspecified"]
        }
    ],

    options: [
        {
            "id": "fill_type",
            "name": "Text Fill Type",
            "description": "Description: The type of fill for the text.",
            "type": "SELECT",
            "options": {
                "fill": "Fill",
                "stroke": "Stroke"
            }
        },
        {
            "id": "align_type",
            "name": "Text Alignment Type",
            "description": "Description: The type of alignment for the text.",
            "type": "SELECT",
            "options": {
                "left": "Left",
                "center": "Center",
                "right": "Right"
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
            "id": "canvas",
            "name": "Canvas",
            "description": "Type: Object\n\nDescription: The canvas with the drawing.",
            "types": ["object"]
        }
    ],

    async code(cache) {
        const canvas = this.GetInputValue("canvas", cache);
        const text = this.GetInputValue("text", cache) + "";
        const x = parseFloat(this.GetInputValue("x", cache));
        const y = parseFloat(this.GetInputValue("y", cache));
        const font = this.GetInputValue("font", cache) + "";
        const size = parseFloat(this.GetInputValue("font_size", cache));
        const color = this.GetInputValue("color", cache) + "";
        const opacity = parseFloat(this.GetInputValue("opacity", cache));
        const type = this.GetOptionValue("fill_type", cache) + "";
        const align = this.GetOptionValue("align_type", cache) + "";

        const _canvas = this.drawText(canvas, text, x, y, {type, font, size, color, align, opacity});

        this.StoreOutputValue(_canvas, "canvas", cache);
        this.RunNextBlock("action", cache);
    }
}