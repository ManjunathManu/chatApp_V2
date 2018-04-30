const {User} = require('./../models/users');
const { Chat } = require('./../models/chats')
function socketCommunication(socket) {
    console.log('New user connected....', socket.id);

    socket.on('update_socket_id', (userName,operation, cb) => {
        if (!userName) {
            cb('UserName does not exist')
        } else {
            User.updateSocketId(socket.id, userName,operation )
                .then((user)=>{
                    // cb('Successfully saved the socketid');
                })
                .catch((err)=>{
                    console.log('err',err)
                    cb('Could not update the socket id');
                })
        }
    });
 
    socket.on('disconnect', () => {
        console.log('User disconnected--', socket.id);
    });

    socket.on('message', (message,receiverName) => {
        console.log('New message arrived from client--', message.sender,'to',receiverName);
        let newChat = new Chat(
            {   
                // userNames :[message.sender, receiverName],
                userName1:message.sender,
                userName2:receiverName,
                messages : [message]
            }
        )
        Chat.findChatInDb(message.sender, receiverName)
            .then((chat)=>{
                newChat.save((err)=>{
                    if(err){
                        console.log('Could not save chats',err)
                    }else{
                        console.log('Saved chat document')
                    }
                })
            })
            .catch((err)=>{
                console.log('catch block',err)
                Chat.saveMessage(message, receiverName);
            })
        // socket.broadcast.emit('message',message);
    })
}

module.exports = { socketCommunication }