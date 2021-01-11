module.exports = {
    name: "Get File/Folder Info",

    description: "Gets the file or folder information.",

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
            "description": "Acceptable Types: Text, Unspecified\n\nDescription: The path of the file or folder (e.g. \"E:\\myFolder\\notes.txt\" or \"F:\\Bot Folder\").",
            "types": ["text", "unspecified"],
            "required": true
        }
    ],

    options: [
        {
            "id": "file_folder_info",
            "name": "File/Folder Info",
            "description": "Description: The file or folder information to get.",
            "type": "SELECT",
            "options": {
                1: "File/Folder Base Name [Text]",
                2: "File/Folder Size (Bytes) [Number]",
                3: "File/Folder Size [Text]",
                4: "File/Folder Folder Path [Text]",
                5: "File/Folder Root [Text]",
                6: "File Name [Text]",
                7: "File Extension [Text]",
                8: "Is A Folder? [Boolean]",
                9: "Folder File/Folder Names [List <Text>]",
                10: "Folder File/Folder Paths [List <Text>]",
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
            "id": "result",
            "name": "Result",
            "description": "Type: Unspecified\n\nDescription: The information obtained from the file or folder.",
            "types": ["unspecified"]
        }
    ],

    code(cache) {
        const _path = this.GetInputValue("path", cache);
        const file_folder_info = parseInt(this.GetOptionValue("file_folder_info", cache));

        const fs = require("fs");
        const path = require("path");

        if(!fs.existsSync(_path)) throw "Invalid file/folder path.";

        const getFolderSize = (_path, sizes = 0) => {
            for (const fileName of fs.readdirSync(_path)) {
                const __path = path.join(_path, fileName);
                const file = fs.statSync(__path);
                if(file.isDirectory()) {
                    sizes += getFolderSize(__path);
                } else sizes += file.size;
            }
        
            return sizes;
        }

        let result;
        switch(file_folder_info) {
            case 1:
                result = path.basename(_path);
                break;
            case 2:
                var file = fs.statSync(_path);
                result = file.isDirectory() ? getFolderSize(_path) : file.size;
                break;
            case 3:
                function formatBytes(bytes, decimals = 2) {
                    if (bytes === 0) return '0 Bytes';
                
                    const k = 1024;
                    const dm = decimals < 0 ? 0 : decimals;
                    const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB'];
                
                    const i = Math.floor(Math.log(bytes) / Math.log(k));
                
                    return parseFloat((bytes / Math.pow(k, i)).toFixed(dm)) + ' ' + sizes[i];
                }

                var file = fs.statSync(_path);
                result = formatBytes(file.isDirectory() ? getFolderSize(_path) : file.size);
                break;
            case 4:
                result = path.dirname(_path);
                break;
            case 5:
                result = path.parse(_path).root;
                break;
            case 6:
                result = path.parse(_path).name;
                break;
            case 7:
                let ext = "" + path.extname(_path);
                if(ext[0] == ".") ext = ext.substring(1);
                result = ext;
                break;
            case 8:
                result = fs.statSync(_path).isDirectory();
                break;
            case 9:
                result = fs.readdirSync(_path);
                break;
            case 10:
                result = fs.readdirSync(_path).map(name => path.join(_path, name));
                break;
        }

        this.StoreOutputValue(result, "result", cache);
        this.RunNextBlock("action", cache);
    }
}