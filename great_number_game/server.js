var express = require("express");
// var bodyParser = require('body-parser');
// var session = require('express-session');

var app = express();
// var path = require("path");


// app.use(session({secret: 'codingdojorocks'}));
// app.use(bodyParser.urlencoded({ extended: true }));
// app.use(express.static(path.join(__dirname, "./static")));

// app.set('views', path.join(__dirname, './views'));
// app.set('view engine', 'ejs');

// app.get('/', function(req, res) {

//     res.render("index");

// })

app.listen(8000, function() {
    console.log("Survey form listening on port 8000");
});