module.exports = {
    name: "Merge Texts",

    description: "Merges two texts into a single text.",

    category: "Extras",

    inputs: [
        {
            "id": "action",
            "name": "Action",
            "description": "Acceptable Types: Action\n\nDescription: Executes this block.",
            "types": ["action"]
        },
        {
            "id": "text1",
            "name": "Text 1",
            "description": "Acceptable Types: Text, Unspecified\n\nDescription: The text 1 to merge with the text 2.",
            "types": ["text", "unspecified"],
            "required": true
        },
        {
            "id": "text2",
            "name": "Text 2",
            "description": "Acceptable Types: Text, Unspecified\n\nDescription: The text 2 to merge with the text 1.",
            "types": ["text", "unspecified"],
            "required": true
        },
        {
            "id": "custom_position",
            "name": "Custom Position",
            "description": "Acceptable Types: Number, Unspecified\n\nDescription: The custom position to merge the text 1 to the text 2. Starts at \"1\". (Only use this input if you selected the option \"Custom Position\")",
            "types": ["number", "unspecified"]
        }
    ],

    options: [
        {
            "id": "position_type",
            "name": "Position Type",
            "description": "Description: The position to merge the text 1 to the text 2.",
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
            "id": "text",
            "name": "Text",
            "description": "Type: Text\n\nDescription: The text merged.",
            "types": ["text"]
        }
    ],

    code(cache) {
        let text1 = this.GetInputValue("text1", cache) + "";
        const text2 = this.GetInputValue("text2", cache) + "";
        const position_type = this.GetOptionValue("position_type", cache);

        switch(position_type) {
            case "first":
                text1 = text2 + text1;
                break;
            default:
            case "last":
                text1 += text2;
                break;
            case "random":
                text1 = [...text1];
                text1.splice(Math.round(Math.random() * text1.length), 0, text2);
                text1.join("");
                break;
            case "custom":
                const custom_position = parseInt(this.GetInputValue("custom_position", cache));

                text1 = [...text1];
                text1.splice(custom_position - 1, 0, text2);
                text1.join("");
                break;
        }

        this.StoreOutputValue(text1, "text", cache);
        this.RunNextBlock("action", cache);
    }
}