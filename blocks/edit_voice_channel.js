module.exports = {
    name: "Edit Voice Channel",

    description: "Edits a voice channel.",

    category: "Channel Stuff",

    inputs: [
        {
            "id": "action",
            "name": "Action",
            "description": "Acceptable Types: Action\n\nDescription: Executes this block.",
            "types": ["action"]
        },
        {
            "id": "voice_channel",
            "name": "Voice Channel",
            "description": "Acceptable Types: Object, Unspecified\n\nDescription: The voice channel to edit.",
            "types": ["object", "unspecified"],
            "required": true
        },
        {
            "id": "channel_name",
            "name": "Channel Name",
            "description": "Acceptable Types: Text, Unspecified\n\nDescription: The new name for this voice channel. (OPTIONAL)",
            "types": ["text", "unspecified"]
        },
        {
            "id": "channel_position",
            "name": "Channel Position",
            "description": "Acceptable Types: Number, Unspecified\n\nDescription: The new position for this voice channel. (OPTIONAL)",
            "types": ["number", "unspecified"]
        },
        {
            "id": "channel_bitrate",
            "name": "Channel Bitrate",
            "description": "Acceptable Types: Number, Unspecified\n\nDescription: The new bitrate for this voice channel. (OPTIONAL)",
            "types": ["number", "unspecified"]
        },
        {
            "id": "channel_user_limit",
            "name": "Channel User Limit",
            "description": "Acceptable Types: Number, Unspecified\n\nDescription: The new user limit for this voice channel. (OPTIONAL)",
            "types": ["number", "unspecified"]
        },
        {
            "id": "channel_category",
            "name": "Channel Category",
            "description": "Acceptable Types: Object, Text, Unspecified\n\nDescription: The new category to add this voice channel. Supports channel ID. (OPTIONAL)",
            "types": ["object", "text", "unspecified"]
        },
        {
            "id": "channel_permission_synchronization",
            "name": "Channel Permission Synchronization",
            "description": "Acceptable Types: Boolean, Unspecified\n\nDescription: Whether or not to synchronize the permissions of this voice channel with its category. (OPTIONAL)",
            "types": ["boolean", "unspecified"]
        },
        {
            "id": "reason",
            "name": "Reason",
            "description": "Acceptable Types: Text, Unspecified\n\nDescription: The reason for editing this voice channel. This will appear in Audit Log of the server. (OPTIONAL)",
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
        const voice_channel = this.GetInputValue("voice_channel", cache);
        const channel_name = this.GetInputValue("channel_name", cache);
        const channel_position = parseInt(this.GetInputValue("channel_position", cache));
        const channel_bitrate = parseInt(this.GetInputValue("channel_bitrate", cache));
        const channel_user_limit = parseInt(this.GetInputValue("channel_user_limit", cache));
        const channel_category = this.GetInputValue("channel_category", cache);
        const channel_permission_synchronization = Boolean(this.GetInputValue("channel_permission_synchronization", cache));
        const reason = this.GetInputValue("reason", cache);

        const data = {
            name: channel_name,
            position: channel_position,
            bitrate: channel_bitrate,
            userLimit: channel_user_limit,
            parentID: channel_category.hasOwnProperty("id") ? channel.id : channel,
            lockPermissions: channel_permission_synchronization
        }

        Object.keys(data).forEach(key => {
            if([undefined, null, NaN].includes(data[key])) delete data[key];
        });

        voice_channel.edit(data, reason).then(() => {
            this.RunNextBlock("action", cache);
        });
    }
}