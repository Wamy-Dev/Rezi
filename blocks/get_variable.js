module.exports = {
    name: "Get Variable",

    description: "Gets the value of the variable.",

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
            "description": "Acceptable Types: Text, Unspecified\n\nDescription: The name of the variable.",
            "types": ["text", "unspecified"],
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
            "id": "variable_type",
            "name": "Variable Type",
            "description": "Description: The type of the variable.",
            "type": "SELECT",
            "options": {
                "temp": "Temporary Variable",
                "global": "Global Variable"
            }
        },
        {
            "id": "variable_restriction_type",
            "name": "Variable Restriction Type",
            "description": "Description: The type of access restriction of the variable. If \"Specific Workspace\", you need to put a number in the \"Workspace Number\" input.",
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
        },
        {
            "id": "value",
            "name": "Value",
            "description": "Type: Unspecified\n\nDescription: The value of the variable.",
            "types": ["unspecified"]
        }
    ],

    code(cache) {
        const name = this.GetInputValue("name", cache) + "";
        const index = parseInt(this.GetInputValue("workspace_index", cache)) - 1;
        const type = this.GetOptionValue("variable_type", cache) + "";
        const restriction = this.GetOptionValue("variable_restriction_type", cache) + "";

        const value = this.getVariable(name, {type, restriction, index}, cache);

        this.StoreOutputValue(value, "value", cache);
        this.RunNextBlock("action", cache);
    }
}