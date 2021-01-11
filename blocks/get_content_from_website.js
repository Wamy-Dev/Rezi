module.exports = {
    name: "Get Content From Website",

    description: "Gets the content from a website.",

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
            "description": "Acceptable Types: Text, Unspecified\n\nDescription: The URL of the website to get its content.",
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
        },
        {
            "id": "content",
            "name": "Content",
            "description": "Type: Text\n\nDescription: The content obtained.",
            "types": ["text"]
        }
    ],

    async code(cache) {
        const url = this.GetInputValue("url", cache) + "";

        const fetch = await this.require("node-fetch");

        this.StoreOutputValue(await fetch(url).then(res => res.text()), "content", cache);
        this.RunNextBlock("action", cache);
    }
}