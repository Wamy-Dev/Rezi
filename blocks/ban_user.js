const unban = function(client, Data, fileName) {
    const times = Data.getData("time", fileName, "block");

    if(times && this.getDBB().Core.typeof(times) == "object") {
        for (const userID in times) {
            const info = times[userID];

            if(Date.now() >= (parseInt(info[0]) || 0)) {
                const server = client.guilds.cache.get(parseInt(info[1]) ? info[1] + "" : "");

                if(server) server.members.unban(parseInt(userID) ? userID + "" : "", info[2] ? info[2] + "" : "");

                delete times[userID];
            }
        }
    } else Data.deleteData("time", fileName, "block");
}

module.exports = {
    name: "Ban User/Member",

    description: "Bans an user/member from the server.",

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
            "description": "Acceptable Types: Object, Unspecified\n\nDescription: The server to ban the user.",
            "types": ["object", "unspecified"],
            "required": true
        },
        {
            "id": "target",
            "name": "User/Member",
            "description": "Acceptable Types: Object, Text, Unspecified\n\nDescription: The user to ban from the server. Supports Member and User ID.",
            "types": ["object", "text", "unspecified"],
            "required": true
        },
        {
            "id": "delete_user_message_history",
            "name": "Delete User Message History (Days)",
            "description": "Acceptable Types: Number, Unspecified\n\nDescription: The number of days of banned user's messages to delete. (OPTIONAL)",
            "types": ["number", "unspecified"]
        },
        {
            "id": "time",
            "name": "Time (Milliseconds)",
            "description": "Acceptable Types: Number, Date, Unspecified\n\nDescription: The time to wait to unban the user/member. Supports Date. Default: \"0\" (no temporary ban). (OPTIONAL)",
            "types": ["number", "date", "unspecified"]
        },
        {
            "id": "reason1",
            "name": "Reason (Banning)",
            "description": "Acceptable Types: Text, Unspecified\n\nDescription: The reason for banning the user from the server. This will appear in Audit Log of the server. (OPTIONAL)",
            "types": ["text", "unspecified"]
        },
        {
            "id": "reason2",
            "name": "Reason (Unbanning)",
            "description": "Acceptable Types: Text, Unspecified\n\nDescription: The reason for unbanning the user from the server. This will appear in Audit Log of the server only if this is a temporary ban. (OPTIONAL)",
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

    init(DBB, fileName) {
        unban(DBB.DiscordJS.client, DBB.Blocks.Data, fileName);
    },

    code(cache) {
        const server = this.GetInputValue("server", cache);
        const user = this.GetInputValue("user", cache);
        const days = parseInt(this.GetInputValue("delete_user_message_history", cache));
        let time = this.GetInputValue("time", cache);
        const reason1 = this.GetInputValue("reason1", cache) + "";

        time = typeof time == "object" ? Date.now() - time.getTime() : parseInt(time);

        server.members.ban(user, {
            days,
            reason1
        }).then(() => {
            if(time) {
                let times = this.getData("time", cache.name, "block");
                if(!times || this.getDBB().Core.typeof(times) != "object") times = {}

                const reason2 = this.GetInputValue("reason2", cache) + "";

                times[typeof user == "object" ? user.id : user + ""] = [parseInt(time), server.id + "", reason2 + ""];

                this.setData("time", times, cache.name, "block");

                setTimeout(() => {
                    unban(this.client, this, cache.name);
                }, time);
            }

            this.RunNextBlock("action", cache);
        });
    }
}