module.exports = {
    name: "Remove Item From List",

    description: "Removes an item from the list.",

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
            "description": "Acceptable Types: List, Unspecified\n\nDescription: The list to remove the item.",
            "types": ["list", "unspecified"],
            "required": true
        },
        {
            "id": "custom_position",
            "name": "Custom Position",
            "description": "Acceptable Types: Number, Unspecified\n\nDescription: The custom position to remove the item from the list. Starts at \"1\". (Only use this input if you selected the option \"Custom Position\")",
            "types": ["number", "unspecified"]
        }
    ],

    options: [
        {
            "id": "position_type",
            "name": "Position Type",
            "description": "Description: The position of the list item to remove.",
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
            "description": "Type: List\n\nDescription: The list with the item removed.",
            "types": ["list"]
        }
    ],

    code(cache) {
        const list = this.GetInputValue("list", cache);
        const position_type = this.GetOptionValue("position_type", cache) + "";

        switch(position_type) {
            case "first":
                list.shift();
                break;
            case "last":
                list.pop();
                break;
            case "random":
                list.splice(Math.floor(Math.random() * (list.length - 1)), 1);
                break;
            case "custom":
                const custom_position = parseInt(this.GetInputValue("custom_position", cache));

                list.splice(custom_position - 1, 1);
                break;
        }

        this.StoreOutputValue(list, "list", cache);
        this.RunNextBlock("action", cache);
    }
}