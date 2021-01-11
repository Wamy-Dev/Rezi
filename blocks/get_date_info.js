module.exports = {
    name: "Get Date Info",

    description: "Gets the date information.",

    category: "Date Stuff",

    inputs: [
        {
            "id": "action",
            "name": "Action",
            "description": "Acceptable Types: Action\n\nDescription: Executes this block.",
            "types": ["action"]
        },
        {
            "id": "date",
            "name": "Date",
            "description": "Acceptable Types: Date, Unspecified\n\nDescription: The date to get the information.",
            "types": ["date", "unspecified"],
            "required": true
        }
    ],

    options: [
        {
            "id": "date_info",
            "name": "Date Info",
            "description": "Description: The date information to get.",
            "type": "SELECT",
            "options": {
                1: "Date Unix Timestamp [Number]",
                2: "Date Weekday [Text]",
                3: "Date Day Number [Number]",
                4: "Date Month of the Year [Text]",
                5: "Date Month Number [Number]",
                6: "Date Year [Number]",
                7: "Date Full Date [Text]",
                8: "Date Full Time [Text]",
                9: "Date Full Date + Full Time [Text]",
                10: "Date Hour [Number]",
                11: "Date Minute [Number]",
                12: "Date Second [Number]",
                13: "Date Millisecond [Number]",
                14: "Date Timezone [Text]"
            }
        },
        {
            "id": "time_type",
            "name": "Time Type",
            "description": "Description: The type of time to get.",
            "type": "SELECT",
            "options": {
                "local": "Local Time",
                "utc": "Universal Time (UTC)"
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
            "description": "Type: Unspecified\n\nDescription: The information obtained from the date.",
            "types": ["unspecified"]
        }
    ],

    code(cache) {
        const date = this.GetInputValue("date", cache);
        const date_info = parseInt(this.GetOptionValue("date_info", cache));
        const time_type = this.GetOptionValue("time_type", cache) == "utc" ? "UTC" : "";

        let result;
        switch(date_info) {
            case 1:
                result = date["get" + time_type + "Time"]();
                break;
            case 2:
                result = ({
                    0: "Sunday",
                    1: "Monday",
                    2: "Tuesday",
                    3: "Wednesday",
                    4: "Thursday",
                    5: "Friday",
                    6: "Saturday"
                })[date["get" + time_type + "Day"]()];
                break;
            case 3:
                result = date["get" + time_type + "Date"]();
                break;
            case 4:
                result = ({
                    0: "January",
                    1: "February",
                    2: "March",
                    3: "April",
                    4: "May",
                    5: "June",
                    6: "July",
                    7: "August",
                    8: "September",
                    9: "October",
                    10: "November",
                    11: "December"
                })[date["get" + time_type + "Month"]()];
                break;
            case 5:
                result = date["get" + time_type + "Month"]() + 1;
                break;
            case 6:
                result = date["get" + time_type + "FullYear"]();
                break;
            case 7:
                result = date.toLocaleDateString(undefined, {timeZone: time_type || undefined});
                break;
            case 8:
                result = date.toLocaleTimeString(undefined, {timeZone: time_type || undefined});
                break;
            case 9:
                result = date.toLocaleString(undefined, {timeZone: time_type || undefined});
                break;
            case 9:
                result = date["get" + time_type + "Hours"]();
                break;
            case 10:
                result = date["get" + time_type + "Minutes"]();
                break;
            case 11:
                result = date["get" + time_type + "Seconds"]();
                break;
            case 12:
                result = date["get" + time_type + "Milliseconds"]();
                break;
            case 13:
                result = "GMT" + date.slice(28, 29) + parseInt(date.slice(29, 33)) / 100;
                break;
        }

        this.StoreOutputValue(result, "result", cache);
        this.RunNextBlock("action", cache);
    }
}