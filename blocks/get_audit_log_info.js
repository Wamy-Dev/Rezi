module.exports = {
    name: "Get Audit Log Info",

    description: "Gets the audit log information.",

    category: "Server Stuff",

    inputs: [
        {
            "id": "action",
            "name": "Action",
            "description": "Acceptable Types: Action\n\nDescription: Executes this block.",
            "types": ["action"]
        },
        {
            "id": "audit_log",
            "name": "Audit Log",
            "description": "Acceptable Types: Object, Unspecified\n\nDescription: The audit log to get the information.",
            "types": ["object", "unspecified"],
            "required": true
        }
    ],

    options: [
        {
            "id": "audit_log_info",
            "name": "Audit Log Info",
            "description": "Description: The audit log information to get.",
            "type": "SELECT",
            "options": {
                1: "Audit Log Action [Text]",
                2: "Audit Log Action Type [Text]",
                3: "Audit Log Changes Number [Number]",
                4: "Audit Log Changes List [List]",
                5: "Audit Log Created At [Date]",
                6: "Audit Log Executor [User]",
                7: "Audit Log Extra Data [Object]",
                8: "Audit Log ID [Text]",
                9: "Audit Log Reason [Text]",
                10: "Audit Log Target [Object/Server/Channel/User/Message/Role/Server Emoji/Invite/Webhook/Server Integration]",
                11: "Audit Log Target Type [Text]",
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
            "description": "Type: Unspecified\n\nDescription: The information obtained from the audit log.",
            "types": ["unspecified"]
        }
    ],

    async code(cache) {
        const audit_log = this.GetInputValue("audit_log", cache);
        const audit_log_info = parseInt(this.GetOptionValue("audit_log_info", cache));

        const simplify = txt => txt.replace(/_/g, " ").replace(/\w\S*/g, a => a[0].toUpperCase() + a.substring(1).toLowerCase());

        let result;
        switch(audit_log_info) {
            case 1:
                result = simplify(audit_log.action);
                break;
            case 2:
                result = simplify(audit_log.actionType);
                break;
            case 3:
                result = (audit_log.changes && audit_log.changes.length) || 0;
                break;
            case 4:
                result = audit_log.changes;
                break;
            case 5:
                result = audit_log.createdAt;
                break;
            case 6:
                result = audit_log.executor;
                break;
            case 7:
                result = audit_log.extra;
                break;
            case 8:
                result = audit_log.id;
                break;
            case 9:
                result = audit_log.reason || "";
                break;
            case 10:
                result = audit_log.target;
                break;
            case 11:
                result = simplify(audit_log.targetType);
                break;
        }

        this.StoreOutputValue(result, "result", cache);
        this.RunNextBlock("action", cache);
    }
}