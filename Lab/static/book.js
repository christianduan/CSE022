$(document).ready(function(){

	$.get('/getbook', {}, function(response){
		$("#bookText").html(response);
	})

	$.get("/bookinfo", {}, function(response){
    	$("#words").text(`Number of words: ${response.stats.wordCount}`);
    	$("#longest-word").text(`Longest word: ${response.stats.longestWord}`);
    	$("#shortest-word").text(`Shortest word: ${response.stats.shortestWord}`);

		const frequentWords = response.stats.mostFrequentWords;
    	for (i = 0; i < frequentWords.length; i++) {
    		$("#mostFrequentWordsList").append(`<li>${frequentWords[i]}</li>`);
    	}
	})
});