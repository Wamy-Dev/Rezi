module.exports = {
    name: "Check If Path Exists",

    description: "Checks if the file/folder path exists.",

    category: "File Management",

    inputs: [
        {
            "id": "action",
            "name": "Action",
            "description": "Acceptable Types: Action\n\nDescription: Executes this block.",
            "types": ["action"]
        },
        {
            "id": "path",
            "name": "Path",
            "description": "Acceptable Types: Text, Unspecified\n\nDescription: The path of the file or folder to check (e.g. \"E:\\myFolder\\data.json\" or \"F:\\Bot Folder\").",
            "types": ["text", "unspecified"],
            "required": true
        }
    ],

    options: [],

    outputs: [
        {
            "id": "action1",
            "name": "Action (If True)",
            "description": "Type: Action\n\nDescription: Executes the following blocks if the file/folder path exists.",
            "types": ["action"]
        },
        {
            "id": "action2",
            "name": "Action (If False)",
            "description": "Type: Action\n\nDescription: Executes the following blocks if the file/folder path does not exists.",
            "types": ["action"]
        }
    ],

    code(cache) {
        const path = this.GetInputValue("path", cache) + "";

        const fs = require("fs");

        this.RunNextBlock(fs.existsSync(path) ? "action1" : "action2", cache);
    }
}