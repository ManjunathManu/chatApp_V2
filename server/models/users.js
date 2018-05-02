const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
// const jwt = require('jsonwebtoken');
const jwt = require('jsonwebtoken-refresh');
const Schema = mongoose.Schema,
    ObjectId = Schema.ObjectId;

const UserSchema = new Schema({
    userId: { type: ObjectId },
    userName: { type: String, required: true, index: true },
    email: { type: String, required: true, index: true },
    password: { type: String, required: true },
    signedUpDate: { type: Date, default: Date.now },
    socketId: { type: String, default: null }
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

UserSchema.statics.findByCredentials = function (email, password) {
    let User = this;

    return User.findOne({ email }).then((user) => {
        if (!user) {
            return Promise.reject();
        }

        return new Promise((resolve, reject) => {
            // Use bcrypt.compare to compare password and user.password
            bcrypt.compare(password, user.password, (err, res) => {
                if (res) {
                    delete user.password;
                    resolve(user);
                } else {
                    reject("Incorrect email or password");
                }
            });
        });
    });
};

UserSchema.statics.getAllUsers = function (requestingUser) {
    let User = this;

    return User.find({}, 'userName')
        .then((users) => {
            if (users && users.length > 0) {
                users = users.filter(user => user.userName !== requestingUser);
                return Promise.resolve(users);
            } else {
                return Promise.resolve([])
            }
        })
        .catch((err) => {
            return Promise.reject(err);
        })
}

UserSchema.methods.generateAuthToken = function () {
    let user = this;
    let access = 'auth';
    let token = jwt.sign({ _id: user._id.toHexString(), access }, process.env.JWT_SECRET, { expiresIn: '1h' }).toString();
    return user.save().then(() => {
        return token;
    });
};

UserSchema.statics.findByToken = function (token) {
    let foundUser = null;
    let refreshedToken = null;
    let User = this;
    let decoded;
    try {
        // console.log('trying to decode token----',token)
        // console.log('----');
        decoded = jwt.verify(token, process.env.JWT_SECRET);
    }
    catch (e) {
        if (e.message == "jwt expired") {
            // console.log(e.message)
            let oriDecoded = jwt.verify(token, process.env.JWT_SECRET, { 'ignoreExpiration': true });
            refreshedToken = jwt.refresh(oriDecoded, 120, process.env.JWT_SECRET);
            decoded = jwt.verify(refreshedToken, process.env.JWT_SECRET);

            // console.log('refreshedToken',refreshedToken);
            // console.log('-------');
        } else {
            // console.log('can not decode==',e.message);
            return Promise.reject();
        }
    }

    // console.log('decoded id',decoded._id);

    return User.findOne({
        '_id': decoded._id,
    })
        .then((user) => {
            foundUser = user;
            // console.log('user==',user);
            if (refreshedToken) {
                // console.log("ref token is there")
                foundUser.refreshedToken = refreshedToken;
                // console.log('foundUser==',foundUser);
                return Promise.resolve(foundUser);
            } else {
                // console.log("ref token is not there");
                return Promise.resolve(user);
            }
        })
        .catch((err) => {
            return Promise.reject(err);
        })
};

UserSchema.statics.updateSocketId = function(socketId,userName,operation){
    let User = this;
    this.socketId = operation == "add" ? socketId : null;
    return User.findOneAndUpdate({userName},{$set:{socketId:socketId}},{new: true})
        .then((user)=>{
            if (!user) {
                return Promise.reject();
            }else{
                // console.log('updated user---',user)
                return Promise.resolve(user);
            }
        })
}

UserSchema.statics.getSocketId = async function(userName){
    let User = this;
    return User.findOne({userName},'socketId')
        .then((user)=>{
            if(!user){
                return Promise.reject('Could not find the socketid of the requested user');
            }else{
                return Promise.resolve(user.socketId);
            }
        })
}

const User = mongoose.model('user', UserSchema);

module.exports = { User }