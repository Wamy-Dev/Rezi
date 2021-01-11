module.exports = {
    name: "Download Content",

    description: "Downloads a file, video, audio, HTML, image, etc...",

    category: "Internet Stuff",

    inputs: [
        {
            "id": "action",
            "name": "Action",
            "description": "Acceptable Types: Action\n\nDescription: Executes this block.",
            "types": ["action"]
        },
        {
            "id": "url",
            "name": "URL",
            "description": "Acceptable Types: Text, Unspecified\n\nDescription: The URL of the website to download the file.",
            "types": ["text", "unspecified"],
            "required": true
        },
        {
            "id": "folder_path",
            "name": "Folder Path",
            "description": "Acceptable Types: Text, Unspecified\n\nDescription: The path (e.g. \"E:\\myFolder\\Music\") of the new or existing file. Default: The bot folder path. (OPTIONAL)",
            "types": ["text", "unspecified"]
        },
        {
            "id": "file_name",
            "name": "File Name",
            "description": "Acceptable Types: Text, Unspecified\n\nDescription: The name of the new or existing file. Default: \"file_dbb_[CURRENT DATE]\". (OPTIONAL)",
            "types": ["text", "unspecified"]
        },
        {
            "id": "file_extension",
            "name": "File Extension",
            "description": "Acceptable Types: Text, Unspecified\n\nDescription: The extension (e.g. png, txt, jpg, html, mp3, mp4, etc...) of the new or existing file. Default: \"txt\". (OPTIONAL)",
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
        const url = this.GetInputValue("url", cache) + "";
        const folder_path = this.GetInputValue("folder_path", cache) + "" || __dirname;
        let file_name = preventName(this.GetInputValue("file_name", cache) + "");
        let file_extension = preventName(this.GetInputValue("file_extension", cache) + "");

        function preventName(input) {
            const illegalRe = /[\/\?<>\\:\*\|":]/g;
            const controlRe = /[\x00-\x1f\x80-\x9f]/g;
            const reservedRe = /^\.+$/;
            const windowsReservedRe = /^(con|prn|aux|nul|com[0-9]|lpt[0-9])(\..*)?$/i;
            const windowsTrailingRe = /[\. ]+$/;
            return input
                .replace(illegalRe, "")
                .replace(controlRe, "")
                .replace(reservedRe, "")
                .replace(windowsReservedRe, "")
                .replace(windowsTrailingRe, "");
        }

        const fs = require("fs");
        const path = require("path");
        const fetch = this.require("node-fetch");

        const parse = path.parse(url);

        if(!file_name) file_name = preventName(parse.name || "file_dbb_" + Date.now());

        if(!file_extension) file_extension = preventName(parse.ext || "txt");
        if(file_extension[0] == ".") file_extension = file_extension.substring(1);

        const _path = path.join(folder_path, file_name + "." + file_extension);

        fetch(url).then(res => res.body.pipe(fs.createWriteStream(_path)));

        this.RunNextBlock("action", cache);
    }
}