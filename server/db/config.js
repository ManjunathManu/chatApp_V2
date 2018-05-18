var mongoose = require('mongoose');
const mongoAtlasURI = "mongodb+srv://manjunath:manjunath@mongoatlas-j5w1d.mongodb.net/chatApp_V2?retryWrites=true"
const localMongoURI =  "mongodb://127.0.0.1:27017/chatApp_V2";
mongoose.Promise = global.Promise;

mongoose.connect(mongoAtlasURI,(err,resp)=>{
    if(err){
        console.log('Unable to connect to mongo DB--',err)
    }else{
        console.log('Connected to mongo DB--')
    }
});

module.exports = {mongoose}