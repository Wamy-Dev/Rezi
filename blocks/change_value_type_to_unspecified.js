module.exports = {
    name: "Change Value Type To Unspecified",

    description: "Changes the value type to \"Unspecified\". Useful to be able to connect to any connector.",

    category: "Extras",

    inputs: [
        {
            "id": "action",
            "name": "Action",
            "description": "Acceptable Types: Action\n\nDescription: Executes this block.",
            "types": ["action"]
        },
        {
            "id": "value",
            "name": "Value",
            "description": "Acceptable Types: Unspecified, Undefined, Null, Object, Boolean, Date, Number, Text, List\n\nDescription: The value to change its value type to \"Unspecified\".",
            "types": ["unspecified", "undefined", "null", "object", "boolean", "date", "number", "text", "list"],
            "required": true
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
            "id": "value",
            "name": "Value",
            "description": "Type: Unspecified\n\nDescription: The value changed to \"Unspecified\".",
            "types": ["unspecified"]
        }
    ],

    code(cache) {
        const value = this.GetInputValue("value", cache);

        this.StoreOutputValue(value, "value", cache);
        this.RunNextBlock("action", cache);
    }
}