module.exports = {
    name: "Logical Operators",

    description: "The logical operators are used to determine the logic between the values.",

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
            "description": "Acceptable Types: Unspecified, Undefined, Null, Object, Boolean, Date, Number, Text, List\n\nDescription: The value 1 to compare logically to the value 2.",
            "types": ["unspecified", "undefined", "null", "object", "boolean", "date", "number", "text", "list"],
            "required": true
        },
        {
            "id": "value2",
            "name": "Value 2",
            "description": "Acceptable Types: Unspecified, Undefined, Null, Object, Boolean, Date, Number, Text, List\n\nDescription: The value 2 to compare logically to the value 1.",
            "types": ["unspecified", "undefined", "null", "object", "boolean", "date", "number", "text", "list"],
            "required": true
        }
    ],

    options: [
        {
            "id": "logical_operator",
            "name": "Logical Operator Type",
            "description": "Description: The type of logical operator between the values.",
            "type": "SELECT",
            "options": {
                "and": "&& (AND)",
                "or": "|| (OR)"
            }
        },
        {
            "id": "result_type",
            "name": "Result Type",
            "description": "Description: The type of result to return.",
            "type": "SELECT",
            "options": {
                "value": "Value",
                "boolean": "Boolean"
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
            "id": "result",
            "name": "Result",
            "description": "Type: Unspecified, Boolean\n\nDescription: The result of the logic between the values.",
            "types": ["unspecified", "boolean"]
        }
    ],

    code: function(cache) {
        const value1 = this.GetInputValue("value1", cache);
        const value2 = this.GetInputValue("value2", cache);
        const logical_operator = this.GetOptionValue("logical_operator", cache) + "";
        const result_type = this.GetOptionValue("result_type", cache) + "";

        let result;
        switch(logical_operator) {
            case "and":
                result = value1 && value2;
                break;
            case "or":
                result = value1 || value2;
                break;
        }

        this.StoreOutputValue(result_type == "boolean" ? Boolean(result) : result, "result", cache);
        this.RunNextBlock("action", cache);
    }
}