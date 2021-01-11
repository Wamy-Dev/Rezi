module.exports = {
    name: "Save Canvas As Image",

    description: "Saves the canvas as an image file.",

    category: "Canvas Stuff",

    inputs: [
        {
            "id": "action",
            "name": "Action",
            "description": "Acceptable Types: Action\n\nDescription: Executes this block.",
            "types": ["action"]
        },
        {
            "id": "canvas",
            "name": "Canvas",
            "description": "Acceptable Types: Object, Unspecified\n\nDescription: The canvas to save as image file.",
            "types": ["object", "unspecified"],
            "required": true
        },
        {
            "id": "file_folder",
            "name": "File Folder",
            "description": "Acceptable Types: Text, Unspecified\n\nDescription: The path of the folder for the image file (e.g. E:\\myFolder).",
            "types": ["text", "unspecified"],
            "required": true
        },
        {
            "id": "file_name",
            "name": "File Name",
            "description": "Acceptable Types: Text, Unspecified\n\nDescription: The name for the image file.",
            "types": ["text", "unspecified"],
            "required": true
        },
        {
            "id": "custom_file_extension",
            "name": "Custom Image Extension",
            "description": "Acceptable Types: Text, Unspecified\n\nDescription: The custom extension for the image file. Only use this input if you selected the option \"Custom Extension\" in \"File Extension Type\". (OPTIONAL)",
            "types": ["text", "unspecified"]
        }
    ],

    options: [
        {
            "id": "file_extension_type",
            "name": "File Extension Type",
            "description": "Description: The type of extension for the image file.",
            "type": "SELECT",
            "options": {
                "auto": "Auto Detect",
                "png": ".png",
                "jpg": ".jpg",
                "gif": ".gif",
                "custom": "Custom Extension"
            }
        }
    ],

    outputs: [
        {
            "id": "action",
            "name": "Action",
            "description": "Type: Action\n\nDescription: Executes the following blocks when this block finishes its task.",
            "types": ["action"]
        }
    ],

    async code(cache) {
        const canvas = this.GetInputValue("canvas", cache);
        const file_folder = this.GetInputValue("file_folder", cache) + "";
        const file_name = this.GetInputValue("file_name", cache) + "";
        const file_extension_type = this.GetOptionValue("file_extension_type", cache) + "";

        let extension = ".png";
        switch(file_extension_type) {
            case "auto":
                extension = canvas.animated ? ".gif" : ".png";
                break;
            case "jpg":
                extension = ".jpg";
                break;
            case "gif":
                extension = ".gif";
                break;
            case "custom":
                const custom = this.GetInputValue("custom_file_extension", cache) + "";
                extension = custom[0] == "." ? custom : "." + custom;
                break;
            /*case "png":
            default:
                break;*/
        }

        const path = require("path");
        await this.saveAsImage(canvas, path.join(file_folder, file_name + extension));

        this.RunNextBlock("action", cache);
    }
}