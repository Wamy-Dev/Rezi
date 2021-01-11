module.exports = {
    name: "Create Text Channel",

    description: "Creates a new text channel for the server.",

    category: "Channel Stuff",

    inputs: [
        {
            "id": "action",
            "name": "Action",
            "description": "Acceptable Types: Action\n\nDescription: Executes this block.",
            "types": ["action"]
        },
        {
            "id": "server",
            "name": "Server",
            "description": "Acceptable Types: Object, Unspecified\n\nDescription: The server to create this text channel.",
            "types": ["object", "unspecified"],
            "required": true
        },
        {
            "id": "channel_name",
            "name": "Channel Name",
            "description": "Acceptable Types: Text, Unspecified\n\nDescription: The name for this text channel.",
            "types": ["text", "unspecified"],
            "required": true
        },
        {
            "id": "channel_topic",
            "name": "Channel Topic",
            "description": "Acceptable Types: Text, Unspecified\n\nDescription: The topic for this text channel. (OPTIONAL)",
            "types": ["text", "unspecified"]
        },
        {
            "id": "channel_position",
            "name": "Channel Position",
            "description": "Acceptable Types: Number, Unspecified\n\nDescription: The position for this text channel. (OPTIONAL)",
            "types": ["number", "unspecified"]
        },
        {
            "id": "channel_nsfw",
            "name": "Channel NSFW",
            "description": "Acceptable Types: Boolean, Unspecified\n\nDescription: Whether this text channel is NSFW. (OPTIONAL)",
            "types": ["boolean", "unspecified"]
        },
        {
            "id": "channel_slowmode",
            "name": "Channel Slowmode",
            "description": "Acceptable Types: Number, Unspecified\n\nDescription: The slowmode for this text channel in seconds. (OPTIONAL)",
            "types": ["number", "unspecified"]
        },
        {
            "id": "channel_category",
            "name": "Channel Category",
            "description": "Acceptable Types: Object, Unspecified\n\nDescription: The category to add this text channel. (OPTIONAL)",
            "types": ["object", "unspecified"]
        },
        {
            "id": "reason",
            "name": "Reason",
            "description": "Acceptable Types: Text, Unspecified\n\nDescription: The reason for creating this text channel. This will appear in Audit Log of the server. (OPTIONAL)",
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
        },
        {
            "id": "text_channel",
            "name": "Text Channel",
            "description": "Type: Object\n\nDescription: This text channel created.",
            "types": ["object"]
        }
    ],

    code(cache) {
        const server = this.GetInputValue("server", cache);
        const channel_name = this.GetInputValue("channel_name", cache);
        const channel_topic = this.GetInputValue("channel_topic", cache);
        const channel_position = parseInt(this.GetInputValue("channel_position", cache));
        const channel_nsfw = Boolean(this.GetInputValue("channel_nsfw", cache));
        const channel_slowmode = parseInt(this.GetInputValue("channel_slowmode", cache));
        const channel_category = this.GetInputValue("channel_category", cache);
        const reason = this.GetInputValue("reason", cache);

        const data = {
            type: "text",
            position: channel_position,
            topic: channel_topic,
            nsfw: channel_nsfw,
            parent: channel_category,
            rateLimitPerUser: channel_slowmode,
            reason
        }

        Object.keys(data).forEach(key => {
            if([undefined, null, NaN].includes(data[key])) delete data[key];
        });

        server.channels.create(channel_name, data).then(text_channel => {
            this.StoreOutputValue(text_channel, "text_channel", cache);
            this.RunNextBlock("action", cache);
        });
    }
}