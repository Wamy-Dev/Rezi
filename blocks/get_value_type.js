module.exports = {
    name: "Get Value Type",

    description: "Gets the value type (e.g. Text, Number, List, Date, Boolean, Object, Undefined, Null).",

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
            "description": "Acceptable Types: Unspecified, Undefined, Null, Object, Boolean, Date, Number, Text, List\n\nDescription: The value to get its type.",
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
            "id": "value_type",
            "name": "Value Type",
            "description": "Type: Text\n\nDescription: The value type.",
            "types": ["text"]
        }
    ],

    code(cache) {
        const value = this.GetInputValue("value", cache);

        let type = typeof value;

        if(type == "string") type = "Text";
        else if(type == "object" && Array.isArray(value)) type = "List";
        else type = type[0].toUpperCase() + type.substring(1);

        this.StoreOutputValue(type, "value_type", cache);
        this.RunNextBlock("action", cache);
    }
}