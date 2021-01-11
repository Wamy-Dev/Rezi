module.exports = {
    name: "Edit Permissions",

    description: "Edits the set of permissions.",

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
            "description": "Acceptable Types: Object, Unspecified\n\nDescription: The set of permissions to edit.",
            "types": ["object", "unspecified"]
        }
    ],

    options: [
        {
            "id": "administrator",
            "name": "Administrator",
            "description": "Members with this permission have every permission and also bypass channel specific permissions. This is a dangerous permission to grant.",
            "type": "SELECT",
            "options": {
                "none": "Do Not Change",
                "allow": "Allow",
                "inherit": "Inherit/Neutral",
                "deny": "Deny"
            }
        },
        {
            "id": "view_audit_log",
            "name": "View Audit Log",
            "description": "Members with this permission have access to view the server's audit logs.",
            "type": "SELECT",
            "options": {
                "none": "Do Not Change",
                "allow": "Allow",
                "inherit": "Inherit/Neutral",
                "deny": "Deny"
            }
        },
        {
            "id": "view_guild_insights",
            "name": "View Server Insights",
            "description": "Members with this permission can view the server's insights.",
            "type": "SELECT",
            "options": {
                "none": "Do Not Change",
                "allow": "Allow",
                "inherit": "Inherit/Neutral",
                "deny": "Deny"
            }
        },
        {
            "id": "manage_guild",
            "name": "Manage Server",
            "description": "Members with this permission can change the server's name and region and add bots, for example.",
            "type": "SELECT",
            "options": {
                "none": "Do Not Change",
                "allow": "Allow",
                "inherit": "Inherit/Neutral",
                "deny": "Deny"
            }
        },
        {
            "id": "manage_roles",
            "name": "Manage Roles",
            "description": "Members with this permission can create, edit and delete roles lower than their highest role.",
            "type": "SELECT",
            "options": {
                "none": "Do Not Change",
                "allow": "Allow",
                "inherit": "Inherit/Neutral",
                "deny": "Deny"
            }
        },
        {
            "id": "manage_channels",
            "name": "Manage Channels",
            "description": "Members with this permission can create new channels and edit and delete existing ones.",
            "type": "SELECT",
            "options": {
                "none": "Do Not Change",
                "allow": "Allow",
                "inherit": "Inherit/Neutral",
                "deny": "Deny"
            }
        },
        {
            "id": "kick_members",
            "name": "Kick Members",
            "description": "Members with this permission can kick members with lower roles.",
            "type": "SELECT",
            "options": {
                "none": "Do Not Change",
                "allow": "Allow",
                "inherit": "Inherit/Neutral",
                "deny": "Deny"
            }
        },
        {
            "id": "ban_members",
            "name": "Ban Members",
            "description": "Members with this permission can ban members with lower roles.",
            "type": "SELECT",
            "options": {
                "none": "Do Not Change",
                "allow": "Allow",
                "inherit": "Inherit/Neutral",
                "deny": "Deny"
            }
        },
        {
            "id": "create_instant_invite",
            "name": "Create Invite",
            "description": "Members with this permission can create new invites for the server.",
            "type": "SELECT",
            "options": {
                "none": "Do Not Change",
                "allow": "Allow",
                "inherit": "Inherit/Neutral",
                "deny": "Deny"
            }
        },
        {
            "id": "change_nickname",
            "name": "Change Nickname",
            "description": "Members with this permission can change their own nickname.",
            "type": "SELECT",
            "options": {
                "none": "Do Not Change",
                "allow": "Allow",
                "inherit": "Inherit/Neutral",
                "deny": "Deny"
            }
        },
        {
            "id": "manage_nicknames",
            "name": "Manage Nicknames",
            "description": "Members with this permission can change nicknames of other members.",
            "type": "SELECT",
            "options": {
                "none": "Do Not Change",
                "allow": "Allow",
                "inherit": "Inherit/Neutral",
                "deny": "Deny"
            }
        },
        {
            "id": "manage_emojis",
            "name": "Manage Emojis",
            "description": "Members with this permission can create new emojis and edit and delete existing ones.",
            "type": "SELECT",
            "options": {
                "none": "Do Not Change",
                "allow": "Allow",
                "inherit": "Inherit/Neutral",
                "deny": "Deny"
            }
        },
        {
            "id": "manage_webhooks",
            "name": "Manage Webhooks",
            "description": "Members with this permission can create, edit and delete webhooks.",
            "type": "SELECT",
            "options": {
                "none": "Do Not Change",
                "allow": "Allow",
                "inherit": "Inherit/Neutral",
                "deny": "Deny"
            }
        },
        {
            "id": "view_channel",
            "name": "View Channel",
            "description": "Members with this permission can view/read the channel(s).",
            "type": "SELECT",
            "options": {
                "none": "Do Not Change",
                "allow": "Allow",
                "inherit": "Inherit/Neutral",
                "deny": "Deny"
            }
        },
        {
            "id": "send_messages",
            "name": "Send Messages",
            "description": "Members with this permission can send messages to the channel(s).",
            "type": "SELECT",
            "options": {
                "none": "Do Not Change",
                "allow": "Allow",
                "inherit": "Inherit/Neutral",
                "deny": "Deny"
            }
        },
        {
            "id": "send_tts_messages",
            "name": "Send TTS Messages",
            "description": "Members with this permission can send Text-To-Speech messages by starting a message with \"/tts\". These messages can be heard by everyone focused on the channel.",
            "type": "SELECT",
            "options": {
                "none": "Do Not Change",
                "allow": "Allow",
                "inherit": "Inherit/Neutral",
                "deny": "Deny"
            }
        },
        {
            "id": "manage_messages",
            "name": "Manage Messages",
            "description": "Members with this permission can delete messages by other members and pin any message.",
            "type": "SELECT",
            "options": {
                "none": "Do Not Change",
                "allow": "Allow",
                "inherit": "Inherit/Neutral",
                "deny": "Deny"
            }
        },
        {
            "id": "embed_links",
            "name": "Embed Links",
            "description": "Members with this permission can have their messages with embed support.",
            "type": "SELECT",
            "options": {
                "none": "Do Not Change",
                "allow": "Allow",
                "inherit": "Inherit/Neutral",
                "deny": "Deny"
            }
        },
        {
            "id": "attach_files",
            "name": "Attach Files",
            "description": "Members with this permission can send files.",
            "type": "SELECT",
            "options": {
                "none": "Do Not Change",
                "allow": "Allow",
                "inherit": "Inherit/Neutral",
                "deny": "Deny"
            }
        },
        {
            "id": "read_message_history",
            "name": "Read Message History",
            "description": "Members with this permission can read the old messages of the channel.",
            "type": "SELECT",
            "options": {
                "none": "Do Not Change",
                "allow": "Allow",
                "inherit": "Inherit/Neutral",
                "deny": "Deny"
            }
        },
        {
            "id": "mention_everyone",
            "name": "Mention @everyone",
            "description": "Members with this permission can use @everyone or @here to ping all members. They can also @mention all roles, even if the role's \"Allow anyone to mention this role\" permission is disabled.",
            "type": "SELECT",
            "options": {
                "none": "Do Not Change",
                "allow": "Allow",
                "inherit": "Inherit/Neutral",
                "deny": "Deny"
            }
        },
        {
            "id": "use_external_emojis",
            "name": "Use External Emojis",
            "description": "Members with this permission can use emojis from other servers in this server.",
            "type": "SELECT",
            "options": {
                "none": "Do Not Change",
                "allow": "Allow",
                "inherit": "Inherit/Neutral",
                "deny": "Deny"
            }
        },
        {
            "id": "add_reactions",
            "name": "Add Reactions",
            "description": "Members with this permission can add new reactions to a message. Members can still react using reactions already added to messages without this permission.",
            "type": "SELECT",
            "options": {
                "none": "Do Not Change",
                "allow": "Allow",
                "inherit": "Inherit/Neutral",
                "deny": "Deny"
            }
        },
        {
            "id": "connect",
            "name": "Connect",
            "description": "Members with this permission can connect/join the voice channel(s).",
            "type": "SELECT",
            "options": {
                "none": "Do Not Change",
                "allow": "Allow",
                "inherit": "Inherit/Neutral",
                "deny": "Deny"
            }
        },
        {
            "id": "speak",
            "name": "Speak",
            "description": "Members with this permission can speak in the voice channel(s).",
            "type": "SELECT",
            "options": {
                "none": "Do Not Change",
                "allow": "Allow",
                "inherit": "Inherit/Neutral",
                "deny": "Deny"
            }
        },
        {
            "id": "stream",
            "name": "Video",
            "description": "Members with this permission can stream in the voice channel(s).",
            "type": "SELECT",
            "options": {
                "none": "Do Not Change",
                "allow": "Allow",
                "inherit": "Inherit/Neutral",
                "deny": "Deny"
            }
        },
        {
            "id": "mute_members",
            "name": "Mute Members",
            "description": "Members with this permission can mute members from speaking in the voice channels.",
            "type": "SELECT",
            "options": {
                "none": "Do Not Change",
                "allow": "Allow",
                "inherit": "Inherit/Neutral",
                "deny": "Deny"
            }
        },
        {
            "id": "deafen_members",
            "name": "Deafen Members",
            "description": "Members with this permission can deafen members from hearing anyone in the voice channels.",
            "type": "SELECT",
            "options": {
                "none": "Do Not Change",
                "allow": "Allow",
                "inherit": "Inherit/Neutral",
                "deny": "Deny"
            }
        },
        {
            "id": "move_members",
            "name": "Move Members",
            "description": "Members with this permission can drag other members out of the voice channel(s).",
            "type": "SELECT",
            "options": {
                "none": "Do Not Change",
                "allow": "Allow",
                "inherit": "Inherit/Neutral",
                "deny": "Deny"
            }
        },
        {
            "id": "use_vad",
            "name": "Use Voice Activity",
            "description": "Members must use Push-to-talk in the voice channel(s) if this permission is disallowed.",
            "type": "SELECT",
            "options": {
                "none": "Do Not Change",
                "allow": "Allow",
                "inherit": "Inherit/Neutral",
                "deny": "Deny"
            }
        },
        {
            "id": "priority_speaker",
            "name": "Priority Speaker",
            "description": "Members with this permission have the ability to be more easily heard when speaking. When activated, the volume of others without this permission will be automatically lowered.",
            "type": "SELECT",
            "options": {
                "none": "Do Not Change",
                "allow": "Allow",
                "inherit": "Inherit/Neutral",
                "deny": "Deny"
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
            "id": "permissions",
            "name": "Permissions",
            "description": "Type: Object\n\nDescription: The set of permissions edited.",
            "types": ["object"]
        }
    ],

    code: function(cache) {
        let permissions = this.GetInputValue("permissions", cache);

        const {Permissions} = require("discord.js");

        if(permissions instanceof Permissions) {
            permissions = {
                allow: permissions,
                inherit: new Permissions(),
                deny: new Permissions()
            }
        }


        const flags = ["ADMINISTRATOR", "CREATE_INSTANT_INVITE", "KICK_MEMBERS", "BAN_MEMBERS", "MANAGE_CHANNELS", "MANAGE_GUILD", "ADD_REACTIONS", "VIEW_AUDIT_LOG", "PRIORITY_SPEAKER", "STREAM", "VIEW_CHANNEL", "SEND_MESSAGES", "SEND_TTS_MESSAGES", "MANAGE_MESSAGES", "EMBED_LINKS", "ATTACH_FILES", "READ_MESSAGE_HISTORY", "MENTION_EVERYONE", "USE_EXTERNAL_EMOJIS", "VIEW_GUILD_INSIGHTS", "CONNECT", "SPEAK", "MUTE_MEMBERS", "DEAFEN_MEMBERS", "MOVE_MEMBERS", "USE_VAD", "CHANGE_NICKNAME", "MANAGE_NICKNAMES", "MANAGE_ROLES", "MANAGE_WEBHOOKS", "MANAGE_EMOJIS"];

        flags.forEach(flag => {
            const perm = this.GetOptionValue(flag.toLowerCase(), cache);

            if(perm && ["allow", "inherit", "deny"].includes(perm)) {
                permissions[perm].add(flag);
            }
        });

        this.StoreOutputValue(permissions, "permissions", cache);
        this.RunNextBlock("action", cache);
    }
}