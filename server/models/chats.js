const mongoose = require('mongoose');
const Schema = mongoose.Schema,
    ObjectId = Schema.ObjectId;

const ChatSchema = new Schema({
    chatId: { type: ObjectId },
    userName1: { type: String, required: true },
    userName2: { type: String, required: true },

    // userNames: [{type:String, required:true}],
    messages: { type: Array, required: true },
});

ChatSchema.statics.saveMessage = function (message, receiverName) {
    let Chat = this;
    return Chat.findOneAndUpdate({
        $or: [
            { 'userName1': message.sender },
            { 'userName2': receiverName }
            // {userNames:{$elemMatch:message.sender}}
        ]
    }, { $push: { messages: message } }, { new: true })
        .then((chats) => {
            console.log('updated Chats---', chats)
        })
}

ChatSchema.statics.findChatInDb = function (message, receiverName) {
    return new Promise((resolve, reject) => {
        let Chat = this;
        Chat.findOne({
            $or: [
                // { 'userNames': [message.sender,receiverName] },
                // { 'userNames': [receiverName,message.sender ]}
                { 'userName1': message.sender },
                { 'userName2': receiverName }
            ]
        }, (err, chats) => {
            console.log('chatsss---', err, chats)
            if (err) {
                console.log('error while checking for chat--', err);
                reject(err);
            } else if (!chats) {
                console.log('No chat document found for these two users')
                resolve(true);
            } else {
                console.log('Chat document exists for these users')
                reject(false);
            }
        })
    })
}

const Chat = mongoose.model('chat', ChatSchema);

module.exports = { Chat }
