var socket = io();

$(document).ready(function(){
	
socket.on("connect", function(){
	console.log("connected to socket io....");
});

socket.on("message", function(message){
	var momentTimestamp = moment.utc(message.timestamp);
	console.log("new message: " + message.text);
	
	$(".messages").append("<p><strong>" + momentTimestamp.local().format("h:mm a") + ": </strong>" +  message.text + "</p>");
});


	var $form = $("#message-form");
	$form.on("submit", function(event){
		event.preventDefault();
		
		var $message = $form.find("input[name=message]");
		
		socket.emit("message", {
			text: $message.val()
		});
		
		$message.val("");
	});
})