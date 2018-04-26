const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const Schema = mongoose.Schema,
    ObjectId = Schema.ObjectId;

const UserSchema = new Schema({
    userId: { type: ObjectId },
    userName: { type: String, required: true, index: true },
    email: { type: String, required: true, index: true },
    password: { type: String, required: true},
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

UserSchema.statics.findByCredentials = function (email, password) {
    let User = this;
  
    return User.findOne({email}).then((user) => {
      if (!user) {
        return Promise.reject();
      }
  
      return new Promise((resolve, reject) => {
        // Use bcrypt.compare to compare password and user.password
        bcrypt.compare(password, user.password, (err, res) => {
          if (res) {
            resolve(user);
          } else {
            reject("Incorrect email or password");
          }
        });
      });
    });
};

UserSchema.statics.getAllUsers = function(){
    let User = this;

    return User.find({},'userName')
        .then((users)=>{
            if(users && users.length > 0){
                return Promise.resolve(users);
            }else{
                return Promise.resolve([])
            }
        })
        .catch((err)=>{
            return Promise.reject(err);
        })
}
const User = mongoose.model('user', UserSchema);

module.exports = { User }