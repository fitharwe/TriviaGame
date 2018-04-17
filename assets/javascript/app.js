var triviaQuestions = [{
	question: "Who is Boromir's brother?",
	answerList: ["Frodo", "Faramir", "Glorfindel", "Denethor"],
	answer: 1
},{
	question: "How old was Aragorn during the Fellowship of the Ring?",
	answerList: ["87", "111", "45", "312"],
	answer: 0
},{
	question: "What race is Sméagol?",
	answerList: ["Dwarf", "Ent", "Hobbit", "Elf"],
	answer: 2
},{
	question: "In the books, who actually brought Frodo safely to Rivendell?",
	answerList: ["Glorfindel", "Elrond", "Haldir", "Gandalf"],
	answer: 0
},{
	question: "Who is Elrond's mother-in-law?",
	answerList: ["Arwen", "Eowyn", "Elwing", "Galadriel"],
	answer: 3
},{
	question: "What is the name of Gandalf's horse?",
	answerList: ["Shadowfax", "Asfaloth", "Brego", "Bill"],
	answer: 0
},{
	question: "From where does Legolas hail?",
	answerList: ["Rivendell", "Mirkwood", "Lothlorien", "Celondim"],
	answer: 1
},{
	question: "Where were the movies filmed?",
	answerList: ["Ireland", "England", "New Zealand", "Canada"],
	answer: 2
},{
	question: "What is the name of the sword that Bilbo gives to Frodo?",
	answerList: ["Andúril", "Sting", "Glamdring", "Orcrist"],
	answer: 1
},{
	question: "Who defeats the witch-king of Angmar?",
	answerList: ["Éomer", "Théoden", "Gandalf", "Éowyn"],
	answer: 3
}];

var gifArray = ['question1', 'question2', 'question3', 'question4', 'question5', 'question6', 'question7', 'question8', 'question9', 'question10'];
var activeQuestion; var correctAnswer; var incorrectAnswer; var unanswered; var seconds; var time; var answered; var userSelect;
var messages = {
	correct: "Correct!",
	incorrect: "That's incorrect.",
	endTime: "Time's up!",
	finished: "Let's see your score!"
}

$('#startbutton').on('click', function(){
	$(this).hide();
	newGame();
});

$('#startOverBtn').on('click', function(){
	$(this).hide();
	newGame();
});

function newGame(){
	$('#finalMessage').empty();
	$('#correctAnswers').empty();
	$('#incorrectAnswers').empty();
	$('#unanswered').empty();
	activeQuestion = 0;
	correctAnswer = 0;
	incorrectAnswer = 0;
	unanswered = 0;
	newQuestion();
}

function newQuestion(){
	$('#message').empty();
	$('#correctedAnswer').empty();
	$('#gif').empty();
	answered = true;
	
	
	$('#activeQuestion').html('Question #'+(activeQuestion+1)+'/'+triviaQuestions.length);
	$('.question').html('<h2>' + triviaQuestions[activeQuestion].question + '</h2>');
	for(var i = 0; i < 4; i++){
		var choices = $('<div>');
		choices.text(triviaQuestions[activeQuestion].answerList[i]);
		choices.attr({'data-index': i });
		choices.addClass('thisChoice');
		$('.answerList').append(choices);
	}
	countdown();

	$('.thisChoice').on('click',function(){
		userSelect = $(this).data('index');
		clearInterval(time);
		answerPage();
	});
}

function countdown(){
	seconds = 15;
	$('#timeLeft').html('<h3>Time Remaining: ' + seconds + '</h3>');
	answered = true;
	time = setInterval(showCountdown, 1000);
}

function showCountdown(){
	seconds--;
	$('#timeLeft').html('<h3>Time Remaining: ' + seconds + '</h3>');
	if(seconds < 1){
		clearInterval(time);
		answered = false;
		answerPage();
	}
}

function answerPage(){
	$('#activeQuestion').empty();
	$('.thisChoice').empty(); 
	$('.question').empty();

	var rightAnswerText = triviaQuestions[activeQuestion].answerList[triviaQuestions[activeQuestion].answer];
	var rightAnswerIndex = triviaQuestions[activeQuestion].answer;
	$('#gif').html('<img src = "assets/images/'+ gifArray[activeQuestion] +'.gif" width = "400px">');

	if((userSelect == rightAnswerIndex) && (answered == true)){
		correctAnswer++;
		$('#message').html(messages.correct);
	} else if((userSelect != rightAnswerIndex) && (answered == true)){
		incorrectAnswer++;
		$('#message').html(messages.incorrect);
		$('#correctedAnswer').html('The correct answer was: ' + rightAnswerText);
	} else{
		unanswered++;
		$('#message').html(messages.endTime);
		$('#correctedAnswer').html('The correct answer was: ' + rightAnswerText);
		answered = true;
	}
	
	if(activeQuestion == (triviaQuestions.length-1)){
		setTimeout(scoreboard, 5000)
	} else{
		activeQuestion++;
		setTimeout(newQuestion, 5000);
	}	
}

function scoreboard(){
	$('#timeLeft').empty();
	$('#message').empty();
	$('#correctedAnswer').empty();
	$('#gif').empty();

	$('#finalMessage').html(messages.finished);
	$('#correctAnswers').html("Correct Answers: " + correctAnswer);
	$('#incorrectAnswers').html("Incorrect Answers: " + incorrectAnswer);
	$('#unanswered').html("Unanswered: " + unanswered);
	$('#startOverBtn').addClass('reset');
	$('#startOverBtn').show();
	$('#startOverBtn').html('Start Over?');
}