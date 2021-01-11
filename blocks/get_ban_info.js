module.exports = {
    name: "Get Ban Info",

    description: "Gets the ban information.",

    category: "Server Stuff",

    inputs: [
        {
            "id": "action",
            "name": "Action",
            "description": "Acceptable Types: Action\n\nDescription: Executes this block.",
            "types": ["action"]
        },
        {
            "id": "ban",
            "name": "Ban",
            "description": "Acceptable Types: Object, Unspecified\n\nDescription: The ban to get the information.",
            "types": ["object", "unspecified"],
            "required": true
        }
    ],

    options: [
        {
            "id": "ban_info",
            "name": "Ban Info",
            "description": "Description: The ban information to get.",
            "type": "SELECT",
            "options": {
                1: "Ban User [User]",
                2: "Ban Reason [Text]"
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
            "description": "Type: Unspecified\n\nDescription: The information obtained from the ban.",
            "types": ["unspecified"]
        }
    ],

    async code(cache) {
        const ban = this.GetInputValue("ban", cache);
        const ban_info = parseInt(this.GetOptionValue("ban_info", cache));

        let result;
        switch(ban_info) {
            case 1:
                result = ban.user;
                break;
            case 2:
                result = ban.reason;
                break;
        }

        this.StoreOutputValue(result, "result", cache);
        this.RunNextBlock("action", cache);
    }
}