module.exports = {
    name: "Get Object Info",

    description: "Gets the object information.",

    category: "Object Stuff",

    inputs: [
        {
            "id": "action",
            "name": "Action",
            "description": "Acceptable Types: Action\n\nDescription: Executes this block.",
            "types": ["action"]
        },
        {
            "id": "object",
            "name": "Object",
            "description": "Acceptable Types: Object, Unspecified\n\nDescription: The object to get its information.",
            "types": ["object", "unspecified"],
            "required": true
        }
    ],

    options: [
        {
            "id": "object_info",
            "name": "Object Info",
            "description": "Description: The object information to get.",
            "type": "SELECT",
            "options": {
                1: "Object Keys [List <Text>]",
                2: "Object Values [List <Unspecified>]",
                3: "Object Properties Count [Number]",
                4: "Object As Text [Text]",
                5: "Object As Text (Readable) [Text]"
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
            "description": "Type: Unspecified\n\nDescription: The information obtained from the object.",
            "types": ["unspecified"]
        }
    ],

    code(cache) {
        const object = this.GetInputValue("object", cache);
        const object_info = parseInt(this.GetOptionValue("object_info", cache));

        let result;
        switch(object_info) {
            case 1:
                result = Object.keys(object);
                break;
            case 2:
                result = Object.values(object);
                break;
            case 3:
                result = Object.keys(object).length;
                break;
            case 4:
                result = JSON.stringify(object);
                break;
            case 5:
                result = JSON.stringify(object, undefined, 4);
                break;
        }

        this.StoreOutputValue(result, "result", cache);
        this.RunNextBlock("action", cache);
    }
}