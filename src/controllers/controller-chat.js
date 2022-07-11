import { chats } from "../../data/data.js" 

const chat = {}

chat.getMessages = async (req, res) => {
    res.send(chats)
}
chat.getMessageById = async (req, res) => {
    const singleChat = chats.find(chat => chat._id === req.params.id);
    res.send(singleChat)
} 

export default chat