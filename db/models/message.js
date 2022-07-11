import { Mongoose } from "mongoose";

const messageModel = Mongoose.Schema({
    sender: {
        type: Mongoose.Schema.Types.ObjectId,
        ref: "User"
    },
    content: {
        type: String,
        trim: true
    },
    chat: {
        type: Mongoose.Schema.Types.ObjectId,
        ref: "Chat"
    }
})

const Message = Mongoose.model("Message", messageModel)

export default Message