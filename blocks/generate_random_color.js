module.exports = {
    name: "Generate Random Color",

    description: "Generates a random color.",

    category: "Extras",

    inputs: [
        {
            "id": "action",
            "name": "Action",
            "description": "Acceptable Types: Action\n\nDescription: Executes this block.",
            "types": ["action"]
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
            "id": "color",
            "name": "Color",
            "description": "Type: Text\n\nDescription: The random color generated.",
            "types": ["text"]
        }
    ],

    code(cache) {
        this.StoreOutputValue("#" + Math.random().toString(16).slice(-6), "color", cache);
        this.RunNextBlock("action", cache);
    }
}