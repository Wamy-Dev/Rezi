module.exports = {
    name: "Add Item to List",

    description: "Adds an item to the list.",

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
            "description": "Acceptable Types: List, Unspecified\n\nDescription: The list to add the item.",
            "types": ["list", "unspecified"],
            "required": true
        },
        {
            "id": "item",
            "name": "Item",
            "description": "Acceptable Types: Unspecified, Undefined, Null, Object, Boolean, Date, Number, Text, List\n\nDescription: The item to add to the list.",
            "types": ["unspecified", "undefined", "null", "object", "boolean", "date", "number", "text", "list"],
            "required": true
        },
        {
            "id": "custom_position",
            "name": "Custom Position",
            "description": "Acceptable Types: Number, Unspecified\n\nDescription: The custom position to add the item to the list. Starts at \"1\". (Only use this input if you selected the option \"Custom Position\")",
            "types": ["number", "unspecified"]
        }
    ],

    options: [
        {
            "id": "position_type",
            "name": "Position Type",
            "description": "Description: The position to add the item to the list.",
            "type": "SELECT",
            "options": {
                "first": "First Position",
                "last": "Last Position",
                "random": "Random Position",
                "custom": "Custom Position"
            }
        }
    ],

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
            "description": "Type: List\n\nDescription: The list with the item added.",
            "types": ["list"]
        }
    ],

    code(cache) {
        const list = this.GetInputValue("list", cache);
        const item = this.GetInputValue("item", cache);
        const position_type = this.GetOptionValue("position_type", cache);

        switch(position_type) {
            case "first":
                list.unshift(item);
                break;
            default:
            case "last":
                list.push(item);
                break;
            case "random":
                list.splice(Math.round(Math.random() * list.length), 0, item);
                break;
            case "custom":
                const custom_position = parseInt(this.GetInputValue("custom_position", cache));

                list.splice(Math.max(0, custom_position - 1), 0, item);
                break;
        }

        this.StoreOutputValue(list, "list", cache);
        this.RunNextBlock("action", cache);
    }
}