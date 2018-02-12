// require express
var express = require("express");
// path module -- try to figure out where and why we use this
var path = require("path");

var session = require('express-session');
// create the express app
var app = express();

app.use(session({secret: 'codingdojorocks'}));

var bodyParser = require('body-parser');
// use it!
app.use(bodyParser.urlencoded({ extended: true }));
// static content
app.use(express.static(path.join(__dirname, "./static")));
// setting up ejs and our views folder
app.set('views', path.join(__dirname, './views'));
app.set('view engine', 'ejs');
// root route to render the index.ejs view
app.get('/', function(req, res) {
    if (typeof req.session.counter !== 'undefined' ){
        req.session.counter++;
    } else{
        req.session.counter = 0;
        console.log(req.session.counter)
    }
    res.render("index",{a:req.session.counter});
})
// post route for adding a user
app.get('/level1', function(req, res) {
    req.session.counter += 1;
    console.log (req.session.counter)
    res.redirect('/');
})

app.get('/reset', function(req, res) {
    // req.session.destroy();
    req.session.counter = 0 
    res.redirect('/');
})
// tell the express app to listen on port 8000
app.listen(8000, function() {
    console.log("Counter listening on port 8000");
});
