var socket = io();

socket.on("connect", function(){
	console.log("connected to socket io....");
});

socket.on("message", function(message){
	console.log("new message: " + message.text);
})