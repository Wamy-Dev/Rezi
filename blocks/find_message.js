module.exports = {
    name: "Find Message",

    description: "Finds a message.",

    category: "Message Stuff",

    inputs: [
        {
            "id": "action",
            "name": "Action",
            "description": "Acceptable Types: Action\n\nDescription: Executes this block.",
            "types": ["action"]
        },
        {
            "id": "channel",
            "name": "Channel",
            "description": "Acceptable Types: Object, Unspecified\n\nDescription: The channel to find the message. If possible, use this input to avoid finding the message on an unintended channel. (OPTIONAL)",
            "types": ["object", "unspecified"]
        },
        {
            "id": "search_value",
            "name": "Search Value",
            "description": "Acceptable Types: Unspecified, Text, Object\n\nDescription: The value according to your choice in the \"Find Message By\" option.",
            "types": ["unspecified", "text", "object"],
            "required": true
        }
    ],

    options: [
        {
            "id": "find_message_by",
            "name": "Find Message By",
            "description": "Description: The search type for the message.",
            "type": "SELECT",
            "options": {
                "id": "Message ID (Requires Channel to find uncached messages)",
                "author_user": "Message Author [User]",
                "author_member": "Message Author [Member] (Server Only)",
                "content": "Message Content",
                "clean_content": "Message Clean Content",
                "server": "Message Server (Server Only)",
                "url": "Message URL",
            }
        }
    ],

    outputs: [
        {
            "id": "action",
            "name": "Action",
            "description": "Acceptable Types: Action\n\nDescription: Executes block.",
            "types": ["action"]
        },
        {
            "id": "message",
            "name": "Message",
            "description": "Type: Object\n\nDescription: The message found if possible.",
            "types": ["object"]
        }
    ],

    async code(cache) {
        const channel = this.GetInputValue("channel", cache);
        const search_value = this.GetInputValue("search_value", cache);
        const find_message_by = this.GetOptionValue("find_message_by", cache);

        let result;
        if(find_message_by == "id" && channel) {
            try {
                result = await channel.messages.fetch(search_value);
            } catch {}
        } else {
            const messages = channel ? channel.messages.cache : [].concat(...client.channels.cache.filter(a => a.messages.cache).map(a => a.messages.cache.array()));

            switch(find_message_by) {
                case "id":
                    result = messages.find(c => c.id == search_value);
                    break;
                case "author_user":
                    result = messages.find(c => c.author == search_value);
                    break;
                case "author_member":
                    result = messages.find(c => c.member == search_value);
                    break;
                case "content":
                    result = messages.find(c => c.content == search_value);
                    break;
                case "clean_content":
                    result = messages.find(c => c.cleanContent == search_value);
                    break;
                case "server":
                    result = messages.find(c => c.guild == search_value);
                    break;
                case "url":
                    result = messages.find(c => c.url == search_value);
                    break;
            }
        }

        this.StoreOutputValue(result, "message", cache);
        this.RunNextBlock("action", cache);
    }
}