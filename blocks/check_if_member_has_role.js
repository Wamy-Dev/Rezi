module.exports = {
    name: "Check If Member Has Role",

    description: "Checks if the member has the role.",

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
            "description": "Acceptable Types: Object, Unspecified\n\nDescription: The member to check if has the role.",
            "types": ["object", "unspecified"],
            "required": true
        },
        {
            "id": "role",
            "name": "Role",
            "description": "Acceptable Types: Object, Text, Unspecified\n\nDescription: The role to check if the member has it. Supports Role ID.",
            "types": ["object", "text", "unspecified"],
            "required": true
        }
    ],

    options: [],

    outputs: [
        {
            "id": "action1",
            "name": "Action (If True)",
            "description": "Type: Action\n\nDescription: Executes the following blocks if the member has the role.",
            "types": ["action"]
        },
        {
            "id": "action2",
            "name": "Action (If False)",
            "description": "Type: Action\n\nDescription: Executes the following blocks if the member does not have the role.",
            "types": ["action"]
        }
    ],

    code(cache) {
        const member = this.GetInputValue("member", cache);
        const role = this.GetInputValue("role", cache);

        let result = false;
        if(typeof role == "string") {
            result = member.roles.cache.has(role);
        } else {
            result = member.roles.cache.some(a => a.id == role.id);
        }

        this.RunNextBlock(result ? "action1" : "action2", cache);
    }
}