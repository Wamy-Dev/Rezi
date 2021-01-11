module.exports = {
    name: "Delete File/Folder",

    description: "Deletes a file or folder. It is not possible to recover it later!",

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
            "description": "Acceptable Types: Text, Unspecified\n\nDescription: The path of the file or folder to delete (e.g. \"E:\\myFolder\\config.txt\" or \"F:\\My Stuff\\Music\").",
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
        const path = this.GetInputValue("path", cache) + "";

        const fs = require("fs");

        if(fs.existsSync(path)) {
            if(fs.statSync(path).isDirectory()) {
                fs.rmdirSync(path, {recursive: true});
            } else {
                fs.unlinkSync(path);
            }
        }

        this.RunNextBlock("action", cache);
    }
}