module.exports = {
    name: "Check If Voice Channel Has Member",

    description: "Checks if the voice channel has the member.",

    category: "Channel Stuff",

    inputs: [
        {
            "id": "action",
            "name": "Action",
            "description": "Acceptable Types: Action\n\nDescription: Executes this block.",
            "types": ["action"]
        },
        {
            "id": "voice_channel",
            "name": "Voice Channel",
            "description": "Acceptable Types: Object, Text, Unspecified\n\nDescription: The voice channel to check if has the member. Supports Voice Channel ID.",
            "types": ["object", "text", "unspecified"],
            "required": true
        },
        {
            "id": "member",
            "name": "Member",
            "description": "Acceptable Types: Object, Text, Unspecified\n\nDescription: The member to check if is in the voice channel. Supports Member/User ID. Leave blank to check your bot instead. (OPTIONAL)",
            "types": ["object", "text", "unspecified"]
        }
    ],

    options: [],

    outputs: [
        {
            "id": "action1",
            "name": "Action (If True)",
            "description": "Type: Action\n\nDescription: Executes the following blocks if the voice channel has the member.",
            "types": ["action"]
        },
        {
            "id": "action2",
            "name": "Action (If False)",
            "description": "Type: Action\n\nDescription: Executes the following blocks if the voice channel does not have the member.",
            "types": ["action"]
        }
    ],

    code(cache) {
        let voice_channel = this.GetInputValue("voice_channel", cache);
        const member = this.GetInputValue("member", cache) || this.client.user.id;

        if(typeof voice_channel == "string") voice_channel = this.client.channels.cache.get(voice_channel);

        let result = false;
        if(typeof member == "string") {
            result = voice_channel.members.has(member);
        } else {
            result = voice_channel.members.some(a => a.id == member.id);
        }

        this.RunNextBlock(result ? "action1" : "action2", cache);
    }
}