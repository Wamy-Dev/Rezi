module.exports = {
    name: "Kick Member",

    description: "Kicks a member from the server.",

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
            "description": "Acceptable Types: Object, Unspecified\n\nDescription: The member to kick from the server.",
            "types": ["object", "unspecified"],
            "required": true
        },
        {
            "id": "reason",
            "name": "Reason",
            "description": "Acceptable Types: Text, Unspecified\n\nDescription: The reason for kicking the user from the server. This will appear in Audit Log of the server. (OPTIONAL)",
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
        const reason = this.GetInputValue("reason", cache);

        member.kick(reason).then(() => {
            this.RunNextBlock("action", cache);
        });
    }
}