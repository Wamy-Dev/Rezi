module.exports = {
    name: "Edit Category",

    description: "Edits a category.",

    category: "Channel Stuff",

    inputs: [
        {
            "id": "action",
            "name": "Action",
            "description": "Acceptable Types: Action\n\nDescription: Executes this block.",
            "types": ["action"]
        },
        {
            "id": "category",
            "name": "Category",
            "description": "Acceptable Types: Object, Unspecified\n\nDescription: The category to edit.",
            "types": ["object", "unspecified"],
            "required": true
        },
        {
            "id": "category_name",
            "name": "Category Name",
            "description": "Acceptable Types: Text, Unspecified\n\nDescription: The new name for this category. (OPTIONAL)",
            "types": ["text", "unspecified"]
        },
        {
            "id": "category_position",
            "name": "Category Position",
            "description": "Acceptable Types: Number, Unspecified\n\nDescription: The new position for this category. (OPTIONAL)",
            "types": ["number", "unspecified"]
        },
        {
            "id": "reason",
            "name": "Reason",
            "description": "Acceptable Types: Text, Unspecified\n\nDescription: The reason for editing this category. This will appear in Audit Log of the server. (OPTIONAL)",
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
        }
    ],

    code(cache) {
        const category = this.GetInputValue("category", cache);
        const category_name = this.GetInputValue("category_name", cache);
        const category_position = parseInt(this.GetInputValue("category_position", cache));
        const reason = this.GetInputValue("reason", cache);

        const data = {
            name: category_name,
            position: category_position
        }

        Object.keys(data).forEach(key => {
            if([undefined, null, NaN].includes(data[key])) delete data[key];
        });

        category.edit(data, reason).then(() => {
            this.RunNextBlock("action", cache);
        });
    }
}