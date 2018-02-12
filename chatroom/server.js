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


var server = app.listen(8000, function() {
    console.log("Chatroom listening on port 8000");
});

var io = require('socket.io').listen(server);

var all_users = [];
var all_messages = [];

function remove(array, element) {
    const index = array.indexOf(element);
    array.splice(index, 1);
}

io.sockets.on('connection', function (socket) {
    updated_data = {
        all_users : all_users,
        all_messages:all_messages
    }
    io.emit( 'server_response_refresh_user', updated_data);
    console.log("first all users =" + all_users)
    socket.on( "got_a_new_user", function (data){
        all_users.push(data.name);
        all_messages.push(data.message);
        updated_data = {
            all_users : all_users,
            all_messages:all_messages
        }
        console.log("second all users=" + all_users)
        io.emit( 'server_response_refresh_user', updated_data);
        console.log("updated data = " + updated_data.all_users + " " + updated_data.all_messages)
    })

    // socket.on("user_left",function (data){
    //     remove(all_users, data);
    //     console.log("updated users" + all_users)
    //     io.emit( 'server_response_refresh_user', all_users);
    // })
})