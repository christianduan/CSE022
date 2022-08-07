$(document).ready(function(){

	$("#submit_btn").click(function(){
		let name = $("#name").val();
		let message = $("#message").val();
		
		$.get('/savecomment', {"name": name, "message": message}, function(response){
			$.get('/getcomments', {}, function(response){
				let comments = response['comments']

				for (let i = 0; i < comments.length; i++){
					let name = comments[i]['name']
					let message = comments[i]['message']

					message = message.replaceAll("<", "&lt");
					message = message.replaceAll(">", "&gt");

					$("#comments_section").prepend(`<b>${name}</b><br>${message}<br><br>`)
				}
			});
		})
	});

	$("#login_btn").click(function(){
		let username = $("#username").val();
		let password = $("#password").val();

		$.get("/verify", {"username": username, "password": password}, function(response){
			if (response == "Correct"){
				$("#login_box").addClass("hidden");
				$("#signup_box").addClass("hidden");
				$("#secret_image").removeClass("hidden");
			}
			else if (response == "Incorrect"){
				alert("Username or password does not match.")
			}
		});
	});

	$("#signup_btn").click(function(){
		let username = $("#new_username").val();
		let password = $("#new_password").val();

		$.get("/accounts", {username: username, password: password}, function(response){
			if (response == "Correct"){
				alert('Account has been created. Please log in.')
			}
			else if (response == "Incorrect"){
				alert("Username already exists. Please choose another one.")
			}
		});
	});
});