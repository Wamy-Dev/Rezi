module.exports = {
    name: "Get Item From List",

    description: "Gets an item from the list.",

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
            "description": "Acceptable Types: List, Unspecified\n\nDescription: The list to get the item.",
            "types": ["list", "unspecified"],
            "required": true
        },
        {
            "id": "custom_position",
            "name": "Custom Position",
            "description": "Acceptable Types: Number, Unspecified\n\nDescription: The custom position to get the item from the list. Starts at \"1\". (Only use this input if you selected the option \"Custom Position\")",
            "types": ["number", "unspecified"]
        }
    ],

    options: [
        {
            "id": "position_type",
            "name": "Position Type",
            "description": "Description: The position to get the item from the list.",
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
            "id": "value",
            "name": "Value",
            "description": "Type: Unspecified\n\nDescription: The item obtained from the list.",
            "types": ["unspecified"]
        }
    ],

    code(cache) {
        const list = this.GetInputValue("list", cache);
        const position_type = this.GetOptionValue("position_type", cache);
        
        let value;
        switch(position_type) {
            case "first":
                value = list[0];
                break;
            case "last":
                value = list[list.length - 1];
                break;
             case "random":
                value = list[Math.floor(Math.random() * (list.length - 1))];
                break;
            case "custom":
                const custom_position = parseInt(this.GetInputValue("custom_position", cache));
                value = list[custom_position - 1];
                break;
        }

        this.StoreOutputValue(value, "value", cache);
        this.RunNextBlock("action", cache);
    }
}