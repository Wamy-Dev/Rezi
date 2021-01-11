module.exports = {
    name: "Console Log",

    description: "Sends a value to your console. Useful for inspecting lists and objects or something else.",

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
            "description": "Acceptable Types: Unspecified, Undefined, Null, Object, Boolean, Date, Number, Text, List\n\nDescription: The value to send to your console.",
            "types": ["unspecified", "undefined", "null", "object", "boolean", "date", "number", "text", "list"]
        }
    ],

    options: [],

    outputs: [
        {
            "id": "action",
            "name": "Action",
            "description": "Type: Action\n\nDescription: Executes the following blocks when this block finishes its task.",
            "types": ["action"]
        }
    ],

    code(cache) {
        const content = this.GetInputValue("value", cache);

        console.log(content);

        this.RunNextBlock("action", cache);
    }
}