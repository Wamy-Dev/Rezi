module.exports = {
    name: "Null",

    description: "Creates a null value to use it in your blocks.",

    category: "Inputs",

    auto_execute: true,

    inputs: [],

    options: [],

    outputs: [
        {
            "id": "null",
            "name": "Null",
            "description": "Type: Null\n\nDescription: The null.",
            "types": ["null"]
        }
    ],

    code(cache) {
        this.StoreOutputValue(null, "null", cache, "inputBlock");
    }
}