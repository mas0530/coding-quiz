var $start = document.getElementById("start");
var $timer = document.getElementById("countdown");
var $question = document.getElementById("question");
var $answers = document.getElementById("answers");
var $save = document.getElementById("name");
var $answerIndicator = document.getElementById("indicator");
var $submit = document.getElementById("submit");
var $questionIndex = 0;
var $time = 100;
var $timeInterval;

var $questionArray = [ {

    question: "What sign is our dear Queen?",
    options: ["Sagittarius", "Pisces", "Gemini", "Virgo"],
    answer: "Sagittarius"

    }, {

    question: "Where is the QUEEN from?",
    options: ["Brooklyn", "Bronx", "Manhattan", "QUEENS"],
    answer: "QUEENS"

    }, {

    question: "Which one of these is NOT a persona of the QUEEN herself?",
    options: ["CHUN-LI", "ROMAN", "DONNIE"],
    answer: "DONNIE"

    }, {

    question: "Where was the QUEEN born?",
    options: ["Queens", "Trinidad"],
    answer: "Trinidad"

    }, {

    question: "Who was smart enough to sign the QUEEN on?",
    options: ["Kanye", "Jay-Z", "Lil Wayne", "Dr. Dre"],
    answer: "Lil Wayne"

    }, {

    question: "What is the Queen's best album?",
    options: ["The Pink Print", "QUEEN", "Pink Friday", "Beam Me Up Scotty"],
    answer: "Pink Friday"

    }
];

// Establish function that initiates the quiz upon clicking on the start button
// In addition to initiating the quiz, the start button will also begin the countdown timer
// Ensure that questions are populated via separate function
function initializeQuiz() {
    var $initialize = document.getElementById("home-page");

    $initialize.setAttribute("class", "hidden");
    $question.setAttribute("class", " ");
    $timeInterval = setInterval(function(){
    countDown();
    }, 1000);
    $timer.textContent = $time;

    populateQuestion();
}

function countDown() {
    $time--;
    $timer.textContent = $time;

    if ($time <= 0){
        quizEnd();
    }
}

function populateQuestion() {
    var $activeQuestion = $questionArray[$questionIndex];

    $question.children[0].textContent = $activeQuestion.question;
    while ($answers.hasChildNodes()){
        $answers.removeChild($answers.lastChild);
    }
    for (var i = 0; i < $activeQuestion.options.length; i++){
        var $optionButton = document.createElement("button");

        $optionButton.textContent = $activeQuestion.options[i];    
        $answers.appendChild($optionButton);
    }    
    $answers.children[0].addEventListener("click", function(event){
    questionClick($answers.children[0]);
    });
    $answers.children[1].addEventListener("click", function(event){
    questionClick($answers.children[1]);
    });
    $answers.children[2].addEventListener("click", function(event){
    questionClick($answers.children[2]);
    });
    $answers.children[3].addEventListener("click", function(event){
    questionClick($answers.children[3]);
    });
}

function questionClick(answerChoice) {
    if (answerChoice.textContent != $questionArray[$questionIndex].answer){
        $time -= 10;
        $answerIndicator.textContent = "Incorrect";
    } else {
        $answerIndicator.textContent = "Correct";
    }
        $answerIndicator.setAttribute("class", "indicator");
        setInterval(function(){
        $answerIndicator.setAttribute("class", "hidden");
    }, 1000);

    $questionIndex++;
    if ($questionIndex === $questionArray.length) {
        quizEnd();
    } else {
        populateQuestion();
    }
}

function quizEnd() {
    clearInterval($timeInterval);
    $timer.textContent = $time;

    var $finale = document.getElementById("finale");
    $finale.setAttribute("class", " ");

    var $scorePage = document.getElementById("score-page");
    $scorePage.textContent = $time;

    $question.setAttribute("class", "hidden");
}

function saveHighscore() {
    var $name = $save.value.toUpperCase();
    if ($name === ""){ 
        alert("Input mustn't be blank'");
    
    return;
    } else {
        var $scoreTotals;
    if (JSON.parse(localStorage.getItem("score-count")) != null)
        $scoreTotals = JSON.parse(window.localStorage.getItem("score-count"));
    else
        $scoreTotals = [];
        
        var $scoreSave = {
        initials: $name,
        score: $time
    };
    $scoreTotals.push($scoreSave);
    localStorage.setItem("score-count", JSON.stringify($scoreTotals));
    location.href = "assets/highscores/highscores.html";
    }
}

$submit.addEventListener("click", saveHighscore);
$start.addEventListener("click", initializeQuiz);