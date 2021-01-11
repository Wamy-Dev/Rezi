module.exports = {
    name: "Convert Text To Object",

    description: "Converts the text to object.",

    category: "Object Stuff",

    inputs: [
        {
            "id": "action",
            "name": "Action",
            "description": "Acceptable Types: Action\n\nDescription: Executes this block.",
            "types": ["action"]
        },
        {
            "id": "text",
            "name": "Text",
            "description": "Acceptable Types: Text, Unspecified\n\nDescription: The text to convert.",
            "types": ["text", "unspecified"],
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
            "id": "object",
            "name": "Object",
            "description": "Type: Object\n\nDescription: The object obtained if possible.",
            "types": ["object"]
        }
    ],

    code(cache) {
        const text = this.GetInputValue("text", cache) + "";

        try {
            var obj = JSON.parse(text);
        } catch {}

        this.StoreOutputValue(obj, "object", cache);
        this.RunNextBlock("action", cache);
    }
}