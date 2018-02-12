var express = require("express");
var bodyParser = require('body-parser');
var session = require('express-session');
var path = require("path");

var app = express();

app.use(session({secret: 'codingdojorocks'}));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, "./static")));

app.set('views', path.join(__dirname, './views'));
app.set('view engine', 'ejs');

app.get('/', function(req, res) {

    res.render("index",{count:0});

})


var server = app.listen(8000, function() {
    console.log("Epic button game listening on port 8000");
});

var io = require('socket.io').listen(server);


io.sockets.on('connection', function (socket) {
    socket.on( "epic_button_clicked", function (count){
        count = parseInt(count) +1;
        socket.emit( 'server_response', count);
    })
    socket.on( "reset_button_clicked", function (count){
        count = parseInt(count);
        count = 0
        socket.emit( 'server_response_reset', count);
    })
    
  })