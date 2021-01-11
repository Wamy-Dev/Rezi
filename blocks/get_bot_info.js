module.exports = {
    name: "Get Bot Info",

    description: "Gets the bot information.",

    category: "Bot Stuff",

    inputs: [
        {
            "id": "action",
            "name": "Action",
            "description": "Acceptable Types: Action\n\nDescription: Executes this block.",
            "types": ["action"]
        }
    ],

    options: [
        {
            "id": "bot_info",
            "name": "Bot Info",
            "description": "Description: The bot information to get.",
            "type": "SELECT",
            "options": {
                1: "Bot Channel List [List <Channel>]",
                2: "Bot Server Emoji List [List <Server Emoji>]",
                3: "Bot Server List [List <Server>]",
                4: "Bot User List [List <User>]",
                5: "Bot Voice Connection List [List <Voice Connection>]",
                6: "Bot Channel Count [Number]",
                7: "Bot Server Emoji Count [Number]",
                8: "Bot Server Count [Number]",
                9: "Bot User Count [Number]",
                10: "Bot Voice Connection Count [Number]",
                11: "Bot Shard Count [Number]",
                12: "Bot Ready At [Date]",
                13: "Bot Uptime In Milliseconds [Number]",
                14: "Bot Token (DO NOT EXPOSE THIS!!!) [Text]",
                15: "Bot As User [User]",
                16: "Current Bot Ping [Number]",
                17: "Recent Bot Ping List [List <Number>]",
                18: "Bot Discord API Version [Number]",
                19: "Bot Discord.js Version [Number]",
                20: "Bot Node.js Version [Number]",
                21: "Bot CPU Usage (Megabytes) [Number]",
                22: "Bot CPU Core Count [Number]",
                23: "Bot RAM Usage (Percentage) [Number]",
                24: "Bot RAM Usage (Megabytes) [Number]",
                25: "Bot RAM Available (Percentage) [Number]",
                26: "Bot RAM Available (Megabytes) [Number]",
                27: "Bot RAM Total (Megabytes) [Number]",
                28: "Bot Storage Usage (Percentage) [Number]",
                29: "Bot Storage Usage (Megabytes) [Number]",
                30: "Bot Storage Available (Percentage) [Number]",
                31: "Bot Storage Available (Megabytes) [Number]",
                32: "Bot Storage Total (Megabytes) [Number]",
                33: "Bot OS (Operating System) [Text]",
                34: "Bot Folder Path [Text]",
                35: "Bot DBB Workspace Count [Number]",
                36: "Bot Main Prefix [Text]",
                37: "Bot Server Prefix List [List <Text>]",
                38: "Bot Discord Application [Application]",
                39: "Bot Owners [List <User>]",
                40: "Bot Owners ID [List <Text>]",
                41: "Bot Invite URL [Text]",
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
            "description": "Type: Unspecified\n\nDescription: The information obtained from the bot.",
            "types": ["unspecified"]
        }
    ],

    async code(cache) {
        const bot_info = parseInt(this.GetOptionValue("bot_info", cache));

        const client = this.client;

        const discord = require("discord.js");
        const os = require("os");

        let result;
        switch(bot_info) {
            case 1:
                result = client.channels.cache.array();
                break;
            case 2:
                result = client.emojis.cache.array();
                break;
            case 3:
                result = client.guilds.cache.array();
                break;
            case 4:
                result = client.users.cache.array();
                break;
            case 5:
                result = client.voiceConnections.array();
                break;
            case 6:
                result = client.channels.cache.size;
                break;
            case 7:
                result = client.emojis.cache.size;
                break;
            case 8:
                result = client.guilds.cache.size;
                break;
            case 9:
                result = client.users.cache.size;
                break;
            case 10:
                result = client.voiceConnections.size;
                break;
            case 11:
                result = client.shard.count;
                break;
            case 12:
                result = client.readyAt;
                break;
            case 13:
                result = client.uptime;
                break;
            case 14:
                result = client.token;
                break;
            case 15:
                result = client.user;
                break;
            case 16:
                result = client.ws.ping;
                break;
            case 17:
                result = client.ws.shards.map(a => a.ping);
                break;
            case 18:
                result = client.options.http.version;
                break;
            case 19:
                result = discord.version;
                break;
            case 20:
                result = process.versions.node;
                break;
            case 21:
                result = Math.round(process.cpuUsage().user / 1024 / 1024);
                break;
            case 22:
                result = os.cpus().length;
                break;
            case 23:
                var memory = process.memoryUsage();
                result = Math.round(memory.heapUsed / memory.heapTotal * 100);
                break;
            case 24:
                result = Math.round(memory.heapUsed / 1024 / 1024);
                break;
            case 25:
                var memory = process.memoryUsage();
                result = 100 - Math.round(memory.heapUsed / memory.heapTotal * 100);
                break;
            case 26:
                var memory = process.memoryUsage();
                result = Math.round((memory.heapTotal - memory.heapUsed) / 1024 / 1024);
                break;
            case 27:
                result = Math.round(memory.heapTotal / 1024 / 1024);
                break;
            case 28:
                result = Math.round(os.freemem() / os.totalmem() * 100);
                break;
            case 29:
                result = Math.round(os.freemem() / 1024 / 1024);
                break;
            case 30:
                result = 100 - Math.round(os.freemem() / os.totalmem() * 100);
                break;
            case 31:
                result = Math.round((os.totalmem() - os.freemem()) / 1024 / 1024);
                break;
            case 32:
                result = Math.round(os.totalmem() / 1024 / 1024);
                break;
            case 33:
                switch(process.platform) {
                    case "win32":
                        result = "Windows";
                        break;
                    case "linux":
                        result = "Linux";
                        break;
                    case "darwin":
                        result = "MacOS";
                        break;
                    case "aix":
                        result = "Aix";
                        break;
                    case "freebsd":
                        result = "FreeBSD";
                        break;
                    case "openbsd":
                        result = "OpenBSD";
                        break;
                    case "sunos":
                        result = "Solaris";
                        break;
                    default:
                        result = "Unknown";
                        break;
                }
                break;
            case 34:
                result = process.cwd();
                break;
            case 35:
                result = this.getDBB().Data.workspaces.length;
                break;
            case 36:
                result = this.getDBB().Data.data.prefixes.main;
                break;
            case 37:
                result = Object.values(this.getDBB().Data.data.prefixes.servers);
                break;
            case 38:
                result = await client.fetchApplication();
                break;
            case 39:
                const res = [];
                for (const id of this.getDBB().Data.data.dbb.owners) {
                    res.push(await client.users.fetch(id));
                }
                result = res;
                break;
            case 40:
                result = this.getDBB().Data.data.dbb.owners;
                break;
            case 41:
                result = await client.generateInvite(discord.Permissions.ALL);
                break;
        }

        this.StoreOutputValue(result, "result", cache);
        this.RunNextBlock("action", cache);
    }
}