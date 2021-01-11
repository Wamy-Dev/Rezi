module.exports = {
    name: "Command [Event]",

    description: "When an user types this bot command, this event will trigger.",

    category: "Events",

    auto_execute: true,

    inputs: [
        {
            "id": "command_name",
            "name": "Command Name",
            "description": "Acceptable Types: Text, Unspecified\n\nDescription: The name the user needs to type after typing the bot prefix to trigger this bot command (i.e. <Prefix><Command Name>, in other words, \"!myCommand\").",
            "types": ["text", "unspecified"],
            "required": true
        },
        {
            "id": "custom_prefix",
            "name": "Custom Prefix",
            "description": "Acceptable Types: Text, Unspecified\n\nDescription: The custom prefix for this command if you do not want to use the main prefix or the server prefix. (OPTIONAL)",
            "types": ["text", "unspecified"]
        },
        {
            "id": "command_slowmode",
            "name": "Command Slowmode",
            "description": "Acceptable Types: Number, Date, Unspecified\n\nDescription: The interval of milliseconds to block the user for using this command again. Supports Date. (OPTIONAL)",
            "types": ["number", "date", "unspecified"]
        }
    ],

    options: [
        {
            "id": "command_restriction",
            "name": "Command Restriction",
            "description": "Description: The user will not be able to use this command if a command restriction applies.",
            "type": "SELECT",
            "options": {
                "none": "None",
                "server_only": "Server Only",
                "server_owner_only": "Server Owner Only",
                "bot_owner_only": "Bot Owner Only",
                "dms_only": "DMs Only"
            }
        },
        {
            "id": "required_member_permission",
            "name": "Required Member Permission",
            "description": "Description: The required member permission to use this command.",
            "type": "SELECT",
            "options": {
                "none": "None",
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
        },
        {
            "id": "case_sensitive",
            "name": "Case Sensitive",
            "description": "Description: If \"No\", for example, \"play\", \"PLAY\" and \"PlAy\" are the same command name. This is useful if you want commands with the same name but with different case variants.",
            "type": "SELECT",
            "options": {
                "no": "No",
                "yes": "Yes"
            }
        },
        {
            "id": "command_slowmode_restriction",
            "name": "Command Slowmode Restriction",
            "description": "Description: The restriction that will affect the user slowmode at each location. Only use this option if you put a value in the \"Command Slowmode\" input.",
            "type": "SELECT",
            "options": {
                "none": "None",
                "channel": "Per Channel",
                "server/dm": "Per Server/DM",
                "everywhere": "Everywhere",
            }
        }
    ],

    outputs: [
        {
            "id": "action1",
            "name": "Action",
            "description": "Type: Action\n\nDescription: Executes the following blocks if there is no error message.",
            "types": ["action"]
        },
        {
            "id": "action2",
            "name": "Action (Error)",
            "description": "Type: Action\n\nDescription: Executes the following blocks if there is any error message.",
            "types": ["action"]
        },
        {
            "id": "message",
            "name": "Message",
            "description": "Type: Object\n\nDescription: The command author's message.",
            "types": ["object"]
        },
        {
            "id": "channel",
            "name": "Channel",
            "description": "Type: Object\n\nDescription: The command author's message channel.",
            "types": ["object"]
        },
        {
            "id": "user",
            "name": "User",
            "description": "Type: Object\n\nDescription: The command author.",
            "types": ["object"]
        },
        {
            "id": "error_message",
            "name": "Error Message",
            "description": "Type: Object\n\nDescription: The error message if the user is still in slowmode, does not have the required permission or other restriction violated.\n\nPossible Values: \"Command Restriction\", \"User Permission\", \"User Slowmode\", \"Nothing\".",
            "types": ["text"]
        }
    ],

    init(DBB, fileName) {
        const Data = DBB.Blocks.Data;
        const slowmodeData = Data.getData("slowmode", fileName, "block");

        if(slowmodeData && DBB.Core.typeof(slowmodeData) == "object") {
            for (const commandName in slowmodeData) {
                const userIDs = slowmodeData[commandName];

                for (const userID in userIDs) {
                    const discordIDs = userIDs[userID];

                    for (const discordID in discordIDs) {
                        const time = discordIDs[discordID];

                        if(Date.now() >= (parseInt(time) || 0)) delete discordIDs[discordID];
                    }

                    if(!Object.values(discordIDs).length) delete userIDs[userID];
                }

                if(!Object.values(userIDs).length) delete slowmodeData[commandName];
            }

            if(Object.values(slowmodeData).length) Data.setData("slowmode", slowmodeData, fileName, "block");
            else Data.deleteData("slowmode", fileName, "block");
        } else Data.deleteData("slowmode", fileName, "block");
    },

    code(cache) {
        let command_name = this.GetInputValue("command_name", cache);
        const custom_prefix = this.GetInputValue("custom_prefix", cache, true);
        let command_slowmode = this.GetInputValue("command_slowmode", cache);
        const command_restriction = this.GetOptionValue("command_restriction", cache) + "";
        const required_member_permission = (this.GetOptionValue("required_member_permission", cache) + "").toUpperCase();
        const case_sensitive = this.GetOptionValue("case_sensitive", cache) == "yes";
        const command_slowmode_restriction = this.GetOptionValue("command_slowmode_restriction", cache) + "";

        command_name = typeof command_name == "string" ? command_name : "";
        if(case_sensitive) command_name = command_name.toLowerCase();

        command_slowmode = typeof command_slowmode == "object" ? Date.now() - command_slowmode.getTime() : parseInt(command_slowmode);


        const DBB = this.getDBB();

        const {prefixes, owners} = DBB.Data.data.dbb;

        let prefix = prefixes.main;
        if(custom_prefix) prefix = custom_prefix.value + "";


        function CheckCommandRestriction(msg) {
            switch(command_restriction) {
                default: // "none"
                    return [true, msg.member ? CheckPermission(msg.member) : true];
                case "server_only":
                    return [Boolean(msg.guild), CheckPermission(msg.member)];
                case "server_owner_only":
                    return [msg.guild && msg.guild.owner.id == msg.member.id, true];
                case "bot_owner_only":
                    return [owners.includes(msg.author.id), true];
                case "dms_only":
                    return [msg.channel.type == "dm", true];
            }
        }

        function CheckPermission(member) {
            if(required_member_permission == "NONE") return true;
            else if(!member) return false;
            return member.hasPermission(required_member_permission);
        }


        function ExtraCheckSlowmode(userID, targetID) {
            if(userID in userIDs && targetID in userIDs[userID] && userIDs[userID][targetID] >= Date.now()) return false;

            if(!(userID in userIDs)) userIDs[userID] = {}
            userIDs[msg.author.id][msg.channel.id] = Date.now() + command_slowmode;
            return true;
        }
        function CheckSlowmode(msg) {
            const slowmodeData = this.getData("slowmode", fileName, "block");

            if(slowmodeData && DBB.Core.typeof(slowmodeData) == "object") {
                const userIDs = slowmodeData[cache.name];

                switch(command_slowmode_restriction) {
                    case "channel":
                        return ExtraCheckSlowmode(msg.author.id, msg.channel.id);
                    case "server/dm":
                        if(msg.guild) return ExtraCheckSlowmode(msg.author.id, msg.guild.id);
                        else if(msg.channel.type == "dm") return ExtraCheckSlowmode(msg.author.id, msg.channel.id);
                    case "everywhere":
                        if(msg.author.id in userIDs && userIDs[msg.author.id] >= Date.now()) return false;

                        userIDs[msg.author.id] = Date.now() + command_slowmode;
                        return true;
                    default:
                        return true;
                }
            }

            this.setData("slowmode", slowmodeData, fileName, "block");
        }


        const EndBlock = (msg, reason, action) => {
            this.StoreOutputValue(msg, "message", cache);
            this.StoreOutputValue(msg.channel, "channel", cache);
            this.StoreOutputValue(msg.author, "user", cache);
            this.StoreOutputValue(reason, "error_message", cache);
            this.RunNextBlock(action ? "action1" : "action2", cache);
        }

        this.events.on("message", msg => {
            if(msg.author.bot) return;

            const _prefix = !custom_prefix && msg.guild && msg.guild.id in prefixes.servers ? prefixes.servers[msg.guild.id] : prefix;

            let content = msg.content.trim();
            if(case_sensitive) content = content.toLowerCase();

            if(!content.startsWith(_prefix + command_name)) return;


            const restriction = CheckCommandRestriction(msg);

            if(!restriction[0]) EndBlock(msg, "Command Restriction");
            else if(!restriction[1]) EndBlock(msg, "Member Permission");
            else if(command_slowmode && !CheckSlowmode(msg)) EndBlock(msg, "User Slowmode");
            else EndBlock(msg, "Nothing", true);
        });
    }
}