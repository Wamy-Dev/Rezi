module.exports = {
    name: "Color",

    description: "Creates a color to use it in your blocks.",

    category: "Inputs",

    auto_execute: true,

    inputs: [],

    options: [
        {
            "id": "color",
            "name": "Color",
            "description": "Description: The color to set.",
            "type": "COLOR"
        }
    ],

    outputs: [
        {
            "id": "color",
            "name": "Color",
            "description": "Type: Text\n\nDescription: The color.",
            "types": ["text"]
        }
    ],

    code(cache) {
        this.StoreOutputValue(this.GetOptionValue("color", cache), "color", cache, "inputBlock");
    }
}