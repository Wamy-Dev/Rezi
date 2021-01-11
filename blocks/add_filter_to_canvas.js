module.exports = {
    name: "Add Filter To Canvas",

    description: "Adds a filter to the canvas (i.e. blur, brightness, saturation, grayscale).",

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
            "description": "Acceptable Types: Object, Unspecified\n\nDescription: The canvas to add the filter.",
            "types": ["object", "unspecified"],
            "required": true
        },
        {
            "id": "filter_value",
            "name": "Filter Value",
            "description": "Acceptable Types: Number, Unspecified\n\nDescription: The filter value for this canvas. Default: \"1\" in most cases. (OPTIONAL)",
            "types": ["number", "unspecified"]
        }
    ],

    options: [
        {
            "id": "filter_type",
            "name": "Filter Type",
            "description": "Description: The type of filter for this canvas.",
            "type": "SELECT",
            "options": {
                "brightness": "Brightness",
                "contrast": "Contrast",
                "grayscale": "Grayscale",
                "hueRotate": "Hue Rotate",
                "invert": "Invert",
                "opacity": "Opacity",
                "saturate": "Saturate",
                "sepia": "Sepia",
                "blur": "Blur (Low Performance)",
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
            "description": "Type: Object\n\nDescription: The canvas with the filter.",
            "types": ["object"]
        }
    ],

    async code(cache) {
        const canvas = this.GetInputValue("canvas", cache);
        const filter_value = parseFloat(this.GetInputValue("filter_value", cache));
        const filter_type = this.GetOptionValue("filter_type", cache) + "";

        const _canvas = await this.addCanvasFilter(canvas, filter_type, filter_value);

        this.StoreOutputValue(_canvas, "canvas", cache);
        this.RunNextBlock("action", cache);
    }
}