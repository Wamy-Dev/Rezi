module.exports = {
    name: "Loop Object",

    description: "Loops the object. For each property in the object, this will return its key and value.",

    category: "Loop Stuff",

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
            "description": "Acceptable Types: Object, Unspecified\n\nDescription: The object to loop.",
            "types": ["object", "unspecified"]
        }
    ],

    options: [],

    outputs: [
        {
            "id": "action",
            "name": "Action",
            "description": "Type: Action\n\nDescription: Executes the following blocks for each property in the object.",
            "types": ["action"]
        },
        {
            "id": "key",
            "name": "Key",
            "description": "Type: Text\n\nDescription: The key of the object property.",
            "types": ["text"]
        },
        {
            "id": "value",
            "name": "Value",
            "description": "Type: Unspecified\n\nDescription: The value of the object property.",
            "types": ["unspecified"]
        },
    ],

    code(cache) {
        const object = this.GetInputValue("object", cache);

        for (const [key, value] of Object.entries(object)) {
            this.StoreOutputValue(key, "key", cache);
            this.StoreOutputValue(value, "value", cache);
            this.RunNextBlock("action", cache);
        }
    }
}