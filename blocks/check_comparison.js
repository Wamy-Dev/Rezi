module.exports = {
    name: "Check Comparison",

    description: "Compares two values by the selected comparison type.",

    category: "Extras",

    inputs: [
        {
            "id": "action",
            "name": "Action",
            "description": "Acceptable Types: Action\n\nDescription: Executes this block.",
            "types": ["action"]
        },
        {
            "id": "value1",
            "name": "Value 1",
            "description": "Acceptable Types: Unspecified, Undefined, Null, Object, Boolean, Date, Number, Text, List\n\nDescription: The value 1 to compare with the value 2.",
            "types": ["unspecified", "undefined", "null", "object", "boolean", "date", "number", "text", "list"],
            "required": true
        },
        {
            "id": "value2",
            "name": "Value 2",
            "description": "Acceptable Types: Unspecified, Undefined, Null, Object, Boolean, Date, Number, Text, List\n\nDescription: The value 2 to compare with the value 1.",
            "types": ["unspecified", "undefined", "null", "object", "boolean", "date", "number", "text", "list"],
            "required": true
        }
    ],

    options: [
        {
            "id": "comparison_type",
            "name": "Comparison Type",
            "description": "Description: The type of comparison between the two values.",
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
            "id": "action1",
            "name": "Action (If True)",
            "description": "Type: Action\n\nDescription: Executes the following blocks if true.",
            "types": ["action"]
        },
        {
            "id": "action2",
            "name": "Action (If False)",
            "description": "Type: Action\n\nDescription: Executes the following blocks if false.",
            "types": ["action"]
        }
    ],

    code(cache) {
        const value1 = this.GetInputValue("value1", cache);
        const value2 = this.GetInputValue("value2", cache);
        const comparison_type = this.GetOptionValue("comparison_type", cache) + "";

        let result  = false;
        switch(comparison_type) {
            case "equal":
                result = value1 == value2;
                break;
            case "not_equal":
                result = value1 != value2;
                break;
            case "equals_exactly":
                result = value1 === value2;
                break;
            case "not_equal_exactly":
                result = value1 !== value2;
                break;
            case "greater_than":
                result = value1 > value2;
                break;
            case "less_than":
                result = value1 < value2;
                break;
            case "greater_than_or_equal":
                result = value1 >= value2;
                break;
            case "less_than_or_equal":
                result = value1 <= value2;
                break;
            case "start_with":
                result = value1.startsWith(value2);
                break;
            case "end_with":
                result = value1.endsWith(value2);
                break;
			case "includes":
                result = value1.includes(value2);
                break;
            case "match_regexp":
                result = this.ConvertRegex(value2).test(value1);
                break;
        }

        this.RunNextBlock(result ? "action1" : "action2", cache);
    }
}