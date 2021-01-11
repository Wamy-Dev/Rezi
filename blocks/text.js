module.exports = {
    name: "Text",

    description: "Creates a text to use it in your blocks.",

    category: "Inputs",

    auto_execute: true,

    inputs: [],

    options: [
        {
            "id": "text",
            "name": "Text",
            "description": "Description: The text to set.",
            "type": "TEXT"
        }
    ],

    outputs: [
        {
            "id": "text",
            "name": "Text",
            "description": "Type: Text\n\nDescription: The text.",
            "types": ["text"]
        }
    ],

    code(cache) {
        this.StoreOutputValue(this.GetOptionValue("text", cache), "text", cache, "inputBlock");
    }
}