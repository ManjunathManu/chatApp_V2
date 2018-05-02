const { User } = require('./../models/users');
const { Chat } = require('./../models/chats');
// const io = require('./../app');
function socketCommunication(socket) {
    console.log('New user connected....', socket.id);

    socket.on('update_socket_id', (userName, operation, cb) => {
        if (!userName) {
            cb('UserName does not exist')
        } else {
            User.updateSocketId(socket.id, userName, operation)
                .then((user) => {
                    // cb('Successfully saved the socketid');
                })
                .catch((err) => {
                    console.log('err', err)
                    cb('Could not update the socket id');
                })
        }
    });

    socket.on('disconnect', () => {
        console.log('User disconnected--', socket.id);
    });

    socket.on('message', async (message, receiverName) => {
        console.log('New message arrived from client--', message.sender, 'to', receiverName);
        let newChat = new Chat(
            {
                userNames: [message.sender, receiverName],
                messages: [message]
            }
        )
        Chat.findChatInDb(message.sender, receiverName)
            .then((chat) => {
                Chat.saveMessage(message, receiverName);
            })
            .catch((err) => {
                console.log('ERROR', err);
                if(!err){
                    newChat.save((err) => {
                        if (err) {
                            console.log('Could not save chats', err)
                        } else {
                            console.log('Saved chat document')
                        }
                    })
                }
            })
            try{
                let receiverSocketId = await User.getSocketId(receiverName);
                console.log('receiversocketId--->',receiverSocketId)
                socket.to(receiverSocketId).emit('message',message)
            }catch(err){
                console.log('Error while emiting to receiver',err);
            }
    })
}

module.exports = { socketCommunication }