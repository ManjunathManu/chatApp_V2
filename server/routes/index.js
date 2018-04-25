
const express = require('express');
let router = express.Router();

router.get('/',(req, res)=>{
    res.send('Hello, Welcome to chat application!!');
});
router.use('/api/user',require('./users'));

module.exports = router;