module.exports = {
    name: "Members Speaking [Event]",

    description: "When a member starts or stops speaking in a voice channel, this event will trigger.",

    category: "Events",

    auto_execute: true,

    inputs: [],

    options: [],

    outputs: [
        {
            "id": "action",
            "name": "Action",
            "description": "Type: Action\n\nDescription: Executes the following blocks when this block finishes its task.",
            "types": ["action"]
        },
        {
            "id": "member",
            "name": "Member",
            "description": "Type: Object\n\nDescription: The member who started or stopped speaking.",
            "types": ["object"]
        },
        {
            "id": "is_speaking",
            "name": "Is Speaking?",
            "description": "Type: Boolean\n\nDescription: Whether the member is speaking.",
            "types": ["boolean"]
        },
        {
            "id": "speaking_type",
            "name": "Speaking Type",
            "description": "Type: Text\n\nDescription: The speaking type of the member.",
            "types": ["text"]
        }
    ],

    code(cache) {
        this.events.on("guildMemberSpeaking", (member, speaking) => {
            this.StoreOutputValue(member, "member", cache);
            this.StoreOutputValue(Boolean(member.voice.speaking), "is_speaking", cache);

            let type = "Unknown";
            switch(speaking.bitfield) {
                case 1:
                    type = "Speaking";
                    break;
                case 2:
                    type = "Soundshare";
                    break;
                case 4:
                    type = "Priority Speaking";
                    break;
            }

            this.StoreOutputValue(type, "speaking_type", cache);
            this.RunNextBlock("action", cache);
        });
    }
}