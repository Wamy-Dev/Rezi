module.exports = {
    name: "Crop Canvas",

    description: "Crops the canvas.",

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
            "description": "Acceptable Types: Object, Unspecified\n\nDescription: The canvas to crop.",
            "types": ["object", "unspecified"],
            "required": true
        },
        {
            "id": "x",
            "name": "Position X",
            "description": "Acceptable Types: Number, Text, Unspecified\n\nDescription: The position X (horizontal) for the crop. Supports percentage (i.e. \"50%\"). Default: \"0\". (OPTIONAL)",
            "types": ["number", "text", "unspecified"]
        },
        {
            "id": "y",
            "name": "Position Y",
            "description": "Acceptable Types: Number, Text, Unspecified\n\nDescription: The position Y (vertical) for the crop. Supports percentage (i.e. \"50%\"). Default: \"0\". (OPTIONAL)",
            "types": ["number", "text", "unspecified"]
        },
        {
            "id": "height",
            "name": "Height",
            "description": "Acceptable Types: Number, Text, Unspecified\n\nDescription: The height of the crop. Default: \"100\". (OPTIONAL)",
            "types": ["number", "text", "unspecified"]
        },
        {
            "id": "width",
            "name": "Width",
            "description": "Acceptable Types: Number, Text, Unspecified\n\nDescription: The width of the crop. Default: \"100\". (OPTIONAL)",
            "types": ["number", "text", "unspecified"]
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
        const canvas = this.GetInputValue("canvas", cache);
        const text = this.GetInputValue("text", cache) + "";
        const x = parseFloat(this.GetInputValue("x", cache));
        const y = parseFloat(this.GetInputValue("y", cache));
        const width = parseFloat(this.GetInputValue("width", cache));
        const height = parseFloat(this.GetInputValue("height", cache));

        const _canvas = await this.cropCanvas(canvas, text, x, y, width, height);

        this.StoreOutputValue(_canvas, "canvas", cache);
        this.RunNextBlock("action", cache);
    }
}