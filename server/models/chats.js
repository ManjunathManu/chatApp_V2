const mongoose = require('mongoose');
const Schema = mongoose.Schema,
    ObjectId = Schema.ObjectId;

const ChatSchema = new Schema({
    chatId: { type: ObjectId },
    userNames: [{type:String, required:true}],
    messages: { type: Array, required: true },
});

ChatSchema.statics.saveMessage = function (message, receiverName) {
    let Chat = this;
    return Chat.findOneAndUpdate({
        userNames:{
            $all:[message.sender, receiverName]
        }
    }, { $push: { messages: message } }, { new: true })
        .then((chats) => {
            console.log('updated Chats---')
        })
}

ChatSchema.statics.findChatInDb = function (senderName, receiverName) {
    return new Promise((resolve, reject) => {
        let Chat = this;
        Chat.findOne({
            userNames:{
                $all:[senderName, receiverName]
            }
        },'messages', (err, chats) => {
            // console.log('chats----',chats);
            if (err) {
                console.log('error while checking for chat--', err);
                reject(err);
            } else if (!chats) {
                console.log('No chat document found for these two users')
                // resolve(true);
                reject(false);
            } else {
                console.log('Chat document exists for these users');
                resolve(chats);
            }
        })
    })
}

// UserSchema.statics.getChatMessages = function(senderName, receiverName){
//     let User = this;

//     return User.findOne({
        
//     })
// }

const Chat = mongoose.model('chat', ChatSchema);

module.exports = { Chat }
