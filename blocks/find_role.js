module.exports = {
    name: "Find Role",

    description: "Finds a role.",

    category: "Role Stuff",

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
            "description": "Acceptable Types: Object, Unspecified\n\nDescription: The server to find the role. If possible, use this input to avoid finding the role on an unintended server. (OPTIONAL)",
            "types": ["object", "unspecified"]
        },
        {
            "id": "search_value",
            "name": "Search Value",
            "description": "Acceptable Types: Unspecified, Text, Number\n\nDescription: The value according to your choice in the \"Find Role By\" option.",
            "types": ["unspecified", "text", "number"],
            "required": true
        }
    ],

    options: [
        {
            "id": "find_role_by",
            "name": "Find Role By",
            "description": "Description: The type of search for the role.",
            "type": "SELECT",
            "options": {
                "id": "Role ID",
                "name": "Role Name",
                "position": "Role Position",
                "color_hex": "Role Color (Hex)",
                "color_base10": "Role Color (Base 10)"
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
            "id": "role",
            "name": "Role",
            "description": "Type: Object\n\nDescription: The role found if possible.",
            "types": ["object"]
        }
    ],

    code(cache) {
        const server = this.GetInputValue("server", cache);
        const search_value = this.GetInputValue("search_value", cache);
        const find_role_by = this.GetOptionValue("find_role_by", cache);

        const roles = server ? server.roles.cache : [].concat(...this.client.guilds.cache.map(a => a.roles.cache.array()));

        let result;
        switch(find_role_by) {
            case "id":
                result = roles.find(c => c.id == search_value);
                break;
            case "name":
                result = roles.find(c => c.name == search_value);
                break;
            case "position":
                result = roles.find(c => c.position === parseInt(search_value));
                break;
            case "color_hex":
                result = roles.find(c => c.hexColor == search_value);
                break;
            case "color_base10":
                result = roles.find(c => c.color === search_value);
                break;
        }

        this.StoreOutputValue(result, "role", cache);
        this.RunNextBlock("action", cache);
    }
}