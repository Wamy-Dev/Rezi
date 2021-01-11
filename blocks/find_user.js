module.exports = {
    name: "Find User",

    description: "Finds an user.",

    category: "User Stuff",

    inputs: [
        {
            "id": "action",
            "name": "Action",
            "description": "Acceptable Types: Action\n\nDescription: Executes this block.",
            "types": ["action"]
        },
        {
            "id": "search_value",
            "name": "Search Value",
            "description": "Acceptable Types: Text, Unspecified\n\nDescription: The value according to your choice in the \"Find User By\" option.",
            "types": ["text", "unspecified"],
            "required": true
        }
    ],

    options: [
        {
            "id": "find_user_by",
            "name": "Find User By",
            "description": "Description: The type of search for the user.",
            "type": "SELECT",
            "options": {
                "id": "User ID (Supports Uncached User)",
                "username": "User Username",
                "tag": "User Tag"
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
            "id": "user",
            "name": "User",
            "description": "Type: Object\n\nDescription: The user found if possible.",
            "types": ["object"]
        }
    ],

    async code(cache) {
        const search_value = this.GetInputValue("search_value", cache);
        const find_user_by = this.GetOptionValue("find_user_by", cache);

        const users = this.client.users;

        let result;
        switch(find_user_by) {
            case "id":
                try {
                    result = await users.fetch(search_value + "");
                } catch {}
                break;
            case "username":
                result = users.cache.find(c => c.username == search_value);
                break;
            case "tag":
                result = users.cache.find(c => c.tag == search_value);
                break;
        }

        this.StoreOutputValue(result, "user", cache);
        this.RunNextBlock("action", cache);
    }
}