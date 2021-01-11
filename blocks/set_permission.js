module.exports = {
    name: "Set Permission",

    description: "Sets a permission for the role or channel.",

    category: "Server Stuff",

    inputs: [
        {
            "id": "action",
            "name": "Action",
            "description": "Acceptable Types: Action\n\nDescription: Executes this block.",
            "types": ["action"]
        },
        {
            "id": "target1",
            "name": "Target 1",
            "description": "Acceptable Types: Object, Unspecified\n\nDescription: The role or channel to set the permission. Set the corresponded option in \"Comparison Type\".",
            "types": ["object", "unspecified"],
            "required": true
        },
        {
            "id": "target2",
            "name": "Target 2",
            "description": "Acceptable Types: Object, Unspecified\n\nDescription: Follow the instructions in \"Comparison Type\" option if necessary. (OPTIONAL)",
            "types": ["object", "unspecified"]
        }
    ],

    options: [
        {
            "id": "target_type",
            "name": "Target Type",
            "description": "Description: The option related to the role/channel from the \"Target 1\" input.",
            "type": "SELECT",
            "options": {
                "role": "Role",
                "channel_everyone": "Channel (Related to @everyone role)",
                "channel_target": "Channel (Related to a role or member. Put the role or member on the \"Target 2\" input.)",
            }
        },
        {
            "id": "permission",
            "name": "Permission",
            "description": "Description: The permission to set for the role or channel.",
            "type": "SELECT",
            "options": {
                "administrator": "Administrator",
                "create_instant_invite": "Create Instant Invite",
                "kick_members": "Kick Members",
                "ban_members": "Ban Members",
                "manage_channels": "Manage Channels",
                "manage_guild": "Manage Server",
                "add_reactions": "Add Reactions",
                "view_audit_log": "View Audit Log",
                "priority_speaker": "Priority Speaker",
                "stream": "Video",
                "view_channel": "View Text/Voice Channel(s)",
                "send_messages": "Send Messages",
                "send_tts_messages": "Send TTS Messages",
                "manage_messages": "Manage Messages",
                "embed_links": "Embed Links",
                "attach_files": "Attach Files",
                "read_message_history": "Read Message History",
                "mention_everyone": "Mention Everyone",
                "use_external_emojis": "Use External Emojis",
                "view_guild_insights": "View Server Insights",
                "connect": "Connect (Connect to a voice channel)",
                "speak": "Speak (Speak in a voice channel)",
                "mute_members": "Mute Members (Mute members across all voice channels)",
                "deafen_members": "Deafen Members (Deafen members across all voice channels)",
                "move_members": "Move Members (Move members between voice channels)",
                "use_vad": "Use Voice Activity",
                "change_nickname": "Change Nickname",
                "manage_nicknames": "Manage Nicknames (Change other members' nicknames)",
                "manage_roles": "Manage Roles",
                "manage_webhooks": "Manage Webhooks",
                "manage_emojis": "Manage Emojis"
            }
        }
    ],

    outputs: [
        {
            "id": "action",
            "name": "Action",
            "description": "Type: Action\n\nDescription: Executes the following blocks when this block finishes its task.",
            "types": ["action"]
        }
    ],

    code(cache) {
        const target1 = this.GetInputValue("target1", cache);
        const target2 = this.GetInputValue("target2", cache);
        const target_type = this.GetOptionValue("target_type", cache) + "";
        const permission = (this.GetOptionValue("permission", cache) + "").toUpperCase();

        let result = false;
        switch(target_type) {
            case "role":
                result = target1.permissions.has(permission);
                break;
            case "channel_everyone":
                var a = target1.guild && target1.permissionsFor(target1.guild.id);
                result = a && a.has(permission);
                break;
            case "channel_target":
                var a = target1.permissionsFor(target2);
                result = a && a.has(permission);
                break;
        }

        this.RunNextBlock(result ? "action1" : "action2", cache);
    }
}