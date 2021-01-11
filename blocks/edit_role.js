module.exports = {
    name: "Edit Role",

    description: "Edits a role.",

    category: "Role Stuff",

    inputs: [
        {
            "id": "action",
            "name": "Action",
            "description": "Acceptable Types: Action\n\nDescription: Executes this block.",
            "types": ["action"]
        },
        {
            "id": "role",
            "name": "Role",
            "description": "Acceptable Types: Object, Unspecified\n\nDescription: The role to edit.",
            "types": ["object", "unspecified"],
            "required": true
        },
        {
            "id": "role_name",
            "name": "Role Name",
            "description": "Acceptable Types: Text, Unspecified\n\nDescription: The new name for this role. (OPTIONAL)",
            "types": ["text", "unspecified"]
        },
        {
            "id": "role_color",
            "name": "Role Color",
            "description": "Acceptable Types: Text, Unspecified\n\nDescription: The new color for this role. (OPTIONAL)",
            "types": ["text", "unspecified"]
        },
        {
            "id": "role_hoist",
            "name": "Role Hoist",
            "description": "Acceptable Types: Boolean, Unspecified\n\nDescription: Whether or not this role should be displayed separately from online members. (OPTIONAL)",
            "types": ["boolean", "unspecified"]
        },
        {
            "id": "role_position",
            "name": "Role Position",
            "description": "Acceptable Types: Number, Unspecified\n\nDescription: The new position for this role. (OPTIONAL)",
            "types": ["number", "unspecified"]
        },
        {
            "id": "role_permissions",
            "name": "Role Permissions",
            "description": "Acceptable Types: Object, Number, Unspecified\n\nDescription: The new set of permissions for this role. Supports Bitfield. (OPTIONAL)",
            "types": ["object", "number", "unspecified"]
        },
        {
            "id": "role_mentionable",
            "name": "Role Mentionable",
            "description": "Acceptable Types: Boolean, Unspecified\n\nDescription: Whether or not should be allowed anyone to @mention this role. (OPTIONAL)",
            "types": ["boolean", "unspecified"]
        },
        {
            "id": "reason",
            "name": "Reason",
            "description": "Acceptable Types: Text, Unspecified\n\nDescription: The reason for editing this role. This will appear in Audit Log of the server. (OPTIONAL)",
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
        const role = this.GetInputValue("role", cache);
        const role_name = this.GetInputValue("role_name", cache);
        const role_color = this.GetInputValue("role_color", cache);
        const role_hoist = Boolean(this.GetInputValue("role_hoist", cache));
        const role_position = parseInt(this.GetInputValue("role_position", cache));
        const role_permissions = this.GetInputValue("role_permissions", cache);
        const role_mentionable = Boolean(this.GetInputValue("role_mentionable", cache));
        const reason = this.GetInputValue("reason", cache);

        const data = {
            name: role_name,
            color: role_color,
            hoist: role_hoist,
            position: role_position,
            permissions: role_permissions && role_permissions.hasOwnProperty("allow") ? role_permissions.allow : role_permissions,
            mentionable: role_mentionable
        }

        Object.keys(data).forEach(key => {
            if([undefined, null, NaN].includes(data[key])) delete data[key];
        });

        role.edit(data, reason).then(() => {
            this.RunNextBlock("action", cache);
        });
    }
}