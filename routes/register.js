const express = require('express'),
    router =express.Router(),
    postgres = require('../db/postgres');

router.get('/', function (req, res) {
    res.render('register')
});

router.post('/', function (req,res) {
    console.dir(req.body.username);
    let username = req.body.username;
    let password = req.body.password;
    postgres.createUser(username, password);
    res.redirect('/login');
});


module.exports = router;