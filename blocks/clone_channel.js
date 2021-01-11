module.exports = {
    name: "Clone Channel",

    description: "Clones a channel.",

    category: "Channel Stuff",

    inputs: [
        {
            "id": "action",
            "name": "Action",
            "description": "Acceptable Types: Action\n\nDescription: Executes this block.",
            "types": ["action"]
        },
        {
            "id": "channel",
            "name": "Channel",
            "description": "Acceptable Types: Object, Unspecified\n\nDescription: The text channel, voice channel or category to clone.",
            "types": ["object", "unspecified"],
            "required": true
        },
        {
            "id": "channel_name",
            "name": "Channel Name",
            "description": "Acceptable Types: Text, Unspecified\n\nDescription: The new name for this cloned channel. (OPTIONAL)",
            "types": ["text", "unspecified"]
        },
        {
            "id": "channel_position",
            "name": "Channel Position",
            "description": "Acceptable Types: Number, Unspecified\n\nDescription: The new position for this cloned channel. (OPTIONAL)",
            "types": ["number", "unspecified"]
        },
        {
            "id": "channel_topic",
            "name": "Channel Topic",
            "description": "Acceptable Types: Text, Unspecified\n\nDescription: The new topic for this cloned text channel. (OPTIONAL)",
            "types": ["text", "unspecified"]
        },
        {
            "id": "channel_nsfw",
            "name": "Channel NSFW",
            "description": "Acceptable Types: Boolean, Unspecified\n\nDescription: Whether this cloned text channel is NSFW. (OPTIONAL)",
            "types": ["boolean", "unspecified"]
        },
        {
            "id": "channel_slowmode",
            "name": "Channel Slowmode",
            "description": "Acceptable Types: Number, Unspecified\n\nDescription: The new slowmode for this cloned text channel in seconds. (OPTIONAL)",
            "types": ["number", "unspecified"]
        },
        {
            "id": "channel_category",
            "name": "Channel Category",
            "description": "Acceptable Types: Object, Unspecified\n\nDescription: The new category to add this cloned text or voice channel. (OPTIONAL)",
            "types": ["object", "unspecified"]
        },
        {
            "id": "channel_bitrate",
            "name": "Channel Bitrate",
            "description": "Acceptable Types: Number, Unspecified\n\nDescription: The new bitrate for this cloned voice channel. (OPTIONAL)",
            "types": ["number", "unspecified"]
        },
        {
            "id": "channel_user_limit",
            "name": "Channel User Limit",
            "description": "Acceptable Types: Number, Unspecified\n\nDescription: The new user limit for this cloned voice channel. (OPTIONAL)",
            "types": ["number", "unspecified"]
        },
        {
            "id": "reason",
            "name": "Reason",
            "description": "Acceptable Types: Text, Unspecified\n\nDescription: The reason for cloning this channel. This will appear in Audit Log of the server. (OPTIONAL)",
            "types": ["text", "unspecified"]
        }
    ],

    options: [
        {
            "id": "channel_type",
            "name": "Channel Type",
            "description": "Description: The type of channel for this cloned channel.",
            "type": "SELECT",
            "options": {
                "dont_change": "Do Not Change",
                "text": "Text Channel",
                "voice": "Voice Channel",
                "category": "Category"
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
            "id": "cloned_channel",
            "name": "Cloned Channel",
            "description": "Type: Object\n\nDescription: The cloned channel obtained.",
            "types": ["object"]
        }
    ],

    code(cache) {
        const channel = this.GetInputValue("channel", cache);
        const channel_name = this.GetInputValue("channel_name", cache);
        const channel_position = parseInt(this.GetInputValue("channel_position", cache));
        const channel_topic = this.GetInputValue("channel_topic", cache);
        const channel_nsfw = Boolean(this.GetInputValue("channel_nsfw", cache));
        const channel_slowmode = parseInt(this.GetInputValue("channel_slowmode", cache));
        const channel_category = this.GetInputValue("channel_category", cache);
        const channel_bitrate = parseInt(this.GetInputValue("channel_bitrate", cache));
        const channel_user_limit = parseInt(this.GetInputValue("channel_user_limit", cache));
        const reason = this.GetInputValue("reason", cache);
        const channel_type = this.GetOptionValue("channel_type", cache);

        channel.clone(channel_name, {
            name: channel_name,
            type: ["text", "voice", "category"].includes(channel_type) ? channel_type : null,
            position: channel_position,
            topic: channel_topic,
            nsfw: channel_nsfw,
            rateLimitPerUser: channel_slowmode,
            parent: channel_category,
            bitrate: channel_bitrate,
            userLimit: channel_user_limit,
            reason
        }).then(cloned_channel => {
            this.StoreOutputValue(cloned_channel, "cloned_channel", cache);
            this.RunNextBlock("action", cache);
        });
    }
}