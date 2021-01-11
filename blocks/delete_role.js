module.exports = {
    name: "Delete Role",

    description: "Deletes the role.",

    category: "Role Stuff",

    inputs: [
        {
            "id": "action",
            "name": "Action",
            "description": "Acceptable Types: Action\n\nDescription: Executes this block.",
            "types": ["action"]
        },
        {
            "id": "role",
            "name": "Role",
            "description": "Acceptable Types: Object, Unspecified\n\nDescription: The role to delete.",
            "types": ["object", "unspecified"],
            "required": true
        },
        {
            "id": "reason",
            "name": "Reason",
            "description": "Acceptable Types: Text, Unspecified\n\nDescription: The reason for deleting the role. This will appear in Audit Log of the server. (OPTIONAL)",
            "types": ["text", "unspecified"]
        }
    ],

    options: [],

    outputs: [
        {
            "id": "action",
            "name": "Action",
            "description": "Type: Action\n\nDescription: Executes the following blocks when this block finishes its task.",
            "types": ["action"]
        }
    ],

    code(cache) {
        const role = this.GetInputValue("role", cache);
        const reason = this.GetInputValue("reason", cache);

        role.delete(reason).then(() => {
            this.RunNextBlock("action", cache);
        });
    }
}