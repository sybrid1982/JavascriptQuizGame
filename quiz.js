////////////////////////////////
// CODING CHALLENGE

/*************
1)  Function constructor called Question to describe a question.  A question should include:
a)  question itself
b)  the answers from which the player can choose the correct one (choose adequate data structure for this)
c)  Correct answer (I would use a number for this)
DONE

2)  Create a couple of questions using the Constructor

3)  Store them all inside an array

4)  Select one random question and log it on the console, together with the possible answers (each
question should have a number) (hint: write a method for the question objects for this task).

5)  Use the prompt function to ask the user for the correct answer.  The user should input a number
for the correct answer as displayed by task 4.
DONE

6)  Check if the answer is correct and print to the console whether it was correct or not.
DONE

7)  Suppose this code would be a plugin for other programmers to use in their code.  Make sure your code is private
and doesn't interfere with other programmers' code.

*/

/////////////////////////////
// Question Prototype Setup
//
function SetupQuestionPrototype(){
  var Question = function(question, answers, correctAnswer) {
    this.question = question;
    this.answers = answers;
    this.correctAnswer = correctAnswer;
  }

  Question.prototype.checkAnswer = function(answerNumber) {
    if(questionUnanswered === true){
      if(answerNumber == this.correctAnswer) {
        console.log("That is correct!");
      } else {
        console.log("That is unfortunately incorrect.  The correct answer was " + this.correctAnswer + ' and you chose ' + answerNumber + '.');
      }
      // Once an answer has been picked, we should disable the ability to try other answers
      questionUnanswered = false;
    }
  }

  Question.prototype.displayQuestion = function(){
    var questionDisplayArea = document.querySelector('#Question');
    questionDisplayArea.textContent = (this.question);
    for(var i = 0; i < this.answers.length; i++) {
      console.log((i + 1) + ') ' + this.answers[i]);
    }
  }

/***************************
* While this worked for a console.log-based version of the game, it's hot garbage for an HTML version
* if only because the prompt call appears to block the page from being refreshed, which means you'd
* never see the question displayed without some sort of workaround

* A button based interface is better, anyways

Question.prototype.promptForAnswer = function(){
  var answer
  do {
      answer = prompt('Please enter the number for your answer');
  }
  while (isNaN(answer) === true)
  return answer;
}*/

/************************
* This replaces the old 'promptForAnswer' function with one that
* will grab the buttons, put the text for the answers in the buttons,
* and then put the question's check answer function on all five buttons
*/
  Question.prototype.displayAnswers = function(){
    console.log('DisplayAnswers called');
    var answerForm = document.getElementById('Answers');
    for(var index = 0; index < this.answers.length; index++) {
      var indexShiftedByOne = index + 1;
      var button = document.createElement('button');
      button.innerHTML = this.answers[index];
      var answerFunction = Question.prototype.checkAnswer.bind(this, indexShiftedByOne);
      button.onclick = answerFunction;
      button.setAttribute('class', 'button');
      button.setAttribute('id', 'answer-' + indexShiftedByOne)
      answerForm.appendChild(button);
    }
  }

  Question.prototype.askQuestion = function() {
    this.displayQuestion();
    this.displayAnswers();
  }

  return Question;
}
//////////////////////////////////
// Question Creation
//
function CreateQuestions(){
  var Question = SetupQuestionPrototype();

  var saberAdvantage = new Question(
    'Which of these classes does the Saber class have advantage over?',
    ['Archer', 'Rider', 'Caster', 'Lancer', 'Assassin'],
    4
  );

  var artoriaClasses = new Question(
    'Which of these classes does not have a version of Artoria/Altria?',
    ['Archer', 'Rider', 'Caster', 'Assassin', 'Berserker'],
    3
  );

  var lancerAdvantage = new Question(
    'Which of these classes does the Lancer class have advantage over?',
    ['Archer', 'Lancer', 'Caster', 'Assassin', 'Rider'],
    1
  );

  var archerAdvantage = new Question(
    'Which of these classes does the Archer class have advantage over?',
    ['Lancer', 'Saber', 'Caster', 'Assassin', 'Rider'],
    2
  );

  var assassinAdvantage = new Question(
    'Which of these classes does the Assassin class have advantage over?',
    ['Saber', 'Lancer', 'Caster', 'Archer', 'Rider'],
    5
  );

  var riderAdvantage = new Question(
    'Which of these classes does the Rider class have advantage over?',
    ['Saber', 'Lancer', 'Caster', 'Assassin', 'Berserker'],
    3
  );

  var casterAdvantage = new Question(
    'Which of these classes does the Caster class have advantage over?',
    ['Saber', 'Lancer', 'Archer', 'Assassin', 'Berserker'],
    4
  );

  return questionArr = [saberAdvantage, artoriaClasses, archerAdvantage, lancerAdvantage, riderAdvantage, casterAdvantage, assassinAdvantage];
}
//////////////////////////////
// Function to get Question
//

var questionUnanswered = false;

function getQuestion(){
  // Before we get started, there may already be a question up
  // If there is, we need to clear the answers for that question
  var answerForm = document.getElementById('Answers');
  questionUnanswered = true;
  if(answerForm.childElementCount > 0){
    for(var index = answerForm.childElementCount; index > 0; index--){
      var buttonToRemove = document.getElementById('answer-' + index);
      answerForm.removeChild(buttonToRemove);
    }
  }

  // Probably shouldn't be doing ALL the set up every time
  // but so far we are
  var questionArr = CreateQuestions();
  var questionToAsk = Math.random() * questionArr.length;
  questionToAsk = Math.floor(questionToAsk);
  questionArr[questionToAsk].askQuestion();
}
