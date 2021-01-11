module.exports = {
    name: "Remove Member Role",

    description: "Removes a role from the member.",

    category: "Member Stuff",

    inputs: [
        {
            "id": "action",
            "name": "Action",
            "description": "Acceptable Types: Action\n\nDescription: Executes this block.",
            "types": ["action"]
        },
        {
            "id": "member",
            "name": "Member",
            "description": "Acceptable Types: Object, Unspecified\n\nDescription: The member to remove the role.",
            "types": ["object", "unspecified"],
            "required": true
        },
        {
            "id": "role",
            "name": "Role(s)",
            "description": "Acceptable Types: Object, List, Unspecified\n\nDescription: The role(s) to remove from the member. Supports List (containing the roles).",
            "types": ["object", "list", "unspecified"],
            "required": true
        },
        {
            "id": "reason",
            "name": "Reason",
            "description": "Acceptable Types: Text, Unspecified\n\nDescription: The reason for removing the role from the member. This will appear in Audit Log of the server. (OPTIONAL)",
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
        const member = this.GetInputValue("member", cache);
        const role = this.GetInputValue("role", cache);
        const reason = this.GetInputValue("reason", cache);

        member.roles.remove(role, reason).then(() => {
            this.RunNextBlock("action", cache);
        });
    }
}