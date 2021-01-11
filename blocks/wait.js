module.exports = {
    name: "Wait",

    description: "Waits for the set amount of time to execute the following blocks.",

    category: "Extras",

    inputs: [
        {
            "id": "action",
            "name": "Action",
            "description": "Acceptable Types: Action\n\nDescription: Executes this block.",
            "types": ["action"]
        },
        {
            "id": "time",
            "name": "Time",
            "description": "Acceptable Types: Number, Date, Unspecified\n\nDescription: The amount of time to wait. Supports Date.",
            "types": ["number", "date", "unspecified"],
            "required": true
        }
    ],

    options: [
        {
            "id": "time_type",
            "name": "Time Type",
            "description": "Description: The type of time to set. Only use this option if you did not put a Date in the input \"Time\".",
            "type": "SELECT",
            "options": {
                "milliseconds": "Milliseconds",
                "seconds": "Seconds",
                "minutes": "Minutes",
                "hours": "Hours",
                "days": "Days"
            }
        }
    ],

    outputs: [
        {
            "id": "action",
            "name": "Action",
            "description": "Type: Action\n\nDescription: Executes the following blocks after waiting for the amount of time.",
            "types": ["action"]
        }
    ],

    code(cache) {
        const time = parseFloat(this.GetInputValue("time", cache));
        const time_type = this.GetOptionValue("time_type", cache);

        let _time = 0;

        if(typeof time == "object") {
            _time = time.getTime() - Date.now();
        } else {
            switch(time_type) {
                case "milliseconds":
                    _time = time;
                    break;
                case "seconds":
                    _time = time * 1000;
                    break;
                case "minutes":
                    _time = time * 60 * 1000;
                    break;
                case "hours":
                    _time = time * 60 * 60 * 1000;
                    break;
                case "days":
                    _time = time * 24 * 60 * 60 * 1000;
                    break;
            }
        }

        setTimeout(() => {
            this.RunNextBlock("action", cache);
        }, _time);
    }
}