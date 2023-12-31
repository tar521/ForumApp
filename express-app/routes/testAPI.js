
const express = require('express');
const User = require('../models/user');

const router = express.Router();
var bodyParser = require('body-parser');
const jsonParser = bodyParser.json();

router.get('/', function(req, res, next) {
    res.status(200).json({'greeting': "Hello", 'lucky_num': 3}).send();
})

router.get('/user', jsonParser, function(req, res) {
    const users = User.find().then((doc) => {
        console.log(doc);
        res.status(200).json(doc);
    }).catch((err) => res.status(400).json(err));
})

router.post('/user', jsonParser, function(req, res, next) {
    const user = req.body;
    const newUser = new User(user);
    console.log(req.body);

    newUser.save().then((doc) => {
        res.status(201).json(newUser);
        console.log(doc); 
    }).catch((err) => {
        console.log(err);
        res.status(400).json({message: "Cannot create another user with this username"});
    });
})
module.exports = router;
