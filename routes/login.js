const express = require('express'),
    router =express.Router(),
    postgres = require('../db/postgres'),
    passport = require('passport'),
    bcrypt = require('bcryptjs');
LocalStrategy = require('passport-local').Strategy;

passport.use(new LocalStrategy(function (username, password, done) {
    postgres.login(username)
        .then(user =>{
            return new Promise((resolve,reject)=>{
                bcrypt.compare(password,user.password)
                    .then(function (res) {
                        if(res){
                            resolve(user);
                        }
                        else{
                            reject(Error("no pw"));
                        }
                    })
            })
        })
        .then(res =>{
            if(res.username!==null && res.username!==undefined){
                return done(null, res.username);
            }
            else {
                return done(null, false, { message: 'Incorrect password.' });
            }
        })
        .catch(e =>{
            return done(null, false, { message: 'Incorrect password.' });
        })
}));

passport.serializeUser(function(user, done) {
    done(null, user);
});

passport.deserializeUser(function(username, done) {
    postgres.login(username).then(function (user) {
        if (user === null) {
            done(new Error('Wrong user id.'))
        }

        done(null, user);
    })

});

router.get('/', function (req, res) {

    res.render('login')
});



router.post('/', passport.authenticate('local', {
    successRedirect: '/',
    failureRedirect: '/register'
}));

module.exports = router;