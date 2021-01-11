module.exports = {
    name: "Create Invite",

    description: "Creates a new invite for the channel.",

    category: "Invite Stuff",

    inputs: [
        {
            "id": "action",
            "name": "Action",
            "description": "Acceptable Types: Action\n\nDescription: Executes this block.",
            "types": ["action"]
        },
        {
            "id": "channel",
            "name": "Channel",
            "description": "Acceptable Types: Object, Unspecified\n\nDescription: The channel to create this invite.",
            "types": ["object", "unspecified"],
            "required": true
        },
        {
            "id": "invite_temporary",
            "name": "Invite Temporary",
            "description": "Acceptable Types: Boolean, Unspecified\n\nDescription: Whether the members that joined via this invite should be automatically kicked after 24 hours if they have not yet received a role. (OPTIONAL)",
            "types": ["boolean", "unspecified"]
        },
        {
            "id": "invite_max_age",
            "name": "Invite Maximum Age",
            "description": "Acceptable Types: Number, Unspecified\n\nDescription: How long this invite should last. (in seconds, 0 for forever) (OPTIONAL)",
            "types": ["number", "unspecified"]
        },
        {
            "id": "invite_max_uses",
            "name": "Invite Maximum Uses",
            "description": "Acceptable Types: Number, Unspecified\n\nDescription: The maximum number of uses for this invite. (OPTIONAL)",
            "types": ["number", "unspecified"]
        },
        {
            "id": "invite_unique",
            "name": "Invite Unique",
            "description": "Acceptable Types: Boolean, Unspecified\n\nDescription: Create an unique invite, or use an existing one with similar settings. (OPTIONAL)",
            "types": ["boolean", "unspecified"]
        },
        {
            "id": "reason",
            "name": "Reason",
            "description": "Acceptable Types: Text, Unspecified\n\nDescription: The reason for creating this category. This will appear in Audit Log of the server. (OPTIONAL)",
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
        },
        {
            "id": "invite",
            "name": "Invite",
            "description": "Type: Object\n\nDescription: This invite created.",
            "types": ["object"]
        }
    ],

    code(cache) {
        const channel = this.GetInputValue("channel", cache);
        const invite_temporary = Boolean(this.GetInputValue("invite_temporary", cache));
        const invite_max_age = parseInt(this.GetInputValue("invite_max_age", cache));
        const invite_max_uses = parseInt(this.GetInputValue("invite_max_uses", cache));
        const invite_unique = Boolean(this.GetInputValue("invite_unique", cache));
        const reason = this.GetInputValue("reason", cache);

        const data = {
            temporary: invite_temporary,
            maxAge: invite_max_age,
            maxUses: invite_max_uses,
            unique: invite_unique,
            reason
        }

        Object.keys(data).forEach(key => {
            if([undefined, null, NaN].includes(data[key])) delete data[key];
        });

        channel.createInvite(data).then(invite => {
            this.StoreOutputValue(invite, "invite", cache);
            this.RunNextBlock("action", cache);
        });
    }
}