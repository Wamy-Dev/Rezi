module.exports = {
    name: "Create Server",

    description: "Creates a new server. This is ONLY available if your bot has LESS than 10 servers!",

    category: "Server Stuff",

    inputs: [
        {
            "id": "action",
            "name": "Action",
            "description": "Acceptable Types: Action\n\nDescription: Executes this block.",
            "types": ["action"]
        },
        {
            "id": "server_name",
            "name": "Server Name",
            "description": "Acceptable Types: Text, Unspecified\n\nDescription: The name for this server.",
            "types": ["text", "unspecified"],
            "required": true,
        },
        {
            "id": "server_icon",
            "name": "Server Icon",
            "description": "Acceptable Types: Text, Object, Unspecified\n\nDescription: The icon for this server. Supports Image, image file path and URL. (OPTIONAL)",
            "types": ["text", "object", "unspecified"]
        }
    ],

    options: [
        {
            "id": "server_default_message_notifications",
            "name": "Server Default Message Notifications",
            "description": "Description: The default message notifications for this server.",
            "type": "SELECT",
            "options": {
                "all": "All Messages",
                "mentions": "Only @mentions"
            }
        },
        {
            "id": "server_explicit_content_filter_level",
            "name": "Server Explicit Content Filter Level",
            "description": "Description: The explicit content filter level for this server.",
            "type": "SELECT",
            "options": {
                "disabled": "Disabled",
                "members_without_roles": "Members Without Roles",
                "all_members": "All Members"
            }
        },
        {
            "id": "server_verification_level",
            "name": "Server Verification Level",
            "description": "Description: The verification level for this server.",
            "type": "SELECT",
            "options": {
                "none": "None",
                "low": "Low",
                "medium": "Medium",
                "high": "High",
                "very_high": "Very High"
            }
        },
        {
            "id": "server_region",
            "name": "Server Region",
            "description": "Description: The region for this server.",
            "type": "SELECT",
            "options": {
                "amsterdam": "Amsterdam",
                "brazil": "Brazil",
                "dubai": "Dubai",
                "europe": "Europe",
                "eu-central": "Central Europe",
                "eu-west": "Western Europe",
                "frankfurt": "Frankfurt",
                "hongkong": "Hong Kong",
                "india": "India",
                "japan": "Japan",
                "london": "London",
                "russia": "Russia",
                "singapore": "Singapore",
                "southafrica": "South Africa",
                "south-korea": "South Korea",
                "sydney": "Sydney",
                "us-central": "US Central",
                "us-east": "US East",
                "us-south": "US South",
                "us-west": "US West"
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
            "id": "server",
            "name": "Server",
            "description": "Type: Object\n\nDescription: This server created.",
            "types": ["object"]
        }
    ],

    code(cache) {
        const server_name = this.GetInputValue("server_name", cache);
        const server_icon = this.GetInputValue("server_icon", cache);
        const server_default_message_notifications = this.GetOptionValue("server_default_message_notifications", cache).toUpperCase();
        const server_explicit_content_filter_level = this.GetOptionValue("server_explicit_content_filter_level", cache).toUpperCase();
        const server_verification_level = this.GetOptionValue("server_verification_level", cache).toUpperCase();
        const server_region = this.GetOptionValue("server_region", cache);

        const data = {
            defaultMessageNotifications: server_default_message_notifications,
            explicitContentFilter: server_explicit_content_filter_level,
            icon: server_icon,
            region: server_region,
            verificationLevel: server_verification_level
        }

        Object.keys(data).forEach(key => {
            if([undefined, null, NaN].includes(data[key])) delete data[key];
        });

        this.client.guilds.create(server_name, data).then(server => {
            this.StoreOutputValue(server, "server", cache);
            this.RunNextBlock("action", cache);
        });
    }
}