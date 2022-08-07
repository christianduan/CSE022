$(document).ready(function(){

	$.get("/complete_list", {}, function(response){
		let the_list = response['complete_list'];

		for (let i = 0; i < the_list.length; i++){
			let current = the_list[i];
			let first_name = current['first_name']
			let last_name = current['last_name']
			let address = current['address']
			let city = current['city']
			let state = current['state']
			let zip_code = current['zip_code']
			let phone_1 = current['phone_1']
			let phone_2 = current['phone_2']
			let email = current['email']

			let line = `<tr><td class = "white border">${first_name}</td><td class = "white border">${last_name}</td><td class = "white border">${address}</td><td class = "white border">${city}</td><td class = "white border">${state}</td><td class = "white border">${zip_code}</td><td class = "white border">${phone_1}</td><td class = "white border">${phone_2}</td><td class = "white border">${email}</td></tr>`;

			$("#tbody").append(line);
		}
	});

	$("#searchbox").keyup(function(){
		let q = $("#searchbox").val();

		$.get("/search", {'q': q}, function(response){
			$("#tbody").empty();

			let the_list = response['result'];
			for (let i = 0; i < the_list.length; i++){
				let current = the_list[i];
				let first_name = current['first_name']
				let last_name = current['last_name']
				let address = current['address']
				let city = current['city']
				let state = current['state']
				let zip_code = current['zip_code']
				let phone_1 = current['phone_1']
				let phone_2 = current['phone_2']
				let email = current['email']

				let line = `<tr><td class = "white addresspadding border">${first_name}</td><td class = "white addresspadding border">${last_name}</td><td class = "white addresspadding border">${address}</td><td class = "white addresspadding border">${city}</td><td class = "white addresspadding border">${state}</td><td class = "white addresspadding border">${zip_code}</td><td class = "white addresspadding border">${phone_1}</td><td class = "white addresspadding border">${phone_2}</td><td class = "white addresspadding border">${email}</td></tr>`;

				$("#tbody").append(line);
			}
		});
	});

	$("#new_contact_btn").click(function(){
		$("#abtable").addClass("hidden");
		$("#new_contact").addClass("hidden");
		$("#contact_form").removeClass("hidden");
		$("#cancel").removeClass("hidden");
	})

	$("#submit_btn").click(function(){
		let first_name = $("#first_name").val();
		let last_name = $("#last_name").val();
		let address = $("#address").val();
		let city = $("#city").val();
		let state = $("#state").val();
		let zip_code = $("#zip_code").val();
		let phone_1 = $("#phone_1").val();
		let phone_2 = $("#phone_2").val();
		let email = $("#email").val();

		first_name = first_name.replaceAll("<", "&lt");
		first_name = first_name.replaceAll(">", "&gt");
		last_name = last_name.replaceAll("<", "&lt");
		last_name = last_name.replaceAll(">", "&gt");
		address = address.replaceAll("<", "&lt");
		address = address.replaceAll(">", "&gt");
		city = city.replaceAll("<", "&lt");
		city = city.replaceAll(">", "&gt");
		state = state.replaceAll("<", "&lt");
		state = state.replaceAll(">", "&gt");
		zip_code = zip_code.replaceAll("<", "&lt");
		zip_code = zip_code.replaceAll(">", "&gt");
		phone_1 = phone_1.replaceAll("<", "&lt");
		phone_1 = phone_1.replaceAll(">", "&gt");
		phone_2 = phone_2.replaceAll("<", "&lt");
		phone_2 = phone_2.replaceAll(">", "&gt");
		email = email.replaceAll("<", "&lt");
		email = email.replaceAll(">", "&gt");


		$("#first_name").val("");
		$("#last_name").val("");
		$("#address").val("");
		$("#city").val("");
		$("#state").val("");
		$("#zip_code").val("");
		$("#phone_1").val("");
		$("#phone_2").val("");
		$("#email").val("");

		$.get("/newcontact", {"first_name": first_name, "last_name": last_name, "address": address, "city": city, "state": state, "zip_code": zip_code, "phone_1": phone_1, "phone_2": phone_2, "email": email}, function(response){
			if (response == "yes"){
				$("#contact_form").addClass("hidden");
				$("#new_contact").removeClass("hidden");
				$("#abtable").removeClass("hidden");
				$("#tbody").empty();

				$.get("/complete_list", {}, function(response){
					let the_list = response['complete_list'];

					for (let i = 0; i < the_list.length; i++){
						let current = the_list[i];
						let first_name = current['first_name']
						let last_name = current['last_name']
						let address = current['address']
						let city = current['city']
						let state = current['state']
						let zip_code = current['zip_code']
						let phone_1 = current['phone_1']
						let phone_2 = current['phone_2']
						let email = current['email']

						let line = `<tr><td class = "white border">${first_name}</td><td class = "white border">${last_name}</td><td class = "white border">${address}</td><td class = "white border">${city}</td><td class = "white border">${state}</td><td class = "white border">${zip_code}</td><td class = "white border">${phone_1}</td><td class = "white border">${phone_2}</td><td class = "white border">${email}</td></tr>`;

						$("#tbody").append(line);
					}
				});
			}
			else{
				alert("Was not received.")
			}
		});
	})

	$("#cancel_btn").click(function(){
		$("#contact_form").addClass("hidden");
		$("#new_contact").removeClass("hidden");
		$("#abtable").removeClass("hidden");
	})

	$("#login_btn").click(function(){
		let username = $("#username").val();
		let password = $("#password").val();

		$.get("/verify", {"username": username, "password": password}, function(response){
			if (response == "Correct"){
				$("#login_box").addClass("hidden");
				$("#signup_box").addClass("hidden");
				$("#abtable").removeClass("hidden");
				$("#searchbar").removeClass("hidden");
				$("#new_contact").removeClass("hidden");
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