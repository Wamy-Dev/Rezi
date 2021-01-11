module.exports = {
    name: "Format Date",

    description: "Formats the date to any avaiable templates, for better readability.",

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
            "description": "Acceptable Types: Date, Unspecified\n\nDescription: The date to format.",
            "types": ["date", "unspecified"],
            "required": true
        }
    ],

    options: [
        {
            "id": "date_templates",
            "name": "Date Templates",
            "description": "Description: The date template to format.",
            "type": "SELECT",
            "options": {
                "dont_include": "Do Not Include",
                "dd/mm/yyyy": "DD/MM/YYYY (e.g. 01/06/2020)",
                "d/m/yyyy": "D/M/YYYY (e.g. 1/6/2020)",
                "mm/dd/yyyy": "MM/DD/YYYY (e.g. 06/01/2020)",
                "m/d/yyyy": "M/D/YYYY (e.g. 6/1/2020)",
                "yyyy/mm/dd": "YYYY/MM/DD (e.g. 2020/06/01)",
                "yyyy/m/d": "YYYY/M/D (e.g. 2020/6/1)",
                "mmmm_d,yyyy": "MMMM D, YYYY (e.g. June 1, 2020)",
                "dddd,d_mmmm_yyyy": "DDDD, DD MMMM YYYY (e.g. Monday, 1 June 2020)"
            }
        },
        {
            "id": "time_templates",
            "name": "Time Templates",
            "description": "Description: The time template to format.",
            "type": "SELECT",
            "options": {
                "dont_include": "Do Not Include",
                "hh:mm": "HH:MM (e.g. 15:45)",
                "hh:mm:ss": "HH:MM:SS (e.g. 15:45:30)",
                "hh:mm_ampm": "HH:MM AM/PM (e.g. 3:45 PM)",
                "hh:mm:ss_ampm": "HH:MM:SS AM/PM (e.g. 3:45:30 PM)"
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
            "id": "formatted_date",
            "name": "Formatted Date",
            "description": "Type: Text\n\nDescription: The formatted date.",
            "types": ["text"]
        }
    ],

    code(cache) {
        const date = this.GetInputValue("date", cache);
        const date_templates = this.GetOptionValue("date_templates", cache);
        const time_templates = this.GetOptionValue("time_templates", cache);

        const res = [];

        const addZero = number => number < 10 ? "0" + number : number;

        const month = number => ({
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
        })[number];

        switch(date_templates) {
            case "dd/mm/yyyy":
                res.unshift(`${addZero(date.getDate())}/${addZero(date.getMonth() + 1)}/${date.getFullYear()}`);
                break;
            case "d/m/yyyy":
                res.unshift(`${date.getDate()}/${date.getMonth() + 1}/${date.getFullYear()}`);
                break;
            case "mm/dd/yyyy":
                res.unshift(`${addZero(date.getMonth() + 1)}/${addZero(date.getDate())}/${date.getFullYear()}`);
                break;
            case "mm/dd/yyyy":
                res.unshift(`${date.getMonth() + 1}/${date.getDate()}/${date.getFullYear()}`);
                break;
            case "yyyy/mm/dd":
                res.unshift(`${date.getFullYear()}/${addZero(date.getMonth() + 1)}/${addZero(date.getDate())}`);
                break;
            case "yyyy/m/d":
                res.unshift(`${date.getFullYear()}/${date.getMonth() + 1}/${date.getDate()}`);
                break;
            case "mmmm_dd,yyyy":
                res.unshift(`${month(date.getMonth())} ${date.getDate()}, ${date.getFullYear()}`);
                break;
            case "dddd,dd_mmmm_yyyy":
                res.unshift(`${({
                    0: "Sunday",
                    1: "Monday",
                    2: "Tuesday",
                    3: "Wednesday",
                    4: "Thursday",
                    5: "Friday",
                    6: "Saturday"
                })[date.getDate()]}, ${date.getDate()} ${month(date.getMonth())} ${date.getFullYear()}`);
                break;
        }

        function formatAMPM(date) {
            let hours = date.getHours();
            const minutes = date.getMinutes();
            const ampm = hours >= 12 ? 'pm' : 'am';
            hours = hours % 12;
            hours = hours ? hours : 12; // the hour '0' should be '12'
            minutes = minutes < 10 ? '0'+minutes : minutes;
            var strTime = hours + ':' + minutes + ' ' + ampm;
            return strTime;
        }

        switch(time_templates) {
            case "hh:mm":
                res.push(addZero(date.getHours()) + ":" + addZero(date.getMinutes()));
                break;
            case "hh:mm:ss":
                res.push(addZero(date.getHours()) + ":" + addZero(date.getMinutes()) + ":" + addZero(datedate.getSeconds()));
                break;
            case "hh:mm_ampm":
                var hours = date.getHours();
                var hours2 = hours % 12;
                res.push(addZero(hours2 ? hours2 : 12) + ":" + addZero(date.getMinutes()) + " " + (hours >= 12 ? "pm" : "am"));
                break;
            case "hh:mm:ss_ampm":
                var hours = date.getHours();
                var hours2 = hours % 12;
                res.push(addZero(hours2 ? hours2 : 12) + ":" + addZero(date.getMinutes()) + ":" + addZero(date.getSeconds()) + " " + (hours >= 12 ? "pm" : "am"));
                break;
        }

        this.StoreOutputValue(res.join(" "), "formatted_date", cache);
        this.RunNextBlock("action", cache);
    }
}