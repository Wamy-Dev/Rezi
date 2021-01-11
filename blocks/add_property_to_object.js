module.exports = {
    name: "Add Property To Object",

    description: "Adds a property to the object.",

    category: "Object Stuff",

    inputs: [
        {
            "id": "action",
            "name": "Action",
            "description": "Acceptable Types: Action\n\nDescription: Executes this block.",
            "types": ["action"]
        },
        {
            "id": "object",
            "name": "Object",
            "description": "Acceptable Types: Object, Unspecified\n\nDescription: The object to add this property.",
            "types": ["object", "unspecified"],
            "required": true
        },
        {
            "id": "key",
            "name": "Key",
            "description": "Acceptable Types: Text, Unspecified\n\nDescription: The key for this object property.",
            "types": ["text", "unspecified"],
            "required": true
        },
        {
            "id": "value",
            "name": "Value",
            "description": "Acceptable Types: Unspecified, Undefined, Null, Object, Boolean, Date, Number, Text, List\n\nDescription: The value for this object property.",
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
            "id": "object",
            "name": "Object",
            "description": "Type: Object\n\nDescription: The object with the new property.",
            "types": ["object"]
        }
    ],

    code(cache) {
        const object = this.GetInputValue("object", cache);
        const key = this.GetInputValue("key", cache);
        const value = this.GetInputValue("value", cache);

        object[key] = value;

        this.StoreOutputValue(object, "object", cache);
        this.RunNextBlock("action", cache);
    }
}