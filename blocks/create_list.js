module.exports = {
    name: "Create List",

    description: "Creates a list to use it in your blocks.",

    category: "List Stuff",

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
            "id": "list",
            "name": "List",
            "description": "Type: List\n\nDescription: This list created.",
            "types": ["list"]
        }
    ],

    code(cache) {
        this.StoreOutputValue([], "list", cache);
        this.RunNextBlock("action", cache);
    }
}