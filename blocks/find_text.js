module.exports = {
    name: "Find Text",

    description: "Finds the specific text in the source text and returns its position.",

    category: "Extras",

    inputs: [
        {
            "id": "action",
            "name": "Action",
            "description": "Acceptable Types: Action\n\nDescription: Executes this block.",
            "types": ["action"]
        },
        {
            "id": "source_text",
            "name": "Source Text",
            "description": "Acceptable Types: Text, Unspecified\n\nDescription: The source text for search.",
            "types": ["text", "unspecified"],
            "required": true
        },
        {
            "id": "text",
            "name": "Text",
            "description": "Acceptable Types: Text, Unspecified\n\nDescription: The text to try to find in the source text.",
            "types": ["text", "unspecified"],
            "required": true
        },
        {
            "id": "result_number",
            "name": "Result Number",
            "description": "Acceptable Types: Number, Unspecified\n\nDescription: The number of the resulting text. Starts at \"1\". Default: \"1\". (OPTIONAL)",
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
            "id": "position",
            "name": "Text Position",
            "description": "Type: Number\n\nDescription: The obtained text position. Starts at \"0\". If no position is found, \"-1\" is returned.",
            "types": ["number"]
        }
    ],

    code(cache) {
        const source_text = this.GetInputValue("source_text", cache) + "";
        const text = this.GetInputValue("text", cache) + "";
        const result_number = parseInt(this.GetInputValue("result_number", cache)) - 1;

        let position = -1,
            loop = 0;

        while ((_position = source_text.indexOf(text, position + 1)) > -1) {
            position = _position;
            if(loop++ >= result_number) break;
        }

        this.StoreOutputValue(position, "position", cache);
        this.RunNextBlock("action", cache);
    }
}