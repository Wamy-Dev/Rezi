module.exports = {
    name: "Convert Canvas To Image",

    description: "Converts the canvas to image.",

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
            "description": "Acceptable Types: Object, Unspecified\n\nDescription: The canvas to convert to image.",
            "types": ["object", "unspecified"],
            "required": true
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
            "id": "image",
            "name": "Image",
            "description": "Type: Object\n\nDescription: The image converted from the canvas.",
            "types": ["object"]
        }
    ],

    async code(cache) {
        const canvas = this.GetInputValue("canvas", cache);

        const image = await this.convertToImage(canvas);

        this.StoreOutputValue(image, "image", cache);
        this.RunNextBlock("action", cache);
    }
}