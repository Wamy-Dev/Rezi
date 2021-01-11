module.exports = {
    name: "Merge Actions",

    description: "Merge the two \"action\"'s into a single one.",

    category: "Extras",

    inputs: [
        {
            "id": "action1",
            "name": "Action 1",
            "description": "Acceptable Types: Action\n\nDescription: Executes this block.",
            "types": ["action"]
        },
        {
            "id": "action2",
            "name": "Action 2",
            "description": "Acceptable Types: Action\n\nDescription: Executes this block.",
            "types": ["action"]
        }
    ],

    options: [],

    outputs: [
        {
            "id": "action",
            "name": "Action",
            "description": "Type: Action\n\nDescription: Executes the following blocks.",
            "types": ["action"]
        }
    ],

    code: function(cache) {
        this.RunNextBlock("action", cache);
    }
}