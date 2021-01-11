module.exports = {
    name: "Change Bot Owner(s)",

    description: "Changes the bot owner(s).",

    category: "Bot Stuff",

    inputs: [
        {
            "id": "action",
            "name": "Action",
            "description": "Acceptable Types: Action\n\nDescription: Executes this block.",
            "types": ["action"]
        },
        {
            "id": "owners",
            "name": "New Owner(s)",
            "description": "Acceptable Types: Object, List, Text, Unspecified\n\nDescription: The new owners to change. Supports user ID or a list containing the users (IDs).",
            "types": ["object", "list", "text", "unspecified"],
            "required": true
        }
    ],

    options: [
        {
            "id": "action_type",
            "name": "Action Type",
            "description": "Description: The type of action to be performed with the new owner(s).",
            "type": "SELECT",
            "options": {
                "set": "Set (Replace)",
                "add": "Add"
            }
        }
    ],

    outputs: [
        {
            "id": "action",
            "name": "Action",
            "description": "Type: Action\n\nDescription: Executes the following blocks when this block finishes its task.",
            "types": ["action"]
        }
    ],

    code(cache) {
        let owners = this.GetInputValue("owners", cache);
        const action_type = this.GetOptionValue("action_type", cache);

        const type = this.getDBB().Core.typeof(owners);

        switch(type) {
            case "object":
                owners = owners.id;
                break;
            case "array":
                owners = owners.filter(a => parseInt(a) || a.id);
                break;
        }

        this.changeOwners(owners, action_type);

        this.RunNextBlock("action", cache);
    }
}