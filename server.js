//modules
const express = require('express');
    path = require("path"),
    bodyParser = require('body-parser'),
    multer = require('multer'),
    dbconnect = require('./db/dbconnection'),
    dbinfo = require('./config/config.json');

//Connection to Mlbas!
dbconnect.connect(dbinfo);

//setting express
var app = express();
app.set("port", process.env.PORT || 9390);
app.use(express.static(__dirname + '/public'));

//The use of the bodyParser constructor (app.use(bodyParser());) has been deprecated
//Now is a middleware, so you have to call the methods separately...

app.use(bodyParser.json({limit: "15mb"}));
app.use(bodyParser.urlencoded({limit: "15mb", extended: true, parameterLimit:50000}));


//Allow CROSS-ORIGINS
app.use(function (req, res, next) {
res.header("Access-Control-Allow-Origin", "*");
res.header('Access-Control-Allow-Methods', "POST, GET, PUT, DELETE, OPTIONS");
res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
next();
});

//routes
const signup = require('./routes/signup'),
      login = require('./routes/login'),
      files = require('./routes/files'),
      users = require('./routes/users'),
      rights = require('./routes/rights'),
      news = require('./routes/news'),
      photos = require('./routes/photos');

//giving express access to routes
signup(app);
login(app);
files(app);
users(app);
rights(app);
news(app);
photos(app);

//start the server
app.listen(app.get('port'), function(){
    console.log('Express server () listening on localhost:' + app.get('port'));
});


