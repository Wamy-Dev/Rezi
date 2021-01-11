module.exports = {
    name: "Get List Length",

    description: "Gets the number of items in the list.",

    category: "List Stuff",

    inputs: [
        {
            "id": "action",
            "name": "Action",
            "description": "Acceptable Types: Action\n\nDescription: Executes this block.",
            "types": ["action"]
        },
        {
            "id": "list",
            "name": "List",
            "description": "Acceptable Types: List, Unspecified\n\nDescription: The list to get the number of items.",
            "types": ["list", "unspecified"],
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
            "id": "number",
            "name": "Number",
            "description": "Type: Number\n\nDescription: The number of items in the list.",
            "types": ["number"]
        }
    ],

    code(cache) {
        const list = this.GetInputValue("list", cache);

        this.StoreOutputValue(list.length, "number", cache);
        this.RunNextBlock("action", cache);
    }
}