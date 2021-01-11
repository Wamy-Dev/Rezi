module.exports = {
    name: "Create Folder",

    description: "Creates a folder.",

    category: "File Management",

    inputs: [
        {
            "id": "action",
            "name": "Action",
            "description": "Acceptable Types: Action\n\nDescription: Executes this block.",
            "types": ["action"]
        },
        {
            "id": "folder_path",
            "name": "Folder Path",
            "description": "Acceptable Types: Text, Unspecified\n\nDescription: The path of the folder (e.g. F:\\My Stuff\\Music).",
            "types": ["text", "unspecified"],
            "required": true
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
        const folder_path = this.GetInputValue("folder_path", cache) + "";

        const fs = require("fs");

        fs.mkdirSync(folder_path, {recursive: true});

        this.RunNextBlock("action", cache);
    }
}