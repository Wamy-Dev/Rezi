module.exports = {
    name: "Create Date",

    description: "Creates a date to use it in your blocks.",

    category: "Date Stuff",

    inputs: [
        {
            "id": "action",
            "name": "Action",
            "description": "Acceptable Types: Action\n\nDescription: Executes this block.",
            "types": ["action"]
        },
        {
            "id": "year",
            "name": "Year",
            "description": "Acceptable Types: Number, Unspecified\n\nDescription: The year to add or remove according to the date selected in \"Start Date\". (OPTIONAL)",
            "types": ["number", "unspecified"]
        },
        {
            "id": "month",
            "name": "Month",
            "description": "Acceptable Types: Number, Unspecified\n\nDescription: The month to add or remove according to the date selected in \"Start Date\". (OPTIONAL)",
            "types": ["number", "unspecified"]
        },
        {
            "id": "day",
            "name": "Day",
            "description": "Acceptable Types: Number, Unspecified\n\nDescription: The day to add or remove according to the date selected in \"Start Date\". (OPTIONAL)",
            "types": ["number", "unspecified"]
        },
        {
            "id": "hours",
            "name": "Hours",
            "description": "Acceptable Types: Number, Unspecified\n\nDescription: The hours to add or remove according to the date selected in \"Start Date\". (OPTIONAL)",
            "types": ["number", "unspecified"]
        },
        {
            "id": "minutes",
            "name": "Minutes",
            "description": "Acceptable Types: Number, Unspecified\n\nDescription: The minutes to add or remove according to the date selected in \"Start Date\". (OPTIONAL)",
            "types": ["number", "unspecified"]
        },
        {
            "id": "seconds",
            "name": "Seconds",
            "description": "Acceptable Types: Number, Unspecified\n\nDescription: The seconds to add or remove according to the date selected in \"Start Date\". (OPTIONAL)",
            "types": ["number", "unspecified"]
        },
        {
            "id": "milliseconds",
            "name": "Milliseconds",
            "description": "Acceptable Types: Number, Unspecified\n\nDescription: The milliseconds to add or remove according to the date selected in \"Start Date\". (OPTIONAL)",
            "types": ["number", "unspecified"]
        },
        {
            "id": "custom_date",
            "name": "Custom Date",
            "description": "Acceptable Types: Date, Unspecified\n\nDescription: The custom date if you selected the option \"Custom Date\" in \"Start Date\".",
            "types": ["date", "unspecified"]
        }
    ],

    options: [
        {
            "id": "start_date",
            "name": "Start Date",
            "description": "Description: The start date. If you want, you can use the inputs above (Year, Month, Day, Minutes, Seconds, Milliseconds) to add or remove time.",
            "type": "SELECT",
            "options": {
                "current": "Current Time",
                "beginning": "Beginning of Time",
                "custom": "Custom Date",
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
            "id": "date",
            "name": "Date",
            "description": "Type: Date\n\nDescription: This date created.",
            "types": ["date"]
        }
    ],

    code(cache) {
        const year = parseInt(this.GetInputValue("year", cache)) || 0;
        const month = parseInt(this.GetInputValue("month", cache));
        const day = parseInt(this.GetInputValue("day", cache)) || 0;
        const hours = parseInt(this.GetInputValue("hours", cache)) || 0;
        const minutes = parseInt(this.GetInputValue("minutes", cache)) || 0;
        const seconds = parseInt(this.GetInputValue("seconds", cache)) || 0;
        const milliseconds = parseInt(this.GetInputValue("milliseconds", cache)) || 0;
        const custom_date = this.GetInputValue("custom_date", cache);
        const start_date = this.GetOptionValue("start_date", cache);

        function fixedDate(_year, _month, _day, _hours, _minutes, _seconds, _milliseconds) {
            const _b = new Date(0, _month, _day, _hours, _minutes, _seconds, _milliseconds);
            _b.setFullYear(_year);
            return _b;
        }
        
        function addDate(custom_date) {
            const Cy = custom_date.getFullYear() + year;
            const Cmh = custom_date.getMonth() + (month || 0);
            const Cd = custom_date.getDate() + day;
            const Ch = custom_date.getHours() + hours;
            const Cmi = custom_date.getMinutes() + minutes;
            const Cs = custom_date.getSeconds() + seconds;
            const Cml = custom_date.getMilliseconds() + milliseconds;
            
            return fixedDate(Cy, Cmh, Cd, Ch, Cmi, Cs, Cml);
        }
        
        let date;
        switch(start_date) {
            case "beginning":
                date = fixedDate(year, month - 1 || 0, day, hours, minutes, seconds, milliseconds);
                break;
            case "custom":
                date = addDate(custom_date);
                break;
            default: // current
                date = addDate(new Date());
                break;
        }

        this.StoreOutputValue(date, "date", cache);
        this.RunNextBlock("action", cache);
    }
}