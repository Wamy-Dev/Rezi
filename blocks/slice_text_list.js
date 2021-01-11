module.exports = {
    name: "Slice Text/List",

    description: "Slices the text or list.",

    category: "Extras",

    inputs: [
        {
            "id": "action",
            "name": "Action",
            "description": "Acceptable Types: Action\n\nDescription: Executes this block.",
            "types": ["action"]
        },
        {
            "id": "text_list",
            "name": "Text/List",
            "description": "Acceptable Types: Text, List, Unspecified\n\nDescription: The text or list to slice.",
            "types": ["text", "list", "unspecified"],
            "required": true
        },
        {
            "id": "start",
            "name": "Start",
            "description": "Acceptable Types: Number, Unspecified\n\nDescription: The number that specifies where to start the selection. Use negative numbers to select from the end of the text or list. Default: \"0\". (OPTIONAL)",
            "types": ["number", "unspecified"]
        },
        {
            "id": "end",
            "name": "End",
            "description": "Acceptable Types: Number, Unspecified\n\nDescription: The number that specifies where to end the selection. Use negative numbers to select from the end of the text or list. Default: Selects through the end of the text/list. (OPTIONAL)",
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
            "id": "text_list",
            "name": "Text/List",
            "description": "Types: Text, List\n\nDescription: The text or list resulting from the selection.",
            "types": ["text", "list"]
        }
    ],

    code(cache) {
        const text_list = this.GetInputValue("text_list", cache);
        const start = parseInt(this.GetInputValue("start", cache));
        const end = parseInt(this.GetInputValue("end", cache));

        this.StoreOutputValue(text_list.slice(start, end), "text_list", cache);
        this.RunNextBlock("action", cache);
    }
}