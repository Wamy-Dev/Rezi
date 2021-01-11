module.exports = {
    name: "Generate Random Text",

    description: "Generates a random text.",

    category: "Extras",

    inputs: [
        {
            "id": "action",
            "name": "Action",
            "description": "Acceptable Types: Action\n\nDescription: Executes this block.",
            "types": ["action"]
        },
        {
            "id": "max_characters",
            "name": "Maximum Characters",
            "description": "Acceptable Types: Number, Unspecified\n\nDescription: The number of characters for the generated text. Default: \"15\". (OPTIONAL)",
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
            "description": "Type: Text\n\nDescription: The random text generated.",
            "types": ["text"]
        }
    ],

    code(cache) {
        const max_characters = parseInt(this.GetInputValue("max_characters", cache));

        this.StoreOutputValue(this.getDBB().Core.generateID(max_characters), "text", cache);
        this.RunNextBlock("action", cache);
    }
}