module.exports = {
    name: "Loop Time",

    description: "When the interval of milliseconds you set ends, it will loop again until it reaches the limit, if any.",

    category: "Loop Stuff",

    inputs: [
        {
            "id": "action",
            "name": "Action",
            "description": "Acceptable Types: Action\n\nDescription: Executes this block.",
            "types": ["action"]
        },
        {
            "id": "milliseconds",
            "name": "Milliseconds",
            "description": "Acceptable Types: Number, Unspecified\n\nDescription: The interval of milliseconds to loop.",
            "types": ["number", "unspecified"],
            "required": true
        },
        {
            "id": "limit",
            "name": "Number of Times",
            "description": "Acceptable Types: Number, Unspecified\n\nDescription: The number of times to loop. Default: Infinite. (OPTIONAL)",
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
        }
    ],

    code(cache) {
        const milliseconds = parseInt(this.GetInputValue("milliseconds", cache));
        const limit = parseInt(this.GetInputValue("limit", cache));

        let counter = 0;

        const looper = setInterval(() => {
            if(limit) {
                counter++

                if(counter >= limit) clearInterval(looper);
            }

            this.RunNextBlock("action", cache);
        }, milliseconds);
    }
}