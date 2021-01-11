module.exports = {
    name: "Math Operations",

    description: "Performs mathematical operation between two numbers.",

    category: "Extras",

    inputs: [
        {
            "id": "action",
            "name": "Action",
            "description": "Acceptable Types: Action\n\nDescription: Executes this block.",
            "types": ["action"]
        },
        {
            "id": "number1",
            "name": "First Number",
            "description": "Acceptable Types: Number, Unspecified\n\nDescription: The first number to perform a mathematical operation with the second number.",
            "types": ["number", "unspecified"]
        },
        {
            "id": "number2",
            "name": "Second Number",
            "description": "Acceptable Types: Number, Unspecified\n\nDescription: The second number to perform a mathematical operation with the first number.",
            "types": ["number", "unspecified"]
        }
    ],

    options: [
        {
            "id": "math_operation_type",
            "name": "Math Operation Type",
            "description": "Description: The type of math operation to be performed between the two numbers set.",
            "type": "SELECT",
            "options": {
                "addition": "+ (Addition)",
                "subtraction": "- (Subtraction)",
                "division": "÷ (Division)",
                "multiplication": "× (Multiplication)",
                "modulo": "% (Modulo)",
                "exponentiation": "^ (Exponentiation)",
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
            "id": "number",
            "name": "Number",
            "description": "Type: Number\n\nDescription: The number obtained from the mathematical operation between the two numbers.",
            "types": ["number"]
        }
    ],

    code(cache) {
        const number1 = parseFloat(this.GetInputValue("number1", cache));
        const number2 = parseFloat(this.GetInputValue("number2", cache));
        const math_operation_type = this.GetOptionValue("math_operation_type", cache);

        let result;
        switch(math_operation_type) {
            case "addition":
                result = number1 + number2;
                break;
            case "subtraction":
                result = number1 - number2;
                break;
            case "division":
                result = number1 / number2;
                break;
            case "multiplication":
                result = number1 * number2;
                break;
            case "modulo":
                result = number1 % number2;
                break;
            case "exponentiation":
                result = number1 ** number2;
                break;
        }

        this.StoreOutputValue(result, "number", cache);
        this.RunNextBlock("action", cache);
    }
}