module.exports = {
    name: "Remove Property From Object",

    description: "Removes a property from the object.",

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
            "description": "Acceptable Types: Object, Unspecified\n\nDescription: The object to remove the property.",
            "types": ["object", "unspecified"],
            "required": true
        },
        {
            "id": "key",
            "name": "Key",
            "description": "Acceptable Types: Text, Unspecified\n\nDescription: The key of the property to remove.",
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
            "description": "Type: Object\n\nDescription: The object without the property.",
            "types": ["object"]
        }
    ],

    code(cache) {
        const object = this.GetInputValue("object", cache);
        const key = this.GetInputValue("key", cache);

        delete object[key];

        this.StoreOutputValue(object, "object", cache);
        this.RunNextBlock("action", cache);
    }
}