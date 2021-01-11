module.exports = {
    name: "Loop List",

    description: "Loops the list. For each item in the list, this will return its position number and value.",

    category: "Loop Stuff",

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
            "description": "Acceptable Types: List, Unspecified\n\nDescription: The list to loop.",
            "types": ["list", "unspecified"],
            "required": true
        }
    ],

    options: [],

    outputs: [
        {
            "id": "action",
            "name": "Action",
            "description": "Type: Action\n\nDescription: Executes the following blocks for each item in the list.",
            "types": ["action"]
        },
        {
            "id": "index",
            "name": "Position Number",
            "description": "Type: Number\n\nDescription: The item's position number in the list. Starts at \"0\".",
            "types": ["number"]
        },
        {
            "id": "value",
            "name": "Item Value",
            "description": "Type: Unspecified\n\nDescription: The value of the list item.",
            "types": ["unspecified"]
        }
    ],

    code(cache) {
        const list = this.GetInputValue("list", cache);

        for (const [index, value] of Object.entries(list)) {
            this.StoreOutputValue(index, "index", cache);
            this.StoreOutputValue(value, "value", cache);
            this.RunNextBlock("action", cache);
        }
    }
}