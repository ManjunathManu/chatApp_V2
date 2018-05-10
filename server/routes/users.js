const express = require('express');
const router = express.Router();
const { User } = require('./../models/users');
const { Chat } = require('./../models/chats');

const {authenticate} = require('./../middleware/authenticate');

router.post('/signUp', function (req, res) {
    console.log("[API:::signUp]")
    let data = req.body ? req.body : null;
    let user = new User(
        {
            userName: data.userName,
            email: data.email,
            password: data.password
        }
    );
    User.findUserInDb(user)
        .then((user) => {
            user.save((err) => {
                if (err) {
                    console.log("Error while saving the user", err)
                    res.status(500).send({ status: "Internal server error", err: "Something is wrong please try after sometime." })
                } else {
                     user.generateAuthToken()
                        .then((token) => {
                            res.status(200).header('Authorization', `Bearer ${token}`).send({ status: "Successfully signed up", user });
                        })
                }
            })
        })
        .catch((err) => {
            console.log('ERROR while creating new user', err)
            res.status(400).send({ status: "User already exist", err: err || "Somethind is wrong please try after sometime." });
        })

})

router.post('/logIn', function (req, res) {
    let data = req.body ? req.body : null;
    User.findByCredentials(data.email, data.password)
        .then((user) => {
           return user.generateAuthToken()
            .then((token)=>{
                res.status(200).set('Authorization',`Bearer ${token}`).send({ status: "Successfully logged in", user })
            })
            .catch((err)=>{
                console.log("Token generation error--",err);
                res.staus(500).send({status:"Internal service error",err:err ||"Somethind is wrong please try after sometime" })
            })
        })
        .catch((err) => {
            console.log("Find by credentials--",err);
            res.status(401).send({ status: "Unauthorized user", err });
        })
})

router. get('/getAllUsers', authenticate,function (req, res) {
    console.log('get all users for sender--',req.query.senderName)
    User.getAllUsers(req.query.senderName)
        .then((users) => {
            res.status(200).send({ status: "Got all users", users });
        })
        .catch((err) => {
            res.status(500).send({ status: "Internal server error", err: "Something went wrong ,could not fetch the users" })
        })
})

router.get('/chat/:senderName/:receiverName',authenticate, function(req, res){
    let senderName = req.params.senderName;
    let receiverName = req.params.receiverName;
    console.log('fetch chat messages for sender and receiver---',senderName,receiverName)
    Chat.findChatInDb(senderName, receiverName)
        .then((chats)=>{
            console.log('splice--',chats.messages.length)
            let lastTenChats = chats.messages.splice(0,chats.messages.length-15)
            res.status(200).send(chats.messages)
        })
        .catch((err)=>{
            console.log('Could not fetch the chat messages',err);
            if(!err){
                res.status(404).send('Chat document does not exist');
            }else{
                res.status(500).send('Internal server error')
            }
        })
})
module.exports = router;