module.exports = {
    name: "Find Server",

    description: "Finds a server.",

    category: "Server Stuff",

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
            "description": "Acceptable Types: Unspecified, Text, Object\n\nDescription: The value according to your choice in the \"Find Server By\" option.",
            "types": ["unspecified", "text", "object"]
        }
    ],

    options: [
        {
            "id": "find_server_by",
            "name": "Find Server By",
            "description": "Description: The type of search for the server.",
            "type": "SELECT",
            "options": {
                "id": "Server ID",
                "name": "Server Name",
                "name_acronym": "Server Name Acronym",
                "owner": "Server Owner"
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
            "id": "server",
            "name": "Server",
            "description": "Type: Object\n\nDescription: The server found if possible.",
            "types": ["object"]
        }
    ],

    code(cache) {
        const search_value = this.GetInputValue("search_value", cache);
        const find_server_by = this.GetOptionValue("find_server_by", cache) + "";

        const servers = this.client.guilds.cache;

        let result;
        switch(find_server_by) {
            case "id":
                result = servers.get(search_value + "");
                break;
            case "name":
                result = servers.find(c => c.name == search_value);
                break;
            case "name_acronym":
                result = servers.find(c => c.nameAcronym == search_value);
                break;
            case "owner":
                result = servers.find(c => c.owner == search_value);
                break;
        }

        this.StoreOutputValue(result, "server", cache);
        this.RunNextBlock("action", cache);
    }
}