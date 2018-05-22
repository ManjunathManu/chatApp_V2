const mongoose = require('mongoose');
const Schema = mongoose.Schema,
    ObjectId = Schema.ObjectId;

const ChatSchema = new Schema({
    chatId: { type: ObjectId },
    userNames: [{ type: String, required: true }],
    messages: { type: Array, required: true },
});

ChatSchema.statics.saveMessage = function (message, receiverName) {
    let Chat = this;
    return Chat.findOneAndUpdate({
        userNames: {
            $all: [message.sender, receiverName]
        }
    }, { $push: { messages: { $each: [message], $position: 0 } } }, { new: true })
        .then((chats) => {
            console.log('updated Chats---')
        })
}

ChatSchema.statics.findChatInDb = function (senderName, receiverName, pageNumber, pageSize) {
    return new Promise((resolve, reject) => {
        let Chat = this;
        Chat.findOne({ userNames: { $all: [senderName, receiverName] } },
            // { messages: { $slice: [-(pageNumber*10),10]} }, 
            'messages', )
            .then((chats) => {
                if (!chats) {
                    console.log('No chat document found for these two users')
                    reject(false);
                } else {
                    resolve(chats)
                }
            })
            .catch((err) => {
                console.log('error while checking for chat--', err);
                reject(false);
            })
    })
}

const Chat = mongoose.model('chat', ChatSchema);

module.exports = { Chat }
