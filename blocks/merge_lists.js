module.exports = {
    name: "Merge Lists",

    description: "Merges two lists into a single list.",

    category: "List Stuff",

    inputs: [
        {
            "id": "action",
            "name": "Action",
            "description": "Acceptable Types: Action\n\nDescription: Executes this block.",
            "types": ["action"]
        },
        {
            "id": "list1",
            "name": "List 1",
            "description": "Acceptable Types: List, Unspecified\n\nDescription: The list 1 to merge with the list 2.",
            "types": ["list", "unspecified"],
            "required": true
        },
        {
            "id": "list2",
            "name": "List 2",
            "description": "Acceptable Types: List, Unspecified\n\nDescription: The list 2 to merge with the list 1.",
            "types": ["list", "unspecified"],
            "required": true
        },
        {
            "id": "custom_position",
            "name": "Custom Position",
            "description": "Acceptable Types: Number, Unspecified\n\nDescription: The custom position to merge the list 1 to the list 2. Starts at \"1\". (Only use this input if you selected the option \"Custom Position\")",
            "types": ["number", "unspecified"]
        }
    ],

    options: [
        {
            "id": "position_type",
            "name": "Position Type",
            "description": "Description: The position to merge the list 1 to the list 2.",
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
            "description": "Type: List\n\nDescription: The list merged.",
            "types": ["list"]
        }
    ],

    code(cache) {
        const list1 = this.GetInputValue("list1", cache);
        const list2 = this.GetInputValue("list2", cache);
        const position_type = this.GetOptionValue("position_type", cache);

        switch(position_type) {
            case "first":
                list1.unshift(...list2);
                break;
            default:
            case "last":
                list1.push(...list2);
                break;
            case "random":
                list1.splice(Math.round(Math.random() * list1.length), 0, ...list2);
                break;
            case "custom":
                const custom_position = parseInt(this.GetInputValue("custom_position", cache));

                list1.splice(custom_position - 1, 0, ...list2);
                break;
        }

        this.StoreOutputValue(list1, "list", cache);
        this.RunNextBlock("action", cache);
    }
}