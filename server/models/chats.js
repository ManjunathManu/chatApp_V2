const mongoose = require('mongoose');
const Schema = mongoose.Schema,
    ObjectId = Schema.ObjectId;

const UserSchema = new Schema({
    userId: { type: ObjectId },
    with : {type: ObjectId},
    messages :{type:Array},
    userName: { type: String, required: true, index: true },
    email: { type: String, min: 18, required: true, index: true },
    password: { type: String, required: true},
    signedUpDate: { type: Date, default: Date.now },
});