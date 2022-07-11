import { Mongoose } from "mongoose";

const chatModel = Mongoose.Schema(
    {
        chatName: {
            type: String,
            trim: true
        },
        isGroupChat: {
            type: Boolean,
            default: false
        },
        users: [
            {
                type: Mongoose.Schema.Types.ObjectId,
                ref: "User"
            }
        ],
        latestMessage: {
            type: Mongoose.Schema.Types.ObjectId,
            ref: "Message"
        },
        groupAdmin: {
            type: Mongoose.Schema.Types.ObjectId,
            ref: "User"
        }
    },
    {
        timestamps: true
    }
)

const Chat = Mongoose.model("Chat", chatModel)

export default Chat