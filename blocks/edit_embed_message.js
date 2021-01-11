module.exports = {
    name: "Edit Message Embed",

    description: "Edits the embed to insert into a message.",

    category: "Message Embed Stuff",

    inputs: [
        {
            "id": "action",
            "name": "Action",
            "description": "Acceptable Types: Action\n\nDescription: Executes this block.",
            "types": ["action"]
        },
        {
            "id": "message_embed",
            "name": "Message Embed",
            "description": "Acceptable Types: Object, Unspecified\n\nDescription: The message embed to edit.",
            "types": ["object", "unspecified"],
            "required": true
        },
        {
            "id": "color",
            "name": "Color",
            "description": "Acceptable Types: Text, Number, Unspecified\n\nDescription: The new color for this message embed. (OPTIONAL)",
            "types": ["text", "number", "unspecified"]
        },
        {
            "id": "thumbnail",
            "name": "Thumbnail URL",
            "description": "Acceptable Types: Text, Unspecified\n\nDescription: The new thumbnail URL for this message embed. (OPTIONAL)",
            "types": ["text", "unspecified"]
        },
        {
            "id": "author_icon",
            "name": "Author Icon URL",
            "description": "Acceptable Types: Text, Unspecified\n\nDescription: The new author icon URL for this message embed. (OPTIONAL)",
            "types": ["text", "unspecified"]
        },
        {
            "id": "author_name",
            "name": "Author Name",
            "description": "Acceptable Types: Text, Unspecified\n\nDescription: The new author name for this message embed. (OPTIONAL)",
            "types": ["text", "unspecified"]
        },
        {
            "id": "author_url",
            "name": "Author URL",
            "description": "Acceptable Types: Text, Unspecified\n\nDescription: The new author URL for this message embed. This requires the embed author name to highlight it! (OPTIONAL)",
            "types": ["text", "unspecified"]
        },
        {
            "id": "title",
            "name": "Title",
            "description": "Acceptable Types: Text, Unspecified\n\nDescription: The new title for this message embed. (OPTIONAL)",
            "types": ["text", "unspecified"]
        },
        {
            "id": "url",
            "name": "URL",
            "description": "Acceptable Types: Text, Unspecified\n\nDescription: The new URL for this message embed. This requires the embed title to highlight it! (OPTIONAL)",
            "types": ["text", "unspecified"]
        },
        {
            "id": "description",
            "name": "Description",
            "description": "Acceptable Types: Text, Unspecified\n\nDescription: The new description for this message embed. (OPTIONAL)",
            "types": ["text", "unspecified"]
        },
        {
            "id": "image",
            "name": "Image URL",
            "description": "Acceptable Types: Text, Unspecified\n\nDescription: The new image URL for this message embed. (OPTIONAL)",
            "types": ["text", "unspecified"]
        },
        {
            "id": "footer_icon",
            "name": "Footer Icon URL",
            "description": "Acceptable Types: Text, Unspecified\n\nDescription: The new footer icon URL for this message embed. (OPTIONAL)",
            "types": ["text", "unspecified"]
        },
        {
            "id": "footer_text",
            "name": "Footer Text",
            "description": "Acceptable Types: Text, Unspecified\n\nDescription: The new footer text for this message embed. (OPTIONAL)",
            "types": ["text", "unspecified"]
        },
        {
            "id": "timestamp",
            "name": "Timestamp (Date)",
            "description": "Acceptable Types: Date, Number, Unspecified\n\nDescription: The new timestamp (Date) for this message embed. If a boolean as \"true\", this uses the current time. (OPTIONAL)",
            "types": ["date", "number", "unspecified"]
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
            "id": "message_embed",
            "name": "Message Embed",
            "description": "Type: Object\n\nDescription: This message embed edited.",
            "types": ["object"]
        }
    ],

    code: function(cache) {
        const message_embed = this.GetInputValue("message_embed", cache);
        const color = this.GetInputValue("color", cache, true);
        const thumbnail = this.GetInputValue("thumbnail", cache, true);
        const author_icon = this.GetInputValue("author_icon", cache);
        const author_name = this.GetInputValue("author_name", cache, true);
        const author_url = this.GetInputValue("author_url", cache);
        const title = this.GetInputValue("title", cache, true);
        const url = this.GetInputValue("url", cache, true);
        const description = this.GetInputValue("description", cache, true);
        const image = this.GetInputValue("image", cache, true);
        const footer_icon = this.GetInputValue("footer_icon", cache);
        const footer_text = this.GetInputValue("footer_text", cache, true);
        const timestamp = this.GetInputValue("timestamp", cache, true);

        if(color) message_embed.setColor(color.value);
        if(thumbnail) message_embed.setThumbnail(thumbnail.value);
        if(author_icon || author_name || author_url) message_embed.setAuthor(((author_name && (author_name.value || "\u200b")) || ((message_embed.author && message_embed.author.name) || "\u200b")), author_icon, author_url);
        if(title) message_embed.setTitle(title.value);
        if(url) message_embed.setURL(url.value);
        if(description) message_embed.setDescription(description.value);
        if(image) message_embed.setImage(image.value);
        if(footer_icon || footer_text) message_embed.setFooter((footer_text && (footer_text.value || "\u200b") || ((message_embed.footer && message_embed.footer.text) || "\u200b")), footer_icon);
        if(timestamp) message_embed.setTimestamp(timestamp.value === true ? undefined : timestamp.value);

        this.StoreOutputValue(message_embed, "message_embed", cache);
        this.RunNextBlock("action", cache);
    }
}