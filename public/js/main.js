var socket = io();

socket.on("connect", function(){
	console.log("connected to socket io....");
});

socket.on("message", function(message){
	console.log("new message: " + message.text);
});

$(document).ready(function(){
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