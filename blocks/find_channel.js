module.exports = {
    name: "Find Channel",

    description: "Finds a channel.",

    category: "Channel Stuff",

    inputs: [
        {
            "id": "action",
            "name": "Action",
            "description": "Acceptable Types: Action\n\nDescription: Executes this block.",
            "types": ["action"]
        },
        {
            "id": "server",
            "name": "Server",
            "description": "Acceptable Types: Object, Unspecified\n\nDescription: The server to find the channel. Use only if you are not looking for a DM channel. If possible, use this input to avoid finding the channel on an unintended server. (OPTIONAL)",
            "types": ["object", "unspecified"]
        },
        {
            "id": "search_value",
            "name": "Search Value",
            "description": "Acceptable Types: Unspecified, Text, Number\n\nDescription: The value according to your choice in the \"Find Channel By\" option.",
            "types": ["unspecified", "text", "number", "object"],
            "required": true
        }
    ],

    options: [
        {
            "id": "channel_type",
            "name": "Channel Type",
            "description": "Description: The type of channel to search for.",
            "type": "SELECT",
            "options": {
                "any": "Any Channel",
                "dm": "DM Channel",
                "text": "Text Channel",
                "voice": "Voice Channel",
                "category": "Category"
            }
        },
        {
            "id": "find_channel_by",
            "name": "Find Channel By",
            "description": "Description: The type of search for the channel.",
            "type": "SELECT",
            "options": {
                "id": "Channel ID",
                "name": "Channel Name",
                "topic": "Channel Topic",
                "position": "Channel Position",
                "recipient": "Channel Recipient (DM Channel Only)",
            }
        }
    ],

    outputs: [
        {
            "id": "action",
            "name": "Action",
            "description": "Acceptable Types: Action\n\nDescription: Executes the following blocks when this block finishes its task.",
            "types": ["action"]
        },
        {
            "id": "channel",
            "name": "Channel",
            "description": "Type: Object\n\nDescription: The channel found if possible.",
            "types": ["object"]
        }
    ],

    code(cache) {
        const server = this.GetInputValue("server", cache, false, this.client);
        const search_value = this.GetInputValue("search_value", cache);
        const channel_type = this.GetOptionValue("channel_type", cache) + "";
        const find_channel_by = this.GetOptionValue("find_channel_by", cache) + "";

        let channels = server.channels.cache;
        if(["dm", "text", "voice", "category"].includes(channel_type)) {
            channels = channels.filter(ch => channel_type == "text" ? ["text", "news", "store"].includes(ch.type) : ch.type == channel_type);
        }

        let result;
        switch(find_channel_by) {
            case "id":
                result = channels.get(search_value + "");
                break;
            case "name":
                result = channels.find(c => c.name === search_value);
                break;
            case "topic":
                result = channels.find(c => c.topic == search_value);
                break;
            case "position":
                result = channels.find(c => c.position === parseInt(search_value));
                break;
            case "recipient":
                result = channels.find(c => c.recipient == search_value);
                break;
        }

        this.StoreOutputValue(result, "channel", cache);
        this.RunNextBlock("action", cache);
    }
}