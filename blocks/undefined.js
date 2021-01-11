module.exports = {
    name: "Undefined",

    description: "Creates an undefined to use it in your blocks.",

    category: "Inputs",

    auto_execute: true,

    inputs: [],

    options: [],

    outputs: [
        {
            "id": "undefined",
            "name": "Undefined",
            "description": "Type: Undefined\n\nDescription: The undefined.",
            "types": ["undefined"]
        }
    ],

    code(cache) {
        this.StoreOutputValue(undefined, "undefined", cache, "inputBlock");
    }
}