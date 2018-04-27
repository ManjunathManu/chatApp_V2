let { User } = require('./../models/users');

let authenticate = (req, res, next) => {
    let token = req.header('Authorization')?req.header('Authorization').split(' ')[1]:null;
    if(token){
        User.findByToken(token)
        .then((user) => {
            if (user.refreshedToken) {
                req.token = user.refreshedToken;
                delete user.refreshedToken;
                req.user = user;
                next();
            } else {
                req.user = user;
                req.token = token;
                next();
            }
        })
        .catch((err) => {
            res.status(401).send();
            console.log('error', error);
        });
    }else{
        res.status(400).send({status:"Bad request",err:"Missing token in the request body."})
    }
}

module.exports={authenticate};