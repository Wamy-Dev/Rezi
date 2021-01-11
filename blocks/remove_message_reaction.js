module.exports = {
    name: "Remove Message Reaction",

    description: "Removes all users or a specific user from the message reaction.",

    category: "Message Stuff",

    inputs: [
        {
            "id": "action",
            "name": "Action",
            "description": "Acceptable Types: Action\n\nDescription: Executes this block.",
            "types": ["action"]
        },
        {
            "id": "message_reaction",
            "name": "Message Reaction",
            "description": "Acceptable Types: Object, Unspecified\n\nDescription: The reaction to remove the user(s) from the message.",
            "types": ["object", "unspecified"],
            "required": true
        },
        {
            "id": "user",
            "name": "User",
            "description": "Acceptable Types: Object, Unspecified\n\nDescription: The user to remove from the message reaction. Supports User ID, Member object and Message object (resolves to the message author). Only required if you selected the option \"Specific User\". (OPTIONAL)",
            "types": ["object", "unspecified"]
        }
    ],

    options: [
        {
            "id": "removal_type",
            "name": "Removal type",
            "description": "Description: The type of removal for the reaction.",
            "type": "SELECT",
            "options": {
                "all": "All Users",
                "specific": "Specific User"
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
        const message_reaction = this.GetInputValue("message_reaction", cache);
        const removal_type = this.GetOptionValue("removal_type", cache) + "";

        if(removal_type == "specific") {
            const user = this.GetInputValue("user", cache);

            message_reaction.users.remove(user).then(() => {
                this.RunNextBlock("action", cache);
            });
        } else {
            message_reaction.remove().then(() => {
                this.RunNextBlock("action", cache);
            });
        }
    }
}