module.exports = {
    name: "Request API",

    description: "Makes an API request.",

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
            "name": "API URL",
            "description": "Acceptable Types: Text, Unspecified\n\nDescription: The URL of API.",
            "types": ["text", "unspecified"],
            "required": true
        },
        {
            "id": "headers",
            "name": "Headers",
            "description": "Acceptable Types: Object, Unspecified\n\nDescription: The headers to send to API. (OPTIONAL)",
            "types": ["object", "unspecified"]
        },
        {
            "id": "body",
            "name": "Body",
            "description": "Acceptable Types: Text, Object, Unspecified\n\nDescription: The body to send to API. (OPTIONAL)",
            "types": ["text", "object", "unspecified"]
        }
    ],

    options: [
        {
            "id": "method_type",
            "name": "Method Type",
            "description": "Description: The type of method for API request.",
            "type": "SELECT",
            "options": {
                "get": "Get",
                "post": "Post",
                "put": "Put",
                "delete": "Delete"
            }
        },
        {
            "id": "data_type",
            "name": "Data Type",
            "description": "Description: The type of data to obtain from API request.",
            "type": "SELECT",
            "options": {
                "text": "Text",
                "json": "Object (JSON)"
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
            "id": "data",
            "name": "API Data",
            "description": "Type: Object\n\nDescription: The API data obtained if possible.",
            "types": ["object"]
        }
    ],

    async code(cache) {
        const url = this.GetInputValue("url", cache) + "";
        const headers = this.GetInputValue("headers", cache);
        const body = this.GetInputValue("body", cache);
        const method = this.GetOptionValue("method_type", cache) + "";
        const data_type = this.GetOptionValue("data_type", cache) + "";

        const fetch = await this.require("node-fetch");
        try {
            const res = await fetch(url, {
                method,
                headers,
                body: typeof body == "object" ? JSON.stringify(body) : body + "",
                timeout: 7000
            });

            var data = data_type == "json" ? await res.json() : await res.text();
        } catch {}

        this.StoreOutputValue(data, "data", cache);
        this.RunNextBlock("action", cache);
    }
}