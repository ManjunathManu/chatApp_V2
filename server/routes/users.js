const express = require('express');
const router = express.Router();
const {User} = require('./../models/users');
router.post('/signUp', function (req, res) {
    console.log("[API:::signUp]")
    let data = req.body ? req.body : null;
    let user = new User(
        {
            userName : data.userName,
            email : data.email,
            password : data.password
        }
    );
    User.findUserInDb(user)
        .then((user)=>{
            user.save((err) => {
                if (err) {
                    console.log("Error while saving the user", err)
                    res.status(500).send({ status: "Internal server error", err:"Something is wrong please try after sometime."})
                } else {
                    res.status(200).send({ status: "Successfully signed up", user });
                }
            })
        })
        .catch((err)=>{
            console.log('ERROR while creating new user',err)
            res.status(400).send({status:"User already exist",err:err || "Somethind is wrong please try after sometime."});
        })

})

router.post('/logIn',function (req,res){
    let data = req.body ? req.body : null;
    User.findByCredentials(data.email, data.password)
    .then((user)=>{
        res.status(200).send({status:"Successfully logged in",user})
    })
    .catch((err)=>{
        res.status(401).send({status:"Unauthorized user",err});
    })
})

router.get('/getAllUsers', function(req, res){
    User.getAllUsers()
        .then((users)=>{
            res.status(200).send({status:"Got all users",users});
        })
        .catch((err)=>{
            res.status(500).send({status:"Internal server error",err:"Something went wrong ,could not fetch the users"})
        })
})
module.exports = router;