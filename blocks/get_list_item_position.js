module.exports = {
    name: "Get List Item Position",

    description: "Searches for the item from the list and get its position.",

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
            "description": "Acceptable Types: List, Unspecified\n\nDescription: The list to search for the item.",
            "types": ["list", "unspecified"],
            "required": true
        },
        {
            "id": "item",
            "name": "Item",
            "description": "Acceptable Types: Unspecified, Undefined, Null, Object, Boolean, Date, Number, Text, List\n\nDescription: The item to find in the list.",
            "types": ["unspecified", "undefined", "null", "object", "boolean", "date", "number", "text", "list"],
            "required": true
        },
        {
            "id": "start_at",
            "name": "Start Search At",
            "description": "Acceptable Types: Number, Unspecified\n\nDescription: The position to start the search at. Starts at \"1\". (OPTIONAL)",
            "types": ["number", "unspecified"]
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
            "id": "position",
            "name": "Position",
            "description": "Type: Number\n\nDescription: The position of the item found in the list if any. If no position is found, \"-1\" is returned.",
            "types": ["number"]
        }
    ],

    code(cache) {
        const list = this.GetInputValue("list", cache);
        const item = this.GetInputValue("item", cache);
        const start_at = parseInt(this.GetInputValue("start_at", cache));

        this.StoreOutputValue(list.indexOf(item, start_at - 1) + 1, "position", cache);
        this.RunNextBlock("action", cache);
    }
}