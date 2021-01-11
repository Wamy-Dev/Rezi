module.exports = {
    name: "Get Canvas Info",

    description: "Gets the canvas information.",

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
            "description": "Acceptable Types: Object, Unspecified\n\nDescription: The canvas to get the information.",
            "types": ["object", "unspecified"],
            "required": true
        }
    ],

    options: [
        {
            "id": "canvas_info",
            "name": "Canvas Info",
            "description": "Description: The canvas information to get.",
            "type": "SELECT",
            "options": {
                1: "Canvas Width [Number]",
                2: "Canvas Height [Number]",
                3: "Is Canvas Animated? [Boolean]",
                4: "Canvas Average Color [Text]",
                5: "Canvas Frames List [List <Image>]",
                6: "Canvas Frames Count [Number]",
                7: "Canvas First Frame Delay (Milliseconds) [Number]",
                8: "Canvas Loop Count (\"0\" = Infinity) [Number]"
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
            "id": "result",
            "name": "Result",
            "description": "Type: Unspecified\n\nDescription: The information obtained from the canvas.",
            "types": ["unspecified"]
        }
    ],

    code(cache) {
        const canvas = this.GetInputValue("canvas", cache);
        const canvas_info = parseInt(this.GetOptionValue("canvas_info", cache));

        let result;
        switch(canvas_info) {
            case 1:
                result = canvas.width;
                break;
            case 2:
                result = canvas.height;
                break;
            case 3:
                result = canvas.animated;
                break;
            case 4:
                result = this.canvasAverageColor(canvas);
                break;
            case 5:
                result = canvas.canvas.map(a => a[0].toBuffer());
                break;
            case 6:
                result = canvas.canvas.length;
                break;
            case 7:
                result = canvas.canvas[0][1];
                break;
            case 8:
                result = canvas.loop;
                break;
        }

        this.StoreOutputValue(result, "result", cache);
        this.RunNextBlock("action", cache);
    }
}