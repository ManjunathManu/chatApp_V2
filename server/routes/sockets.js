function socketCommunication(socket){
    console.log('New user connected....',socket.id)
    socket.on('disconnect',()=>{
        console.log('User disconnected--',socket.id)
    })
}

module.exports = {socketCommunication}