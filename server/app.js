const express = require("express");
const bodyParser = require("body-parser");
const db = require('./db/config')
const User = require('./models/users')
const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(require('./routes'));

const server = app.listen(3000, function () {
    console.log("Listening on port %s...", server.address().port);
});