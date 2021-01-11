module.exports = {
    name: "Apply Permissions",

    description: "Applies the set of permissions to the role or channel.",

    category: "Permissions Stuff",

    inputs: [
        {
            "id": "action",
            "name": "Action",
            "description": "Acceptable Types: Action\n\nDescription: Executes this block.",
            "types": ["action"]
        },
        {
            "id": "target1",
            "name": "Target 1 (Role/Channel)",
            "description": "Acceptable Types: Object, Unspecified\n\nDescription: The role or channel to set the permissions. Set the corresponded option in \"Target Type\".",
            "types": ["object", "unspecified"],
            "required": true
        },
        {
            "id": "target2",
            "name": "Target 2 (Role/Member)",
            "description": "Acceptable Types: Object, Unspecified\n\nDescription: Follow the instructions in \"Target Type\" option if necessary. (OPTIONAL)",
            "types": ["object", "unspecified"]
        },
        {
            "id": "permissions",
            "name": "Permissions",
            "description": "Acceptable Types: Object, Unspecified\n\nDescription: The set of permissions to apply to the role or channel.",
            "types": ["object", "unspecified"],
            "required": true
        },
        {
            "id": "reason",
            "name": "Reason",
            "description": "Acceptable Types: Text, Unspecified\n\nDescription: The reason for applying this set the permissions to the role or channel. This will appear in Audit Log of the server. (OPTIONAL)",
            "types": ["text", "unspecified"]
        }
    ],

    options: [
        {
            "id": "application_type",
            "name": "Application Type",
            "description": "Description: The type of application for the role or channel permissions.",
            "type": "SELECT",
            "options": {
                "set": "Set",
                "update": "Update",
            }
        },
        {
            "id": "target_type",
            "name": "Target Type",
            "description": "Description: The option related to the role/channel from the \"Target 1\" input.",
            "type": "SELECT",
            "options": {
                "role": "Role",
                "channel_everyone": "Channel (Related to @everyone role)",
                "channel_target": "Channel (Related to a specific role or member. Put the role or member in the \"Target 2\" input.)",
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
        const permissions = this.GetInputValue("permissions", cache);
        const reason = this.GetInputValue("reason", cache);
        const application_type = this.GetOptionValue("application_type", cache) + "";
        const target_type = this.GetOptionValue("target_type", cache) + "";

        const {Permissions} = require("discord.js");



        const convertPerms = (perms = {}) => {
            const res = {};

            if(perms.allow instanceof Permissions) {
                perms.allow.toArray().forEach(perm => {
                    res[perm] = true;
                });
            }
            if(perms.inherit instanceof Permissions) {
                perms.inherit.toArray().forEach(perm => {
                    res[perm] = null;
                });
            }
            if(perms.deny instanceof Permissions) {
                perms.deny.toArray().forEach(perm => {
                    res[perm] = false;
                });
            }

            return res;
        }

        const convertPerms2 = perms => {
            const res = perms.serialize(false);

            delete res.ADMINISTRATOR;
            delete res.VIEW_GUILD_INSIGHTS;
            delete res.MANAGE_ROLES;

            return res;
        }

        const convertPerms3 = perms => {
            const newPerms = new Permissions(target1.permissions);

            if(perms.allow instanceof Permissions) {
                newPerms.add(perms.allow);
            }
            if(perms.deny instanceof Permissions) {
                newPerms.remove(perms.deny);
            }

            return newPerms;
        }



        switch(application_type) {
            default:
            case "set":
                switch(target_type) {
                    case "role":
                        target1.setPermissions(permissions instanceof Permissions ? permissions : permissions.allow, reason);
                        break;
                    case "channel_everyone":
                        target1.createOverwrite(target1.guild.id, permissions instanceof Permissions ? convertPerms2(permissions) : convertPerms(permissions), reason);
                        break;
                    case "channel_target":
                        target1.createOverwrite(target2, permissions instanceof Permissions ? convertPerms2(permissions) : convertPerms(permissions), reason);
                        break;
                }
                break;
            case "update":
                switch(target_type) {
                    case "role":
                        target1.setPermissions(permissions instanceof Permissions ? permissions : convertPerms3(permissions), reason);
                        break;
                    case "channel_everyone":
                        target1.updateOverwrite(target1.guild.id, permissions instanceof Permissions ? convertPerms2(permissions) : convertPerms(permissions), reason);
                        break;
                    case "channel_target":
                        target1.updateOverwrite(target2, permissions instanceof Permissions ? convertPerms2(permissions) : convertPerms(permissions), reason);
                        break;
                }
                break;
        }

        this.RunNextBlock("action", cache);
    }
}