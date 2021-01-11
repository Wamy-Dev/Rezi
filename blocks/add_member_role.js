const removeRole = function(client, Data, DBB, fileName) {
    const times = Data.getData("time", fileName, "block");

    if(times && this.getDBB().Core.typeof(times) == "object") {
        for (const userID in times) {
            const info = times[userID];

            if(Date.now() >= (parseInt(info[0]) || 0)) {
                const server = client.guilds.cache.get(parseInt(info[1]) ? info[1] + "" : "");

                if(server) {
                    const member = server.members.cache.get(parseInt(info[2]) ? info[2] + "" : "");

                    if(member) member.roles.remove(DBB.Core.typeof(info[3]) == "array" ? info[3].filter(roleID => roleID && parseInt(roleID)) : info[3] ? info[3] + "" : "", info[4] ? info[4] + "" : "");
                }

                delete times[userID];
            }
        }
    } else Data.deleteData("time", fileName, "block");
}

module.exports = {
    name: "Add Member Role",

    description: "Adds a role to the member.",

    category: "Member Stuff",

    inputs: [
        {
            "id": "action",
            "name": "Action",
            "description": "Acceptable Types: Action\n\nDescription: Executes this block.",
            "types": ["action"]
        },
        {
            "id": "member",
            "name": "Member",
            "description": "Acceptable Types: Object, Unspecified\n\nDescription: The member to add the role.",
            "types": ["object", "unspecified"],
            "required": true
        },
        {
            "id": "role",
            "name": "Role",
            "description": "Acceptable Types: Object, List, Unspecified\n\nDescription: The role to add to the member. Supports List containing the roles.",
            "types": ["object", "list", "unspecified"],
            "required": true
        },
        {
            "id": "time",
            "name": "Time (Milliseconds)",
            "description": "Acceptable Types: Number, Date, Unspecified\n\nDescription: The time to wait to remove the role from the user/member. Supports Date. Default: \"0\" (no temporary role). (OPTIONAL)",
            "types": ["number", "date", "unspecified"]
        },
        {
            "id": "reason1",
            "name": "Reason (Adding Role)",
            "description": "Acceptable Types: Text, Unspecified\n\nDescription: The reason for adding the role to the member. This will appear in Audit Log of the server. (OPTIONAL)",
            "types": ["text", "unspecified"]
        },
        {
            "id": "reason2",
            "name": "Reason (Removing Role)",
            "description": "Acceptable Types: Text, Unspecified\n\nDescription: The reason for removing the role from the member. This will appear in Audit Log of the server only if this is a temporary role. (OPTIONAL)",
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
        removeRole(DBB.DiscordJS.client, DBB.Blocks.Data, DBB, fileName);
    },

    code(cache) {
        const member = this.GetInputValue("member", cache);
        const role = this.GetInputValue("role", cache);
        let time = this.GetInputValue("time", cache);
        const reason1 = this.GetInputValue("reason", cache) + "";

        time = typeof time == "object" ? Date.now() - time.getTime() : parseInt(time);

        member.roles.add(role, reason1).then(() => {
            if(time) {
                let times = this.getData("time", cache.name, "block");
                if(!times || this.getDBB().Core.typeof(times) != "object") times = {}

                const reason2 = this.GetInputValue("reason2", cache) + "";

                times[typeof user == "object" ? user.id : user + ""] = [parseInt(time), member.guild.id + "", member.id + "", reason2 + ""];

                this.setData("time", times, cache.name, "block");

                setTimeout(() => {
                    removeRole(this.client, this, DBB, cache.name);
                }, time);
            }

            this.RunNextBlock("action", cache);
        });
    }
}