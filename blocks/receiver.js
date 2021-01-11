module.exports = {
    name: "Receiver",

    description: "The receiver for any \"Emitter\" block with the same ID.",

    category: "Trigger Stuff",

    inputs: [
        {
            "id": "id",
            "name": "Receiver ID",
            "description": "Acceptable Types: Text, Number, Unspecified\n\nDescription: The ID of this Receiver. This must match with the ID of the desired \"Emitter\" block.",
            "types": ["text", "number", "unspecified"],
            "required": true
        }
    ],

    options: [],

    outputs: [
        {
            "id": "action",
            "name": "Action",
            "description": "Type: Action\n\nDescription: Executes the following blocks when this block is trigger by any \"Emitter\" block with the same ID.",
            "types": ["action"]
        },
        {
            "id": "value1",
            "name": "Value 1",
            "description": "Type: Unspecified\n\nDescription: The value 1 received from the emitter if possible.",
            "types": ["unspecified"]
        },
        {
            "id": "value2",
            "name": "Value 2",
            "description": "Type: Unspecified\n\nDescription: The value 2 received from the emitter if possible.",
            "types": ["unspecified"]
        },
        {
            "id": "value3",
            "name": "Value 3",
            "description": "Type: Unspecified\n\nDescription: The value 3 received from the emitter if possible.",
            "types": ["unspecified"]
        }
    ],

    code(cache) {
        const values = cache._temp.__VALUES;

        this.StoreOutputValue(values[0], "value1", cache);
        this.StoreOutputValue(values[1], "value2", cache);
        this.StoreOutputValue(values[2], "value3", cache);
        this.RunNextBlock("action", cache);
    }
}