module.exports = {
    name: "Get Server Info",

    description: "Gets the server information.",

    category: "Server Stuff",

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
            "description": "Acceptable Types: Object, Unspecified\n\nDescription: The server to get the information.",
            "types": ["object", "unspecified"],
            "required": true
        }
    ],

    options: [
        {
            "id": "server_info",
            "name": "Server Info",
            "description": "Description: The server information to get.",
            "type": "SELECT",
            "options": {
                1: "Server AFK Channel [Voice Channel]",
                2: "Server AFK Channel ID [Text]",
                3: "Server AFK Channel Timeout (Seconds) [Number]",
                4: "Server Application ID [Text]",
                5: "Is Server Available? [Boolean]",
                6: "Server Channel List [List <Channel>]",
                7: "Server Created At [Date]",
                8: "Server Default Message Notifications [Text]",
                9: "Server Default Role (@everyone) [Role]",
                10: "Has Bot Been Removed From The Server? [Boolean]",
                11: "Are Embedded Images Enabled On This Server? [Boolean]",
                12: "Server Emoji List [List <Emoji>]",
                13: "Server Explicit Content Filter Level [Text]",
                14: "Server Features [List <Text>]",
                15: "Server Icon [Text]",
                16: "Server Icon URL [Text]",
                17: "Server ID [Text]",
                18: "Bot Joined The Server At [Date]",
                19: "Is Server Large? [Boolean]",
                20: "Bot As Member [Member]",
                21: "Server Member Count (Total) [Number]",
                humanMemberCount: "Server Member Count (Humans) [Number]",
                botMemberCount: "Server Member Count (Bots) [Number]",
                onlineMemberCount: "Server Member Count (Online) [Number]",
                offlineMemberCount: "Server Member Count (Offline) [Number]",
                22: "Server Member List [List <Member>]",
                23: "Is Server Two-Factor Authentication Enabled? [Boolean]",
                24: "Server Name [Text]",
                25: "Server Name Acronym [Text]",
                26: "Server Owner Member [Member]",
                27: "Server Owner Member ID [Text]",
                28: "Server Member Rich Presence List [List <Rich Presence>]",
                29: "Server Region [Text]",
                30: "Server Role List [List <Role>]",
                31: "Server Splash [Text]",
                32: "Server Splash URL [Text]",
                33: "Server System Channel [Text Channel]",
                34: "Server System Channel ID [Text]",
                35: "Server Verification Level [Text]",
                36: "Is Server Verified? [Boolean]",
                37: "Server Bot Voice Connection [Voice Connection]",
                38: "Server Ban List [List <Ban>]",
                39: "Server Invite List [List <Invite>]",
                40: "Server Vanity Code [Text]",
                41: "Server Vanity URL [Text]",
                42: "Server Webhook List [List <Webhook>]",
                43: "Server Banner [Text]",
                44: "Server Banner URL [Text]",
                45: "Server Description [Text]",
                46: "Server Embed Channel [Text Channel]",
                47: "Server Embed Channel ID [Text]",
                48: "Server Maximum Members [Number]",
                49: "Server Maximum Rich Presences [Number]",
                50: "Is Server Partnered? [Boolean]",
                51: "Server Boost Count [Number]",
                52: "Server Boost Level [Number]",
                53: "Server Public Updates Channel [Text Channel]",
                54: "Server Public Updates Channel ID [Text]",
                55: "Server Rules Channel [Text Channel]",
                56: "Server Rules Channel ID [Text]",
                57: "Server Widget Channel [Text Channel]",
                58: "Server Widget Channel ID [Text]",
                59: "Is Server Widget Enabled? [Text]",
                60: "Server Audit Log List [List <Audit Log>]",
                61: "Server Preview [Server Preview]",
                62: "Server Bot Prefix [Text]"
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
            "id": "result",
            "name": "Result",
            "description": "Type: Unspecified\n\nDescription: The information obtained from the server.",
            "types": ["unspecified"]
        }
    ],

    async code(cache) {
        const server = this.GetInputValue("server", cache);
        const server_info = this.GetOptionValue("server_info", cache) + "";

        let result;
        switch(server_info) {
            case "1":
                result = server.afkChannel;
                break;
            case "2":
                result = server.afkChannelID;
                break;
            case "3":
                result = server.afkTimeout;
                break;
            case "4":
                result = server.applicationID;
                break;
            case "5":
                result = server.available;
                break;
            case "6":
                result = server.channels.cache.array();
                break;
            case "7":
                result = server.createdAt;
                break;
            case "8":
                switch(server.defaultMessageNotifications) {
                    case "ALL":
                        result = "All Messages";
                        break;
                    case "MENTIONS":
                        result = "Only @mentions";
                        break;
                    default:
                        result = "Unknown";
                        break;
                }
                break;
            case "9":
                result = server.roles.everyone;
                break;
            case "10":
                result = server.deleted;
                break;
            case "11":
                result = server.embedEnabled;
                break;
            case "12":
                result = server.emojis.cache.array();
                break;
            case "13":
                switch(server.explicitContentFilter) {
                    case "DISABLED":
                        result = "Disabled";
                        break;
                    case "MEMBERS_WITHOUT_ROLES":
                        result = "Members Without Roles";
                        break;
                    case "ALL_MEMBERS":
                        result = "All Members";
                        break;
                    default:
                        result = "Unknown";
                        break;
                }
                break;
            case "14":
                result = server.features.replace(/_/g, " ").replace(/\w\S*/g, a => a[0].toUpperCase() + a.substring(1).toLowerCase());
                break;
            case "15":
                result = server.icon;
                break;
            case "16":
                result = server.iconURL({dynamic: true, format: "png"});
                break;
            case "17":
                result = server.id;
                break;
            case "18":
                result = server.joinedAt;
                break;
            case "19":
                result = server.large;
                break;
            case "20":
                result = server.me;
                break;
            case "21":
                result = server.memberCount;
                break;
            case "humanMemberCount":
                result = server.members.cache.filter(member => !member.user.bot).size;
                break;
            case "botMemberCount":
                result = server.members.cache.filter(member => member.user.bot).size;
                break;
            case "onlineMemberCount":
                result = server.members.cache.filter(member => member.presence.status != "offline").size;
                break;
            case "offlineMemberCount":
                result = server.members.cache.filter(member => member.presence.status == "offline").size;
                break;
            case "22":
                result = server.members.cache.array();
                break;
            case "23":
                switch(server.mfaLevel) {
                    default:
                    case 0:
                        result = false;
                        break;
                    case 1:
                        result = true;
                        break;
                }
                break;
            case "24":
                result = server.name;
                break;
            case "25":
                result = server.nameAcronym;
                break;
            case "26":
                result = server.owner;
                break;
            case "27":
                result = server.ownerID;
                break;
            case "28":
                result = server.presences.cache.array();
                break;
            case "29":
                switch(server.region) {
                    case "amsterdam":
                        result = "Amsterdam";
                        break;
                    case "brazil":
                        result = "Brazil";
                        break;
                    case "dubai":
                        result = "Dubai";
                        break;
                    case "europe":
                        result = "Europe";
                        break;
                    case "eu-central":
                        result = "Central Europe";
                        break;
                    case "eu-west":
                        result = "Western Europe";
                        break;
                    case "frankfurt":
                        result = "Frankfurt";
                        break;
                    case "hongkong":
                        result = "Hong Kong";
                        break;
                    case "india":
                        result = "India";
                        break;
                    case "japan":
                        result = "Japan";
                        break;
                    case "london":
                        result = "London";
                        break;
                    case "russia":
                        result = "Russia";
                        break;
                    case "singapore":
                        result = "Singapore";
                        break;
                    case "southafrica":
                        result = "South Africa";
                        break;
                    case "south-korea":
                        result = "South Korea";
                        break;
                    case "sydney":
                        result = "Sydney";
                        break;
                    case "us-central":
                        result = "US Central";
                        break;
                    case "us-east":
                        result = "US East";
                        break;
                    case "us-south":
                        result = "US South";
                        break;
                    case "us-west":
                        result = "US West";
                        break;
                    case "vip-amsterdam":
                        result = "Amsterdam VIP";
                        break;
                    case "vip-us-east":
                        result = "US East VIP";
                        break;
                    case "vip-us-west":
                        result = "US West VIP";
                        break;
                    default:
                        result = "Unknown";
                        break;
                }
                break;
            case "30":
                result = server.roles.cache.array();
                break;
            case "31":
                result = server.splash;
                break;
            case "32":
                result = server.splashURL({dynamic: true, format: "png"});
                break;
            case "33":
                result = server.systemChannel;
                break;
            case "34":
                result = server.systemChannelID;
                break;
            case "35":
                switch(server.verificationLevel) {
                    case 0:
                        result = "None";
                        break;
                    case 1:
                        result = "Low";
                        break;
                    case 2:
                        result = "Medium";
                        break;
                    case 3:
                        result = "High";
                        break;
                    case 4:
                        result = "Very High";
                        break;
                    default:
                        result = "Unknown";
                        break;
                }
                break;
            case "36":
                result = server.verified;
                break;
            case "37":
                result = server.voice && server.voice.connection;
                break;
            case "38":
                result = await server.fetchBans(true).then(bans => bans.array());
                break;
            case "39":
                result = await server.fetchInvites().then(invites => invites.array());
                break;
            case "40":
                result = server.vanityURLCode;
                break;
            case "41":
                result = server.vanityURLCode && `https://discord.gg/${server.vanityURLCode}`;
                break;
            case "42":
                result = await server.fetchWebhooks().then(webhooks => webhooks.array());
                break;
            case "43":
                result = server.banner;
                break;
            case "44":
                result = server.bannerURL({dynamic: true, format: "png"});
                break;
            case "45":
                result = server.description;
                break;
            case "46":
                result = server.embedChannel;
                break;
            case "47":
                result = server.embedChannelID;
                break;
            case "48":
                result = server.maximumMembers;
                break;
            case "49":
                result = server.maximumPresences;
                break;
            case "50":
                result = server.partnered;
                break;
            case "51":
                result = server.premiumSubscriptionCount;
                break;
            case "52":
                result = server.premiumTier;
                break;
            case "53":
                result = server.publicUpdatesChannel;
                break;
            case "54":
                result = server.publicUpdatesChannelID;
                break;
            case "55":
                result = server.rulesChannel;
                break;
            case "56":
                result = server.rulesChannelID;
                break;
            case "57":
                result = server.widgetChannel;
                break;
            case "58":
                result = server.widgetChannelID;
                break;
            case "59":
                result = server.widgetEnabled;
                break;
            case "60":
                result = await server.fetchAuditLogs().then(a => a.entries.array());
                break;
            case "61":
                result = await server.fetchPreview();
                break;
            case "62":
                result = this.getDBB().Data.data.dbb.prefixes.servers[server.id];
                break;
        }

        this.StoreOutputValue(result, "result", cache);
        this.RunNextBlock("action", cache);
    }
}