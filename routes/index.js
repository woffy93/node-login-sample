const express = require('express'),
    router =express.Router();

router.get('/', ensureAuthenticated, function (req, res) {
    res.render('index');
});

function ensureAuthenticated(req, res, next) {
    console.log(req);
    if (req.isAuthenticated()) {
        console.log("AAAA");
        return next();
    } else {
        console.log("BBBBBB");
        res.redirect('/login');
    }
}
module.exports = router;