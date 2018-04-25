const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const Schema = mongoose.Schema,
    ObjectId = Schema.ObjectId;

const UserSchema = new Schema({
    userId: { type: ObjectId },
    userName: { type: String, required: true, index: true },
    email: { type: String, min: 18, required: true, index: true },
    password: { type: String, required: true, match: /[a-z]/ },
    signedUpDate: { type: Date, default: Date.now },
});

UserSchema.pre('save', function (next) {
    let user = this;
    if (user.isModified('password')) {
        bcrypt.genSalt(10, (err, salt) => {
            bcrypt.hash(user.password, salt, (err, hash) => {
                user.password = hash;
                next();
            })
        })
    }
    else {
        next();
    }
});

UserSchema.statics.findUserInDb = function (user) {
    return new Promise((resolve, reject) => {
        let User = this;
        // User.findOne({'userName':user.userName,'email':user.email},(err, userInDb)=>{
        User.findOne(
            {
                $or: [
                    { 'userName': user.userName },
                    { 'email': user.email }
                ]
            }, (err, userInDb) => {
                if (err) {
                    console.log('error while checking for user in db', err);
                    reject(err)
                } else if (userInDb) {
                    console.log("user already exist", userInDb);
                    userInDb.userName === user.userName ? 
                    (userInDb.email === user.email ? reject("User with this username and email already exist") : 
                                                        reject("User with this username already exist"))
                    : reject("User with this email already exist")
                } else {
                    console.log('user does not exist in the db')
                    resolve(user);
                }
            })
    })
}

const User = mongoose.model('user', UserSchema);

module.exports = { User }