module.exports = {
    name: "Get User As Member",

    description: "Gets the member from the user, if the user is present in the server.",

    category: "Server Stuff",

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
            "description": "Acceptable Types: Object, Unspecified\n\nDescription: The server to get user as member.",
            "types": ["object", "unspecified"],
            "required": true
        },
        {
            "id": "user",
            "name": "User",
            "description": "Acceptable Types: Object, Unspecified\n\nDescription: The user to get as member of the server. Supports User ID.",
            "types": ["object", "unspecified"],
            "required": true
        }
    ],

    options: [],

    outputs: [
        {
            "id": "action",
            "name": "Action",
            "description": "Type: Action\n\nDescription: Executes the following blocks when this block finishes its task.",
            "types": ["action"]
        },
        {
            "id": "member",
            "name": "Member",
            "description": "Type: Object\n\nDescription: The user as member of the server.",
            "types": ["object"]
        }
    ],

    code(cache) {
        const server = this.GetInputValue("server", cache);
        const user = this.GetInputValue("user", cache);

        this.StoreOutputValue(server.member(user), "member", cache);
        this.RunNextBlock("action", cache);
    }
}