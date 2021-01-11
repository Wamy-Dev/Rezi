module.exports = {
    name: "Create Canvas",

    description: "Creates a canvas.",

    category: "Canvas Stuff",

    inputs: [
        {
            "id": "action",
            "name": "Action",
            "description": "Acceptable Types: Action\n\nDescription: Executes this block.",
            "types": ["action"]
        },
        {
            "id": "url",
            "name": "URL/File Path",
            "description": "Acceptable Types: Text, Unspecified\n\nDescription: The URL or path of the image file to apply to this canvas. (OPTIONAL)",
            "types": ["text", "unspecified"]
        },
        {
            "id": "height",
            "name": "Height",
            "description": "Acceptable Types: Number, Unspecified\n\nDescription: The height of this canvas. Default: Height of URL/file image or \"100\". (OPTIONAL)",
            "types": ["number", "unspecified"]
        },
        {
            "id": "width",
            "name": "Width",
            "description": "Acceptable Types: Number, Unspecified\n\nDescription: The width of this canvas. Default: Width of URL/file image or \"100\". (OPTIONAL)",
            "types": ["number", "unspecified"]
        },
        {
            "id": "delay",
            "name": "Delay (Milliseconds)",
            "description": "Acceptable Types: Number, Unspecified\n\nDescription: The delay (milliseconds) of each frame of this animated canvas. Default: Current delay. (OPTIONAL)",
            "types": ["number", "unspecified"]
        },
        {
            "id": "loop",
            "name": "Loop",
            "description": "Acceptable Types: Number, Unspecified\n\nDescription: The loop of this animated canvas (\"0\" = Infinity).  Default: Current loop. (OPTIONAL)",
            "types": ["number", "unspecified"]
        },
        {
            "id": "color",
            "name": "Color",
            "description": "Acceptable Types: Text, Unspecified\n\nDescription: The solid color for this canvas background. Default: \"white\". (OPTIONAL)",
            "types": ["text", "unspecified"]
        },
        {
            "id": "javascript_code",
            "name": "JavaScript Code",
            "description": "Acceptable Types: Text, Unspecified\n\nDescription: The JavaScript code to apply to this canvas. (OPTIONAL)",
            "types": ["text", "unspecified"]
        }
    ],

    options: [
        {
            "id": "canvas_type",
            "name": "Canvas Type",
            "description": "Description: The type of canvas.",
            "type": "SELECT",
            "options": {
                "auto": "Auto Detect",
                "static": "Static Canvas",
                "animated": "Animated Canvas (Low Performance)"
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
            "description": "Type: Object\n\nDescription: The canvas created.",
            "types": ["object"]
        }
    ],

    async code(cache) {
        const url = this.GetInputValue("url", cache) + "";
        const width = parseFloat(this.GetInputValue("width", cache));
        const height = parseFloat(this.GetInputValue("height", cache));
        const delay = parseInt(this.GetInputValue("delay", cache));
        const loop = parseInt(this.GetInputValue("loop", cache));
        const color = this.GetInputValue("color", cache) || "white";
        const javascript_code = this.GetInputValue("javascript_code", cache);
        const canvas_type = this.GetOptionValue("canvas_type", cache) + "";

        const canvas = await this.createCanvas(url, canvas_type, [width, height, {delay, loop, color, javascript_code}]);

        this.StoreOutputValue(canvas, "canvas", cache);
        this.RunNextBlock("action", cache);
    }
}