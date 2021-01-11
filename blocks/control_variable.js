module.exports = {
    name: "Control Variable",

    description: "Adds more value or sets a new value to the variable.",

    category: "Data Stuff",

    inputs: [
        {
            "id": "action",
            "name": "Action",
            "description": "Acceptable Types: Action\n\nDescription: Executes this block.",
            "types": ["action"]
        },
        {
            "id": "name",
            "name": "Name",
            "description": "Acceptable Types: Text, Unspecified\n\nDescription: The name for this variable.",
            "types": ["text", "unspecified"],
            "required": true
        },
        {
            "id": "value",
            "name": "Value",
            "description": "Acceptable Types: Unspecified, Undefined, Null, Object, Boolean, Date, Number, Text, List\n\nDescription: The value for this variable.",
            "types": ["unspecified", "undefined", "null", "object", "boolean", "date", "number", "text", "list"],
            "required": true
        },
        {
            "id": "workspace_index",
            "name": "Workspace Number",
            "description": "Acceptable Types: Number, Unspecified\n\nDescription: The number of the specific workspace. Starts at \"1\". Only use this input if you selected the option \"Specific Workspace\" in \"Variable Restriction Type\". (OPTIONAL)",
            "types": ["number", "unspecified"]
        }
    ],

    options: [
        {
            "id": "action_type",
            "name": "Action Type",
            "description": "Description: The type of action for this variable. If \"Add\", inserted a number in the \"Value\" input add to the current number in the variable or use a negative number to subtract.",
            "type": "SELECT",
            "options": {
                "set": "Set",
                "add": "Add"
            }
        },
        {
            "id": "variable_type",
            "name": "Variable Type",
            "description": "Description: The type of this variable.",
            "type": "SELECT",
            "options": {
                "temp": "Temporary Variable",
                "global": "Global Variable"
            }
        },
        {
            "id": "variable_restriction_type",
            "name": "Variable Restriction Type",
            "description": "Description: The type of access restriction for this variable. If \"Specific Workspace\", you need to put a number in the \"Workspace Number\" input.",
            "type": "SELECT",
            "options": {
                "current": "Current Workspace",
                "specific": "Specific Workspace",
                "all": "All Workspace"
            }
        }
    ],

    outputs: [
        {
            "id": "action",
            "name": "Action",
            "description": "Type: Action\n\nDescription: Executes the following blocks when this block finishes its task.",
            "types": ["action"]
        }
    ],

    code(cache) {
        const name = this.GetInputValue("name", cache) + "";
        let value = this.GetInputValue("value", cache);
        const index = parseInt(this.GetInputValue("workspace_index", cache)) - 1;
        const action_type = this.GetOptionValue("action_type", cache) + "";
        const type = this.GetOptionValue("variable_type", cache) + "";
        const restriction = this.GetOptionValue("variable_restriction_type", cache) + "";

        if(action_type == "add") {
            let data = this.getVariable(name, {type, restriction, index}, cache);
            if(!isNaN(data)) value += data;
        }

        this.setVariable(name, value, {type, restriction, index}, cache);

        this.RunNextBlock("action", cache);
    }
}