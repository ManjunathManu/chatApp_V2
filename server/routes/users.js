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
                    res.status(500).send({ status: "Internal server error", user })
                } else {
                    res.status(200).send({ status: "Successfully signed up", user });
                }
            })
        })
        .catch((err)=>{
            res.status(400).send({status:"User already exist",err});
        })

})
module.exports = router;