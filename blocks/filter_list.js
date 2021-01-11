module.exports = {
    name: "Filter List",

    description: "Filters the list by comparing the list items to a value. If the list item does not match, it will be deleted.",

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
            "description": "Acceptable Types: List, Unspecified\n\nDescription: The list to filter.",
            "types": ["list", "unspecified"]
        },
        {
            "id": "value",
            "name": "Value",
            "description": "Acceptable Types: Unspecified, Undefined, Null, Object, Boolean, Date, Number, Text, List\n\nDescription: The value to compare.",
            "types": ["unspecified", "undefined", "null", "object", "boolean", "date", "number", "text", "list"]
        }
    ],

    options: [
        {
            "id": "comparison_type",
            "name": "Comparison Type",
            "description": "Description: The comparison type between the list items and the value.",
            "type": "SELECT",
            "options": {
                "equal": "Equal To",
                "not_equal": "Not Equal",
                "equals_exactly": "Equal Exactly",
                "not_equal_exactly": "Not Equal Exactly",
                "greater_than": "Greater Than",
                "less_than": "Less Than",
                "greater_than_or_equal": "Greater Than or Equal To",
                "less_than_or_equal": "Less Than or Equal To",
                "start_with": "Start With",
                "end_with": "End With",
                "includes": "Includes",
                "match_regexp": "Match RegExp"
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
            "description": "Type: List\n\nDescription: The list filtered.",
            "types": ["list"]
        }
    ],

    code(cache) {
        const list = this.GetInputValue("list", cache);
        const value = this.GetInputValue("value", cache);
        const comparison_type = this.GetOptionValue("comparison_type", cache);

        let result = list;
        switch(comparison_type) {
            case "equal":
                result = list.filter(item => item == value);
                break;
            case "not_equal":
                result = list.filter(item => item != value);
                break;
            case "equals_exactly":
                result = list.filter(item => item === value);
                break;
            case "not_equal_exactly":
                result = list.filter(item => item !== value);
                break;
            case "greater_than":
                result = list.filter(item => item > value);
                break;
            case "less_than":
                result = list.filter(item => item < value);
                break;
            case "greater_than_or_equal":
                result = list.filter(item => item >= value);
                break;
            case "less_than_or_equal":
                result = list.filter(item => item <= value);
                break;
            case "start_with":
                result = list.filter(item => item.startsWith(value));
                break;
            case "end_with":
                result = list.filter(item => item.endsWith(value));
                break;
            case "includes":
                result = list.filter(item => item.includes(value));
                break;
            case "match_regexp":
                result = list.filter(item => this.ConvertRegex(value).test(item));
                break;
        }

        this.StoreOutputValue(result, "list", cache);
        this.RunNextBlock("action", cache);
    }
}