module.exports = {
    name: "Check Permissions",

    description: "Checks if the set of permissions has the permission.",

    category: "Permissions Stuff",

    inputs: [
        {
            "id": "action",
            "name": "Action",
            "description": "Acceptable Types: Action\n\nDescription: Executes this block.",
            "types": ["action"]
        },
        {
            "id": "permissions",
            "name": "Permissions",
            "description": "Acceptable Types: Object, Unspecified\n\nDescription: The set of permissions to check.",
            "types": ["object", "unspecified"]
        }
    ],

    options: [
        {
            "id": "permission",
            "name": "Permission",
            "description": "Description: The permission to check from the set of permissions.",
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
            "id": "action1",
            "name": "Action (If True)",
            "description": "Type: Action\n\nDescription: Executes the following blocks if the set of permissions has the permission.",
            "types": ["action"]
        },
        {
            "id": "action2",
            "name": "Action (If False)",
            "description": "Type: Action\n\nDescription: Executes the following blocks if the set of permissions does not have the permission.",
            "types": ["action"]
        }
    ],

    code(cache) {
        let permissions = this.GetInputValue("permissions", cache);
        const permission = (this.GetOptionValue("permission", cache) + "").toUpperCase();

        const {Permissions} = require("discord.js");

        let result = false;
        if(permissions instanceof Permissions) {
            result = permissions.has(permission);
        } else {
            result = permissions.allow && permissions.allow.has(permission);
        }

        this.RunNextBlock(result ? "action1" : "action2", cache);
    }
}