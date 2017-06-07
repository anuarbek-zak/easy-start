var express = require('express');
var router = express.Router();
var User = require('../models/User');


router.get('/api/users',function (req,res) {
    User.find({}).exec(function (err,users) {
        if(err) return err;
        res.send(users);
    });
});

module.exports = router;
