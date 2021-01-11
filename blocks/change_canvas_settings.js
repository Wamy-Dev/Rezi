module.exports = {
    name: "Change Canvas Settings",

    description: "Changes the canvas settings.",

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
            "description": "Acceptable Types: Object, Unspecified\n\nDescription: The canvas to change its settings.",
            "types": ["object", "unspecified"],
            "required": true
        },
        {
            "id": "frame",
            "name": "Frame (Canvas)",
            "description": "Acceptable Types: Object, Unspecified\n\nDescription: The new frame (canvas) for this canvas (affects all frames if there is no custom frame). (OPTIONAL)",
            "types": ["object", "unspecified"]
        },
        {
            "id": "delay",
            "name": "Delay (Miliseconds)",
            "description": "Acceptable Types: Number, Unspecified\n\nDescription: The new delay for this canvas (affects all frames if there is no custom frame). (OPTIONAL)",
            "types": ["number", "unspecified"]
        },
        {
            "id": "loop",
            "name": "Loop",
            "description": "Acceptable Types: Number, Unspecified\n\nDescription: The new loop for this canvas (\"0\" = Infinity). (OPTIONAL)",
            "types": ["number", "unspecified"]
        },
        {
            "id": "custom_frame",
            "name": "Custom Frame",
            "description": "Acceptable Types: Number, Unspecified\n\nDescription: The custom frame instead of all frames. Starts at \"1\". (OPTIONAL)",
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
            "description": "Type: Object\n\nDescription: The canvas changed.",
            "types": ["object"]
        }
    ],

    code(cache) {
        const canvas = this.GetInputValue("canvas", cache);
        const frame = this.GetInputValue("frame", cache);
        const delay = parseInt(this.GetInputValue("delay", cache));
        const loop = parseInt(this.GetInputValue("loop", cache));
        const custom_frame = parseInt(this.GetInputValue("custom_frame", cache)) - 1;

        const _canvas = this.changeCanvasSettings(canvas, {frame, delay, loop, custom_frame});

        this.StoreOutputValue(_canvas, "canvas", cache);
        this.RunNextBlock("action", cache);
    }
}