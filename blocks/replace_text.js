module.exports = {
    name: "Replace Text",

    description: "Replaces the first or all old texts with the new text.",

    category: "Extras",

    inputs: [
        {
            "id": "action",
            "name": "Action",
            "description": "Acceptable Types: Action\n\nDescription: Executes this block.",
            "types": ["action"]
        },
        {
            "id": "source_text",
            "name": "Source Text",
            "description": "Acceptable Types: Text, Unspecified\n\nDescription: The source text for replacement.",
            "types": ["text", "unspecified"],
            "required": true
        },
        {
            "id": "old_text",
            "name": "Old Text",
            "description": "Acceptable Types: Text, Unspecified\n\nDescription: The old text that will be replaced by the new text.",
            "types": ["text", "unspecified"],
            "required": true
        },
        {
            "id": "new_text",
            "name": "New Text",
            "description": "Acceptable Types: Text, Unspecified\n\nDescription: The new text to replace the old text.",
            "types": ["text", "unspecified"],
            "required": true
        }
    ],

    options: [
        {
            "id": "replacement_type",
            "name": "Replacement Type",
            "description": "Description: The type of replacement to execute.",
            "type": "SELECT",
            "options": {
                "first": "First Result",
                "all": "All Results"
            }
        }
    ],

    outputs: [
        {
            "id": "action",
            "name": "Action",
            "description": "Type: Action\n\nDescription: Executes the following blocks when this block finishes its task.",
            "types": ["action"]
        },
        {
            "id": "text",
            "name": "Text",
            "description": "Type: Text\n\nDescription: The text replaced.",
            "types": ["text"]
        }
    ],

    code(cache) {
        const source_text = this.GetInputValue("source_text", cache);
        const old_text = this.GetInputValue("old_text", cache);
        const new_text = this.GetInputValue("new_text", cache);
        const replacement_type = this.GetOptionValue("replacement_type", cache);

        const escapeRegExp = txt => txt.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');

        let res = source_text;
        switch(replacement_type) {
            case "all":
                res = source_text.replace(new RegExp(escapeRegExp(old_text)), new_text);
                break;
            default: // first
                res = source_text.replace(old_text, new_text);
                break;
        }

        this.StoreOutputValue(res, "text", cache);
        this.RunNextBlock("action", cache);
    }
}