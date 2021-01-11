module.exports = {
    name: "Edit Text Channel",

    description: "Edits a text channel.",

    category: "Channel Stuff",

    inputs: [
        {
            "id": "action",
            "name": "Action",
            "description": "Acceptable Types: Action\n\nDescription: Executes this block.",
            "types": ["action"]
        },
        {
            "id": "text_channel",
            "name": "Text Channel",
            "description": "Acceptable Types: Object, Unspecified\n\nDescription: The text channel to edit.",
            "types": ["object", "unspecified"],
            "required": true
        },
        {
            "id": "channel_name",
            "name": "Channel Name",
            "description": "Acceptable Types: Text, Unspecified\n\nDescription: The new name for this text channel. (OPTIONAL)",
            "types": ["text", "unspecified"]
        },
        {
            "id": "channel_topic",
            "name": "Channel Topic",
            "description": "Acceptable Types: Text, Unspecified\n\nDescription: The new topic for this text channel. (OPTIONAL)",
            "types": ["text", "unspecified"]
        },
        {
            "id": "channel_position",
            "name": "Channel Position",
            "description": "Acceptable Types: Number, Unspecified\n\nDescription: The new position for this text channel. (OPTIONAL)",
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
            "description": "Acceptable Types: Number, Unspecified\n\nDescription: The new slowmode for this text channel in seconds. (OPTIONAL)",
            "types": ["number", "unspecified"]
        },
        {
            "id": "channel_category",
            "name": "Channel Category",
            "description": "Acceptable Types: Object, Text, Unspecified\n\nDescription: The new category to add this text channel. Supports channel ID. (OPTIONAL)",
            "types": ["object", "text", "unspecified"]
        },
        {
            "id": "channel_permission_synchronization",
            "name": "Channel Permission Synchronization",
            "description": "Acceptable Types: Boolean, Unspecified\n\nDescription: Whether or not to synchronize the permissions of this text channel with its category. (OPTIONAL)",
            "types": ["boolean", "unspecified"]
        },
        {
            "id": "reason",
            "name": "Reason",
            "description": "Acceptable Types: Text, Unspecified\n\nDescription: The reason for editing this text channel. This will appear in Audit Log of the server. (OPTIONAL)",
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
        }
    ],

    code(cache) {
        const text_channel = this.GetInputValue("text_channel", cache);
        const channel_name = this.GetInputValue("channel_name", cache);
        const channel_topic = this.GetInputValue("channel_topic", cache);
        const channel_position = parseInt(this.GetInputValue("channel_position", cache));
        const channel_nsfw = Boolean(this.GetInputValue("channel_nsfw", cache));
        const channel_slowmode = parseInt(this.GetInputValue("channel_slowmode", cache));
        const channel_category = this.GetInputValue("channel_category", cache);
        const channel_permission_synchronization = Boolean(this.GetInputValue("channel_permission_synchronization", cache));
        const reason = this.GetInputValue("reason", cache);

        const data = {
            name: channel_name,
            position: channel_position,
            topic: channel_topic,
            nsfw: channel_nsfw,
            parentID: channel_category.hasOwnProperty("id") ? channel.id : channel,
            lockPermissions: channel_permission_synchronization,
            rateLimitPerUser: channel_slowmode
        }

        Object.keys(data).forEach(key => {
            if([undefined, null, NaN].includes(data[key])) delete data[key];
        });

        text_channel.edit(data, reason).then(() => {
            this.RunNextBlock("action", cache);
        });
    }
}