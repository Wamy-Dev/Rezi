module.exports = {
    name: "Number",

    description: "Creates a number to use it in your blocks.",

    category: "Inputs",

    auto_execute: true,

    inputs: [],

    options: [
        {
            "id": "number",
            "name": "Number",
            "description": "Description: The number to set.",
            "type": "NUMBER"
        }
    ],

    outputs: [
        {
            "id": "number",
            "name": "Number",
            "description": "Type: Number\n\nDescription: The number.",
            "types": ["number"]
        }
    ],

    code(cache) {
        this.StoreOutputValue(parseFloat(this.GetOptionValue("number", cache)), "number", cache, "inputBlock");
    }
}