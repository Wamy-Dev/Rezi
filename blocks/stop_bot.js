module.exports = {
    name: "Stop Bot",

    description: "Stops your bot.",

    category: "Bot Stuff",

    inputs: [
        {
            "id": "action",
            "name": "Action",
            "description": "Acceptable Types: Action\n\nDescription: Executes this block.",
            "types": ["action"]
        }
    ],

    options: [],

    outputs: [],

    code: function() {
        process.exit();
    }
}