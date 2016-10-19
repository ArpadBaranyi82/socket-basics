var PORT = process.env.PORT || 3000;
var express = require("express");
var app = express();
var http = require("http").Server(app);
var io = require("socket.io")(http);
var moment = require("moment");

app.use(express.static(__dirname + '/public'));

io.on("connection", function(socket){
	socket.on("message", function(message){
		console.log("message received: " + message.text);
		
		// to everyone but sender....
		//socket.broadcast.emit("message", message); 
		
		// to everyone including sender...
		io.emit("message", message);	
	});
	
	socket.emit("message", {
		text: "Welcome to the chat application...",
		timestamp: moment().valueOf()
	});
});

http.listen(PORT, function(){
	console.log("Server started!");
});