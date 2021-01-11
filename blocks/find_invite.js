module.exports = {
    name: "Find Invite",

    description: "Finds an invite.",

    category: "Invite Stuff",

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
            "description": "Acceptable Types: Object, Unspecified\n\nDescription: The server to find the invite. If possible, use this input to get a better result. (OPTIONAL)",
            "types": ["object", "unspecified"]
        },
        {
            "id": "search_value",
            "name": "Search Value",
            "description": "Acceptable Types: Unspecified, Text, Number, Object\n\nDescription: The value according to your choice in the \"Find Invite By\" option.",
            "types": ["unspecified", "text", "number", "object"],
            "required": true
        }
    ],

    options: [
        {
            "id": "find_invite_by",
            "name": "Find Invite By",
            "description": "Description: The type of search for the invite.",
            "type": "SELECT",
            "options": {
                "code": "Invite Code",
                "url": "Invite URL",
                "channel": "Invite Channel",
                "inviter": "Invite Inviter [User] (REQUIRES SERVER)",
                "uses": "Invite Uses (REQUIRES SERVER)"
            }
        }
    ],

    outputs: [
        {
            "id": "action",
            "name": "Action",
            "description": "Acceptable Types: Action\n\nDescription: Executes the following blocks when this block finishes its task.",
            "types": ["action"]
        },
        {
            "id": "invite",
            "name": "Invite",
            "description": "Type: Object\n\nDescription: The invite found if possible.",
            "types": ["object"]
        }
    ],

    async code(cache) {
        const server = this.GetInputValue("server", cache);
        const search_value = this.GetInputValue("search_value", cache);
        const find_invite_by = this.GetOptionValue("find_invite_by", cache);

        let result;

        if(server) {
            const invites = await server.fetchInvites();

            switch(find_invite_by) {
                case "code":
                    result = invites.get(search_value + "");
                    break;
                case "url":
                    result = invites.find(c => c.url == search_value);
                    break;
                case "channel":
                    result = invites.find(c => c.channel == search_value);
                    break;
                case "inviter":
                    result = invites.find(c => c.inviter == search_value);
                    break;
                case "uses":
                    result = invites.find(c => c.uses == search_value);
                    break;
            }
        } else {
            try {
                result = await this.client.fetchInvite(search_value);
            } catch {}
        }

        this.StoreOutputValue(result, "invite", cache);
        this.RunNextBlock("action", cache);
    }
}