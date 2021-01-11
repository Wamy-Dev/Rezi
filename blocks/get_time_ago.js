module.exports = {
    name: "Get Time Ago",

    description: "Gets the time ago (e.g. \"5 minutes ago\", \"2 hours ago\", etc...), by comparing two times.",

    category: "Date Stuff",

    inputs: [
        {
            "id": "action",
            "name": "Action",
            "description": "Acceptable Types: Action\n\nDescription: Executes this block.",
            "types": ["action"]
        },
        {
            "id": "time1",
            "name": "Time 1",
            "description": "Acceptable Types: Date, Number, Unspecified\n\nDescription: The date 1 to compare to the date 2.",
            "types": ["date", "unspecified"],
            "required": true
        },
        {
            "id": "time2",
            "name": "Time 2",
            "description": "Acceptable Types: Date, Number, Unspecified\n\nDescription: The date 2 to compare to the date 1. Default: Current time.",
            "types": ["date", "unspecified"]
        }
    ],

    options: [],

    outputs: [
        {
            "id": "action",
            "name": "Action",
            "description": "Type: Action\n\nDescription: Executes the following blocks when this block finishes its task.",
            "types": ["action"]
        },
        {
            "id": "time_ago",
            "name": "Time Ago",
            "description": "Type: Text\n\nDescription: The time ago obtained.",
            "types": ["text"]
        }
    ],

    code: function(cache) {
        const time1 = this.GetInputValue("time1", cache);
        const time2 = this.GetInputValue("time2", cache, false, Date.now());

        let [number, text] = (() => {
            let time = time2 - time1;

            if(time < 1000) return [time, "millisecond"];
            time /= 1000;
            if(time < 60) return [time, "second"];
            time /= 60;
            if(time < 60) return [time, "minute"];
            time /= 60;
            if(time < 24) return [time, "hour"];
            time /= 24;
            if(time < 30) return [time, "day"];
            time /= 30;
            if(time < 12) return [time, "month"];
            time /= 12;
            return [time, "year"];
        })();

        number = Math.floor(number);
        if(number != 1) text += "s";

        this.StoreOutputValue(number + " " + text + " ago", "time_ago", cache);
        this.RunNextBlock("action", cache);
    }
}