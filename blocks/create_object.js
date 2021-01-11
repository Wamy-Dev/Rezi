module.exports = {
    name: "Create Object",

    description: "Create an object to use it in your blocks.",

    category: "Object Stuff",

    inputs: [
        {
            "id": "action",
            "name": "Action",
            "description": "Acceptable Types: Action\n\nDescription: Executes this block.",
            "types": ["action"]
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
            "description": "Type: List\n\nDescription: This empty object created.",
            "types": ["object"]
        }
    ],

    code(cache) {
        this.StoreOutputValue({}, "object", cache);
        this.RunNextBlock("action", cache);
    }
}