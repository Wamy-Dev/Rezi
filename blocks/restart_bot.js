module.exports = {
    name: "Restart Bot",

    description: "Restarts your bot.",

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
        this.getDBB().Core.restart();
    }
}