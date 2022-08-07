let wrongAttempts = 0;
let wordIndex = 0;
let wrongGuess = "";
let correct = 0;
let wordLength = 0;

$(document).ready(function(){
	
	$("#letter_box").keypress(function(){
		let value = $("#letter_box").val();
		if (value.length > 0){
			$("#letter_box").val("");
		}
	});

	$.get("/getword", {}, function(response){
		wordLength = response['length']
		wordIndex = response['position']
		for (let i=0; i < wordLength; i++){
			$("#jtron").append(`<span id="letter${i}" class="spaceside">_</span>`);
		}
	});

	$("#check_btn").click(function(){
		let guess = $("#letter_box").val().toUpperCase()
		console.log("working")
		$.get('/check_attempt', {'letter': guess, 'index': wordIndex}, function(response){
			let positions = response['positionsReturn']
			let letter = response['letterReturn']
			
			if(positions[0] === undefined){

				wrongAttempts++
				$("#wrongs").append("<span class = 'wrongs'>" + letter + ", " + "</span>")
			}

			if (wrongAttempts == 1){
				$("#head").removeClass("hidden");
			}
			else if (wrongAttempts == 2){
				$("#body").removeClass("hidden");
			}
			else if (wrongAttempts == 3){
				$("#left-arm").removeClass("hidden");
			}
			else if (wrongAttempts == 4){
				$("#right-arm").removeClass("hidden");
			}
			else if (wrongAttempts == 5){
				$("#left-leg").removeClass("hidden");
			}
			else if (wrongAttempts == 6){
				$("#right-leg").removeClass("hidden");
			alert("You Lost. Game Over. Refresh the page to try again.")
			}

			for (let i=0; i < positions.length; i++){
				let item = '#letter' + positions[i];
				$("#letter" + positions[i]).html(letter);
				correct++
				if(correct >= wordLength){
					alert("You Won")
				}
			}
		})
	});
});