module.exports = {
    name: "Repeat Text",

    description: "Repeats the text as much as you want.",

    category: "Extras",

    inputs: [
        {
            "id": "action",
            "name": "Action",
            "description": "Acceptable Types: Action\n\nDescription: Executes this block.",
            "types": ["action"]
        },
        {
            "id": "text",
            "name": "Text",
            "description": "Acceptable Types: Text, Unspecified\n\nDescription: The text to repeat.",
            "types": ["text", "unspecified"],
            "required": true
        },
        {
            "id": "times",
            "name": "Times",
            "description": "Acceptable Types: Number, Unspecified\n\nDescription: The number of times to repeat the text. Starts at \"0\". Default: \"1\". (OPTIONAL)",
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
            "id": "text",
            "name": "Text",
            "description": "Type: Text\n\nDescription: The text repeated.",
            "types": ["text"]
        }
    ],

    code(cache) {
        const text = this.GetInputValue("text", cache) + "";
        const times = parseInt(this.GetInputValue("times", cache));

        this.StoreOutputValue(text.repeat(times + 1), "text", cache);
        this.RunNextBlock("action", cache);
    }
}