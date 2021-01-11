module.exports = {
    name: "Create Category",

    description: "Creates a new category for the server.",

    category: "Channel Stuff",

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
            "description": "Acceptable Types: Object, Unspecified\n\nDescription: The server to create this category.",
            "types": ["object", "unspecified"],
            "required": true
        },
        {
            "id": "category_name",
            "name": "Category Name",
            "description": "Acceptable Types: Text, Unspecified\n\nDescription: The name for this category.",
            "types": ["text", "unspecified"],
            "required": true
        },
        {
            "id": "category_position",
            "name": "Category Position",
            "description": "Acceptable Types: Number, Unspecified\n\nDescription: The position for this category. Default: \"0\". (OPTIONAL)",
            "types": ["number", "unspecified"]
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
            "id": "category",
            "name": "Category",
            "description": "Type: Object\n\nDescription: This category created.",
            "types": ["object"]
        }
    ],

    code(cache) {
        const server = this.GetInputValue("server", cache);
        const category_name = this.GetInputValue("category_name", cache) + "";
        const category_position = parseInt(this.GetInputValue("category_position", cache));
        const reason = this.GetInputValue("reason", cache);

        const data = {
            type: "category",
            position: category_position,
            reason
        }

        Object.keys(data).forEach(key => {
            if([undefined, null, NaN].includes(data[key])) delete data[key];
        });

        server.channels.create(category_name, data).then(category => {
            this.StoreOutputValue(category, "category", cache);
            this.RunNextBlock("action", cache);
        });
    }
}