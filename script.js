$(document).ready(function () {

    // Questions and answers

    var questions = [
        "What highschool does Buffy Summers attend?",
        "Who is the main love interest of Leslie Knope?",
        "You've disappointed chef Ramsay, what does he call you?",
        "In the series Friends who has the most divorces?",
        "Who is the 10th Doctor in Doctor Who?",
        "Who is the male judge in Great British Bake Off?"
    ];
    var choices = [
        { set: ["North Shore High", "Rushmore Academy", "Sunnydale High", "Dunwoody High"] },
        { set: ["Ben", "Donna", "Ron", "Chris"] },
        { set: ["Silly", "Idiot Sandwich", "Frazzled", "Ignorant"] },
        { set: ["Phoebee", "Rachel", "Monica", "Ross"] },
        { set: ["David Tennant", "Matt Smith", "Peter Capaldi", "Tom Riddle"] },
        { set: ["Paul Hollywood", "Neil Patrick Harris ", "Simon Cowell", "Chris Pratt"] }
    ];

    var correctAnswer = [
        "Sunnydale High",
        "Ben",
        "Idiot Sandwich",
        "Ross",
        "David Tennant",
        "Paul Hollywood"
    ];


    var display = $("#display");
    var feedback = $("#feedback");
    var cardText = $(".card-text");

    var x = 0;
    var y = 0;
    var currentScore = 0;
    var gameEnd;

    var highScores = [
        // {initials: []},
        // {scores: []}
    ];


    // Timer

    var timeLeft = 75;
    var timer = $("#timer");
    timer.text(timeLeft);

    function countdown() {
        var countdownTimer = setInterval(function () {
            if (!gameEnd) {
                timeLeft--;
                timer.text(timeLeft);
            } else {
                clearInterval(countdownTimer);
            };
            if (timeLeft <= 0) {
                clearInterval(countdownTimer);
                renderFinalScene();
            }
        }, 1000);
    };

    // start quiz and load questions

    $(".start-btn").on("click", function () {
        gameEnd = false;
        $("#image").empty();
        nextQuestion();
        countdown();
    });

    function renderQuestions(question) {
        display.empty();

        cardText.text(question);
        display.append("<br>");
        display.append("<hr>");
        x++;
    };

    function buttonGenerator(answer) {
        for (i = 0; i < answer.length; i++) {
            var btn = $("<button>").addClass("btn btn-dark btn-lg btn-block answer-button");
            btn.text(answer[i]);

            display.append(btn);
        }
        buttonLogic(correctAnswer[y]);
        y++;
    };

    // correct and incorrect answers logic

    function buttonLogic(correct) {
        $(".answer-button").on("click", function () {
            console.log(this.innerHTML);
            feedback.stop();
            feedback.css({ opacity: "1" });

            if (this.innerHTML === correct) {

                currentScore += 10;
                feedback.append("<hr>");
                feedback.append("<h3>").text("correct!");
                feedback.append("<br><iframe src='https://giphy.com/embed/E99OMc6pkdvGw' width='350' height='auto' frameBorder='0' ></iframe>");

                feedback.animate({ opacity: "0.00" }, 5000);

                nextQuestion()
            } else {
                timeLeft -= 10;
                timer.text(timeLeft)
                feedback.prepend("<hr> <h3>").text("wrong!");
                feedback.append("<br><iframe src= 'https://giphy.com/embed/l4pLY0zySvluEvr0c' width='350' height='auto' frameBorder='0' ></iframe>");
                nextQuestion();
                feedback.animate({ opacity: "0.00" }, 5000);

            }
        });
    };

    // final screen

    function nextQuestion() {
        if (x >= questions.length) {
            currentScore += timeLeft;
            renderFinalScene();

        } else {
            renderQuestions(questions[x]);
            buttonGenerator(choices[y].set);
        }
        console.log(currentScore);
    };

    function renderFinalScene() {
        gameEnd = true;
        display.empty();
        timer.empty();
        cardText.text("You Scored: " + currentScore + " points!");
        display.append("<form>").attr("id", "high-score-input");

        var form = $("#high-score-input");
        form.append("<input type='text' id='initials' pattern='[A-Z]{3}' onkeyup='this.value = this.value.toUpperCase();'>");
        form.append("<input type='submit' id='submit-btn'>");
        submitHighScore();

    };

// submit score

    function submitHighScore() {
        $("#submit-btn").on("click", function () {
            var currentInitials = $("#initials").val();
            console.log(currentInitials);


            if (currentInitials.length > 3 || currentInitials.length === 0) {

                alert("You must enter up to 3 letters");
                return;
            } else {

                var items = {};
                items.initials = currentInitials;
                items.score = currentScore;

                highScores.push(items);

                console.log(highScores);
                storeHigScores();
                var inputSpace = $("#high-score-input");
                inputSpace.empty();
                inputSpace.append("<h5>thank you!")
                inputSpace.append("<a href='index.html' class='btn btn-primary  '>Try again</a></button>");
            }
        });

    };

    // high scores page

    function storeHigScores() {
        localStorage.setItem("highScores", JSON.stringify(highScores));
    };


    function renderHighScores() {
        var storedHigScores = JSON.parse(localStorage.getItem("highScores"));
        var num = 1;
        if (storedHigScores !== null) {

            highScores = storedHigScores;
            for (i = 0; i < highScores.length; i++) {
                var newRow = $("<tr>");
                newRow.append($("<td>").text([num]));
                newRow.append($("<td>").text(highScores[i].initials));
                newRow.append($("<td>").text(highScores[i].score));
                $("tbody").append(newRow);
                num++;
            };
        };
    };

    renderHighScores();
    console.log(highScores);
});
