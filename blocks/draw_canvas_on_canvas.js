module.exports = {
    name: "Draw Canvas On Canvas",

    description: "Draws an canvas on the canvas.",

    category: "Canvas Stuff",

    inputs: [
        {
            "id": "action",
            "name": "Action",
            "description": "Acceptable Types: Action\n\nDescription: Executes this block.",
            "types": ["action"]
        },
        {
            "id": "canvas1",
            "name": "Canvas 1",
            "description": "Acceptable Types: Object, Unspecified\n\nDescription: The canvas to draw the canvas 2.",
            "types": ["object", "unspecified"],
            "required": true
        },
        {
            "id": "canvas2",
            "name": "Canvas 2",
            "description": "Acceptable Types: Object, Unspecified\n\nDescription: The canvas for drawing on the canvas 1.",
            "types": ["object", "unspecified"],
            "required": true
        },
        {
            "id": "x",
            "name": "Position X",
            "description": "Acceptable Types: Number, Text, Unspecified\n\nDescription: The position X (horizontal) for the canvas 2. Supports percentage (i.e. \"50%\"). Default: \"0\". (OPTIONAL)",
            "types": ["number", "text", "unspecified"]
        },
        {
            "id": "y",
            "name": "Position Y",
            "description": "Acceptable Types: Number, Text, Unspecified\n\nDescription: The position Y (vertical) for the canvas 2. Supports percentage (i.e. \"50%\"). Default: \"0\". (OPTIONAL)",
            "types": ["number", "text", "unspecified"]
        },
        {
            "id": "width",
            "name": "Custom Width",
            "description": "Acceptable Types: Number, Text, Unspecified\n\nDescription: The custom width for the canvas 2. Supports percentage (i.e. \"50%\"). Default: Current canvas 2 width. (OPTIONAL)",
            "types": ["number", "text", "unspecified"]
        },
        {
            "id": "height",
            "name": "Custom Height",
            "description": "Acceptable Types: Number, Text, Unspecified\n\nDescription: The custom height for the canvas 2. Supports percentage (i.e. \"50%\"). Default: Current canvas 2 height. (OPTIONAL)",
            "types": ["number", "text", "unspecified"]
        },
        {
            "id": "opacity",
            "name": "Opacity",
            "description": "Acceptable Types: Number, Unspecified\n\nDescription: The opacity (0-1) for the canvas 2. Default: \"1\". (OPTIONAL)",
            "types": ["number", "unspecified"]
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
            "id": "canvas",
            "name": "Canvas",
            "description": "Type: Object\n\nDescription: The canvas with the drawing.",
            "types": ["object"]
        }
    ],

    async code(cache) {
        const canvas1 = this.GetInputValue("canvas1", cache);
        const canvas2 = this.GetInputValue("canvas2", cache);
        const x = parseFloat(this.GetInputValue("x", cache));
        const y = parseFloat(this.GetInputValue("y", cache));
        const width = parseFloat(this.GetInputValue("width", cache));
        const height = parseFloat(this.GetInputValue("height", cache));
        const opacity = parseFloat(this.GetInputValue("opacity", cache));

        const canvas = this.drawCanvas(canvas1, canvas2, x, y, {width, height, opacity});

        this.StoreOutputValue(canvas, "canvas", cache);
        this.RunNextBlock("action", cache);
    }
}