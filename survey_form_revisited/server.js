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

    res.render("index");

})

// app.post('/result', function(req, res) {

//     res.render("result", {data: req.body});
// })

var server = app.listen(8000, function() {
    console.log("Survey form revisited listening on port 8000");
});

var io = require('socket.io').listen(server);

io.sockets.on('connection', function (socket) {
    console.log("client/socket is connected!")
    socket.on( "submit_form", function (data){
        console.log( data);
        newobj = {
            name : data.name,
            location : data.location,
            language : data.language,
            comment : data.comment,
            number: Math.floor(Math.random()*1001)
        }
        socket.emit( 'server_response', newobj);
    })
    
  })
