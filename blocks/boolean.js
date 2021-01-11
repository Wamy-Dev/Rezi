module.exports = {
    name: "Boolean",

    description: "Creates a boolean to use it in your blocks.",

    category: "Inputs",

    auto_execute: true,

    inputs: [],

    options: [
        {
            "id": "boolean_type",
            "name": "Boolean Type",
            "description": "Description: The type of boolean to set.",
            "type": "SELECT",
            "options": {
                "true": "True/Yes",
                "false": "False/No"
            }
        }
    ],

    outputs: [
        {
            "id": "boolean",
            "name": "Boolean",
            "description": "Type: Boolean\n\nDescription: The boolean.",
            "types": ["boolean"]
        }
    ],

    code(cache) {
        this.StoreOutputValue(this.GetOptionValue("boolean_type", cache) == "true", "boolean", cache, "inputBlock");
    }
}