/////////////////////////////
// Question Prototype Setup
//

var questionController = (function() {
  var Question = function(question, answers, correctAnswer) {
    this.question = question;
    this.answers = answers;
    this.correctAnswer = correctAnswer;
  }

  Question.prototype.checkAnswer = function(answerNumber) {
    if(questionUnanswered === true){
      if(answerNumber == this.correctAnswer) {
        return true;
      } else {
        return false;
      }
    }
  }

  var questions = [];

  return {
    createQuestion: function(question, answers, correctAnswer) {
      var question = new Question(question, answers, correctAnswer);
      questions.push(question);
    },
    getQuestion: function() {
      if(questions.length > 0) {
        var questionToAsk = Math.random() * questions.length;
        questionToAsk = Math.floor(questionToAsk);
        return (questions[questionToAsk]());
      } else {
        return -1;
      }
    }
  };
}();

var uiController = (function() {
  // UI STUFF SHOULD GO HERE
  displayAnswers = function(answers){
    var answerForm = document.getElementById('Answers');
    for(var index = 0; index < answers.length; index++) {
      var indexShiftedByOne = index + 1;
      var button = document.createElement('button');
      button.innerHTML = answers[index];
      button.setAttribute('class', 'button');
      button.setAttribute('id', 'answer-' + indexShiftedByOne)
      answerForm.appendChild(button);
    }
  }

  displayQuestion(question) = function(){
    var questionDisplayArea = document.querySelector('#Question');
    questionDisplayArea.textContent = (question);
  }

  var clearAnswers = function(){
    var answerForm = document.getElementById('Answers');

    if(answerForm.childElementCount > 0){
      for(var index = answerForm.childElementCount; index > 0; index--){
        var buttonToRemove = document.getElementById('answer-' + index);
        answerForm.removeChild(buttonToRemove);
      }
    }
  }

  return {
    clearAnswers: clearAnswers(),
    displayAnswers: displayAnswers(answers),
    displayQuestion: displayQuestion(question)
  };
});

var appController = (function(questionCtrl, UICtrl) {
  var questionUnanswered = false;
  var correctScore = 0;
  var wrongScore = 0;

  function correctAnswer(){
    correctScore++;
    document.getElementById('Correct').textContent = correctScore;
  }

  function wrongAnswer() {
    wrongScore++;
    document.getElementById('Wrong').textContent = wrongScore;
  }

  var getQuestion = function(){
    questionUnanswered = true;
    // Before we get started, there may already be a question up
    // If there is, we need to clear the answers for that question
    UICtrl.clearAnswers();
    // Now get the question
    var question = questionCtrl.getQuestion();
    // Display the question text
    UICtrl.displayQuestion(question.question);
    // Do we need to first make functions here for the answers to then pass
    // to displayAnswers?  Or can we create the buttons in displayAnswers
    // then iterate over the presumed children that should be made and set
    // the callbacks here?
    // Display the answers
    UICtrl.displayAnswers(question.answers);

    var correctAnswer = question.correctAnswer;
  }

  var evaluateAnswer = function(answerIndex, correctAnswer) {
    if(answerIndex === correctAnswer) {
      correctAnswer();
    } else {
      wrongAnswer();
    }
  }

  var generateCallbacks(answers, correctAnswer) {
    for(var index = 0; index < answers.length; index++) {
      var indexShiftedByOne = index + 1;
      var answerFunction = evaluateAnswer.bind(null, indexShiftedByOne, correctAnswer);
      document.getElementById('answer-' + indexShiftedByOne).onclick = answerFunction;
    }
  }

  var generateQuestions = function() {
    questionCtrl.createQuestion(
      'Which of these classes does the Saber class have advantage over?',
      ['Archer', 'Rider', 'Caster', 'Lancer', 'Assassin'],
      4
    );

    questionCtrl.createQuestion(
      'Which of these classes does not have a version of Artoria/Altria?',
      ['Archer', 'Rider', 'Caster', 'Assassin', 'Berserker'],
      3
    );

    questionCtrl.createQuestion(
      'Which of these classes does the Lancer class have advantage over?',
      ['Archer', 'Lancer', 'Caster', 'Assassin', 'Rider'],
      1
    );

    questionCtrl.createQuestion(
      'Which of these classes does the Archer class have advantage over?',
      ['Lancer', 'Saber', 'Caster', 'Assassin', 'Rider'],
      2
    );

    questionCtrl.createQuestion(
      'Which of these classes does the Assassin class have advantage over?',
      ['Saber', 'Lancer', 'Caster', 'Archer', 'Rider'],
      5
    );

    questionCtrl.createQuestion(
      'Which of these classes does the Rider class have advantage over?',
      ['Saber', 'Lancer', 'Caster', 'Assassin', 'Berserker'],
      3
    );

    questionCtrl.createQuestion(
      'Which of these classes does the Caster class have advantage over?',
      ['Saber', 'Lancer', 'Archer', 'Assassin', 'Berserker'],
      4
    );
  }

  return {
    getQuestion: getQuestion(),
    generateQuestions: generateQuestions()
  }
})(questionController, UIController);
