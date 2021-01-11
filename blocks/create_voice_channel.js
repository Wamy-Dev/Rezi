module.exports = {
    name: "Create Voice Channel",

    description: "Creates a new voice channel in the server.",

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
            "description": "Acceptable Types: Object, Unspecified\n\nDescription: The server to create this voice channel.",
            "types": ["object", "unspecified"],
            "required": true
        },
        {
            "id": "channel_name",
            "name": "Channel Name",
            "description": "Acceptable Types: Text, Unspecified\n\nDescription: The name for this voice channel.",
            "types": ["text", "unspecified"]
        },
        {
            "id": "channel_position",
            "name": "Channel Position",
            "description": "Acceptable Types: Number, Unspecified\n\nDescription: The position for this voice channel. (OPTIONAL)",
            "types": ["number", "unspecified"]
        },
        {
            "id": "channel_user_limit",
            "name": "Channel User Limit",
            "description": "Acceptable Types: Number, Unspecified\n\nDescription: The user limit for this voice channel. (OPTIONAL)",
            "types": ["number", "unspecified"]
        },
        {
            "id": "channel_bitrate",
            "name": "Channel Bitrate",
            "description": "Acceptable Types: Number, Unspecified\n\nDescription: The bitrate for this voice channel. (OPTIONAL)",
            "types": ["number", "unspecified"]
        },
        {
            "id": "channel_category",
            "name": "Channel Category",
            "description": "Acceptable Types: Object, Unspecified\n\nDescription: The category to add this voice channel. (OPTIONAL)",
            "types": ["object", "unspecified"]
        },
        {
            "id": "reason",
            "name": "Reason",
            "description": "Acceptable Types: Text, Unspecified\n\nDescription: The reason for creating this voice channel. This will appear in Audit Log of the server. (OPTIONAL)",
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
            "id": "voice_channel",
            "name": "Voice Channel",
            "description": "Type: Object\n\nDescription: This voice channel created.",
            "types": ["object"]
        }
    ],

    code(cache) {
        const server = this.GetInputValue("server", cache);
        const channel_name = this.GetInputValue("channel_name", cache);
        const channel_position = parseInt(this.GetInputValue("channel_position", cache));
        const channel_user_limit = parseInt(this.GetInputValue("channel_user_limit", cache));
        const channel_bitrate = parseInt(this.GetInputValue("channel_bitrate", cache));
        const channel_category = this.GetInputValue("channel_category", cache);
        const reason = this.GetInputValue("reason", cache);

        const data = {
            type: "voice",
            position: channel_position,
            bitrate: channel_bitrate,
            userLimit: channel_user_limit,
            parent: channel_category,
            reason
        }

        Object.keys(data).forEach(key => {
            if([undefined, null, NaN].includes(data[key])) delete data[key];
        });

        server.channels.create(channel_name, data).then(voice_channel => {
            this.StoreOutputValue(voice_channel, "voice_channel", cache);
            this.RunNextBlock("action", cache);
        });
    }
}