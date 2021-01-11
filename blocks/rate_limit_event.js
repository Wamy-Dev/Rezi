module.exports = {
    name: "Rate Limit [Event]",

    description: "When your bot hits a rate limit while making a request, this event will trigger.",

    category: "Events",

    auto_execute: true,

    inputs: [],

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
        this.events.on("rateLimit", () => {
            this.RunNextBlock("action", cache);
        });
    }
}