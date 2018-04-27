function socketCommunication(socket){
    console.log('New user connected....',socket.id)
    socket.on('disconnect',()=>{
        console.log('User disconnected--',socket.id)
    });

    socket.on('message',(message)=>{
        console.log('New message arrived from client--',message)
    })
}

module.exports = {socketCommunication}