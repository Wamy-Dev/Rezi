module.exports = {
    name: "Prune Members",

    description: "Prunes members from the server.",

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
            "description": "Acceptable Types: Object, Unspecified\n\nDescription: The server to prune members.",
            "types": ["object", "unspecified"],
            "required": true
        },
        {
            "id": "inactivity_days",
            "name": "Inactivity Days",
            "description": "Acceptable Types: Number, Unspecified\n\nDescription: The number of days of inactivity required to kick the members. Default: 7 days. (OPTIONAL)",
            "types": ["number", "unspecified"]
        },
        {
            "id": "dry",
            "name": "Kick Members?",
            "description": "Acceptable Types: Boolean, Unspecified\n\nDescription: Whether to get the number of users that will be kicked instead of kicking them. Default: \"false\". (OPTIONAL)",
            "types": ["boolean", "unspecified"]
        },
        {
            "id": "count",
            "name": "Get Number Of Kicked Members?",
            "description": "Acceptable Types: Boolean, Unspecified\n\nDescription: Whether to return the number of users that have been kicked. Not recommended to set this input to \"false\" for large servers! Default: \"false\". (OPTIONAL)",
            "types": ["boolean", "unspecified"]
        },
        {
            "id": "reason",
            "name": "Reason",
            "description": "Acceptable Types: Text, Unspecified\n\nDescription: The reason for pruning the members from the server. This will appear in Audit Log of the server. (OPTIONAL)",
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
            "id": "pruned_members_amount",
            "name": "Number Of Pruned Members",
            "description": "Types: Number, Null\n\nDescription: The number of members that were/will be kicked. This can return a null value.",
            "types": ["number", "null"]
        }
    ],

    code(cache) {
        const server = this.GetInputValue("server", cache);
        const inactivity_days = parseInt(this.GetInputValue("inactivity_days", cache));
        const dry = Boolean(this.GetInputValue("dry", cache));
        const count = Boolean(this.GetInputValue("count", cache));
        const reason = this.GetInputValue("reason", cache);

        server.members.prune({
            days: inactivity_days,
            dry,
            count,
            reason
        }).then(pruned => {
            this.StoreOutputValue(pruned, "pruned_members_amount", cache);
            this.RunNextBlock("action", cache);
        });
    }
}