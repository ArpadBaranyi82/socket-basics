var name = getQueryVariable("name") || "Anonymous";
var room = getQueryVariable("room");
var socket = io();

console.log(name + " wants to join " + room);

socket.on("connect", function(){
	console.log("connected to socket io....");
});

$(document).ready(function(){
	
socket.on("message", function(message){
	var momentTimestamp = moment.utc(message.timestamp);
	var $message = $(".messages");
	console.log("new message: " + message.text);
	
	$message.append("<p><strong>" + message.name + " " + momentTimestamp.local().format("h:mm a") + "</strong></p>");
	$message.append("<p>" + message.text + "</p>");
	});


	var $form = $("#message-form");
	$form.on("submit", function(event){
		event.preventDefault();
		
		var $message = $form.find("input[name=message]");
		
		socket.emit("message", {
			name: name,
			text: $message.val()
		});
		
		$message.val("");
	});
})