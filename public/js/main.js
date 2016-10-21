var name = getQueryVariable("name") || "Anonymous";
var room = getQueryVariable("room");
var socket = io();

console.log(name + " wants to join " + room);

socket.on("connect", function(){
	console.log("connected to socket io....");
	
	socket.emit("joinRoom", {
		name: name,
		room: room
	});
});

$(document).ready(function(){
	
	$(".room-title").text(room);
	
socket.on("message", function(message){
	var momentTimestamp = moment.utc(message.timestamp);
	var $messages = $(".messages");
	var $message = $("<li class='list-group-item'></li>");
	
	console.log("new message: " + message.text);
	
	$message.append("<p><strong>" + message.name + " " + momentTimestamp.local().format("h:mm a") + "</strong></p>");
	$message.append("<p>" + message.text + "</p>");
	$messages.append($message);
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