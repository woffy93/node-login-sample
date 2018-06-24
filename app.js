//================ DEPENDENCIES & IMPORTS =================
const config = require('./config/main')['development'],
    express = require('express'),
    cookieParser=require('cookie-parser'),
    bodyParser = require('body-parser'),
    db = require('./db/postgres'),
    session = require('express-session'),
    routes = require('./routes/index'),
    passport = require('passport'),
    localStrategy = require('passport-local').Strategy;

//================ ./dependencies & imports ===============

const app = express(); //use Express
app.use(bodyParser.urlencoded({
    extended : false
}));

// Passport
app.use(passport.initialize());
app.use(passport.session());


app.use(cookieParser(config.server.secret));

const cookieExpirationDate = new Date();
const cookieExpirationDays = 365;
cookieExpirationDate.setDate(cookieExpirationDate.getDate() + cookieExpirationDays);

app.use(session({
    secret: config.server.secret,
    resave: true,
    saveUninitialized: false,
    cookie: {
        httpOnly: true,
        expires: cookieExpirationDate
    }
} ));






app.listen (config.server.port, function () {
    console.log('Server started on port: '+config.server.port);
});
app.set('view engine', 'pug');
app.set('views', __dirname + '/views');






//================ ROUTES =================
app.use('/', routes);
app.use('/register', require('./routes/register'));
app.use('/logout', require('./routes/logout'));
app.use('/login', require('./routes/login'));


//================ ./routes ===============

//================ PUBLIC  =================
// - JS
app.use('/js', express.static(__dirname + '/public/js'));
app.use('/js', express.static(__dirname + '/public/js/bootstrap.min.js'));
app.use('/js', express.static(__dirname + '/public/js/jquery.js'));


// - CSS
app.use('/css', express.static(__dirname + '/public/css'));
app.use('/css', express.static(__dirname + '/public/css/bootstrap.min.css'));
app.use('/css', express.static(__dirname + '/public/css/custom.css'));

// - IMG
app.use('/img', express.static(__dirname + '/public/img'));
app.use('/img', express.static(__dirname + '/public/img/background.jpg'));
//================ ./public  =================