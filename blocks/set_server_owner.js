module.exports = {
    name: "Set Server Owner",

    description: "Sets a new server owner. NOTE: Your bot MUST be the SERVER OWNER!",

    category: "Bot Stuff",

    inputs: [
        {
            "id": "action",
            "name": "Action",
            "description": "Acceptable Types: Action\n\nDescription: Executes this block.",
            "types": ["action"]
        },
        {
            "id": "server",
            "name": "Server",
            "description": "Acceptable Types: Object, Unspecified\n\nDescription: The server to set the new server owner.",
            "types": ["object", "unspecified"],
            "required": true
        },
        {
            "id": "member",
            "name": "Member",
            "description": "Acceptable Types: Object, Unspecified\n\nDescription: The member to be set as the new server owner. Supports User.",
            "types": ["object", "unspecified"]
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
        const server = this.GetInputValue("server", cache);
        const member = this.GetInputValue("member", cache);

        server.setOwner(member);

        this.RunNextBlock("action", cache);
    }
}