module.exports = {
    name: "Get Server Integration Info",

    description: "Gets the server integration information.",

    category: "Server Stuff",

    inputs: [
        {
            "id": "action",
            "name": "Action",
            "description": "Acceptable Types: Action\n\nDescription: Executes this block.",
            "types": ["action"]
        },
        {
            "id": "server_integration",
            "name": "Server Integration",
            "description": "Acceptable Types: Object, Unspecified\n\nDescription: The server integration to get the information.",
            "types": ["object", "unspecified"],
            "required": true
        }
    ],

    options: [
        {
            "id": "server_integration_info",
            "name": "Server Integration Info",
            "description": "Description: The server integration information to get.",
            "type": "SELECT",
            "options": {
                1: "Server Integration Account ID [Text]",
                2: "Server Integration Account Name [Text]",
                3: "Is Server Integration Enabled? [Boolean]",
                4: "Server Integration Expire Behavior [Text]",
                5: "Server Integration Expire Grace Period (Days) [Number]",
                6: "Server Integration Server [Server]",
                7: "Server Integration ID [Text]",
                8: "Server Integration Name [Text]",
                9: "Server Integration Role [Role]",
                10: "Server Integration Synced At [Date]",
                11: "Is Server Integration Syncing? [Boolean]",
                12: "Server Integration Type [Text]",
                13: "Server Integration User [User]",
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
            "description": "Type: Unspecified\n\nDescription: The information obtained from the server integration.",
            "types": ["unspecified"]
        }
    ],

    async code(cache) {
        const server_integration = this.GetInputValue("server_integration", cache);
        const server_integration_info = parseInt(this.GetOptionValue("server_integration_info", cache));

        let result;
        switch(server_integration_info) {
            case 1:
                result = server_integration.account.id;
                break;
            case 2:
                result = server_integration.account.name;
                break;
            case 3:
                result = server_integration.enabled;
                break;
            case 4:
                result = ["Remove Role", "Kick"][server_integration.expireBehavior] || "Unknown";
                break;
            case 5:
                result = server_integration.expireGracePeriod;
                break;
            case 6:
                result = server_integration.guild;
                break;
            case 7:
                result = server_integration.id;
                break;
            case 8:
                result = server_integration.name;
                break;
            case 9:
                result = server_integration.role;
                break;
            case 10:
                result = server_integration.syncedAt;
                break;
            case 11:
                result = server_integration.syncing;
                break;
            case 12:
                result = server_integration.type.replace(/_/g, " ").replace(/\w\S*/g, a => a[0].toUpperCase() + a.substring(1).toLowerCase());
                break;
            case 13:
                result = server_integration.user;
                break;
        }

        this.StoreOutputValue(result, "result", cache);
        this.RunNextBlock("action", cache);
    }
}