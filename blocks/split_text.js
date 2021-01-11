module.exports = {
    name: "Split Text",

    description: "Splits the text.",

    category: "Extras",

    inputs: [
        {
            "id": "action",
            "name": "Action",
            "description": "Acceptable Types: Action\n\nDescription: Executes this block.",
            "types": ["action"]
        },
        {
            "id": "text",
            "name": "Text",
            "description": "Acceptable Types: Text, Unspecified\n\nDescription: The text to split.",
            "types": ["text", "unspecified"],
            "required": true
        },
        {
            "id": "separator",
            "name": "Separator",
            "description": "Acceptable Types: Text, Unspecified\n\nDescription: The separator to use for splitting the text. Supports RegExp. Default: \"/\\s+/\" (space). (OPTIONAL)",
            "types": ["text", "unspecified"]
        },
        {
            "id": "limit",
            "name": "Limit",
            "description": "Acceptable Types: Number, Unspecified\n\nDescription: The limit on the number of splits to be found. The items after this split limit will not be included in the list. (OPTIONAL)",
            "types": ["number", "unspecified"]
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
            "id": "list",
            "name": "List",
            "description": "Type: List\n\nDescription: The list containing the texts resulting from the split.",
            "types": ["list"]
        }
    ],

    code(cache) {
        const text = this.GetInputValue("text", cache) + "";
        const separator = this.GetInputValue("separator", cache, false, "/\\s+/");
        const limit = this.GetInputValue("limit", cache, true);

        this.StoreOutputValue(text.split(this.ConvertRegex(separator), limit ? parseInt(limit.value) : undefined), "list", cache);
        this.RunNextBlock("action", cache);
    }
}