

// Create a canvas element and get its context
// The canvas element is where we draw the graphics of the game
// The context is an object that allows us to manipulate the canvas
var canvas = document.getElementById("canvas");
var ctx = canvas.getContext("2d");

// Define some constants and variables
// These are values that we use throughout the game logic
var carWidth = 50; // The width of a car image in pixels
var carHeight = 100; // The height of a car image in pixels
var roadWidth = 300; // The width of the road in pixels
var roadHeight = canvas.height; // The height of the road, equal to the canvas height
var roadX = (canvas.width - roadWidth) / 2; // The x-coordinate of the left edge of the road
var roadY = 0; // The y-coordinate of the top edge of the road
var playerCarX = roadX + roadWidth / 4 - carWidth / 2; // The initial x-coordinate of the player's car
var playerCarY = roadHeight - carHeight - 10; // The initial y-coordinate of the player's car
var npcCarX = roadX + roadWidth * 3 / 4 - carWidth / 2; // The initial x-coordinate of the NPC's car
var npcCarY = -carHeight; // The initial y-coordinate of the NPC's car
var playerSpeed = 5; // The normal speed of the player's car in pixels per frame
var npcSpeed = 5; // The normal speed of the NPC's car in pixels per frame
var sprintSpeed = 10; // The sprint speed of the player's car in pixels per frame, when answering correctly
var penaltySpeed = 3; // The penalty speed of the player's car in pixels per frame, when answering wrongly
var questionInterval = 5000; // The interval between questions in milliseconds
var questionTimer = 10; // The time limit for each question in seconds
var questionAnswered = false; // A flag to indicate whether the current question has been answered or not
var questionCorrect = false; // A flag to indicate whether the current answer is correct or not

// Load the car images
// We use two Image objects to store the images of the cars
// We set their source to the URLs of the images
var playerCarImage = new Image();
playerCarImage.src = "player_car.png";
var npcCarImage = new Image();
npcCarImage.src = "npc_car.png";

// Generate a random math question and its choices
// This function returns an object that contains the question, the choices, the answer and the correct index
function generateQuestion() {
  // Choose two random numbers between 1 and 10
  var num1 = Math.floor(Math.random() * 10) + 1;
  var num2 = Math.floor(Math.random() * 10) + 1;

  // Choose a random operator (+, -, *, /)
  var operators = ["+", "-", "*", "/"];
  var operatorIndex = Math.floor(Math.random() * operators.length);
  var operator = operators[operatorIndex];

  // Calculate the correct answer
  var answer;
  switch (operator) {
    case "+":
      answer = num1 + num2;
      break;
    case "-":
      answer = num1 - num2;
      break;
    case "*":
      answer = num1 * num2;
      break;
    case "/":
      answer = num1 / num2;
      break;
    default:
      break;
  }

  // Format the question as a string
  var question = num1 + " " + operator + " " + num2 + " = ?";

  // Generate three wrong choices
  var choices = [];
  for (var i = 0; i < 3; i++) {
    var wrongChoice;
    do {
      // Choose a random number between -10 and 10, excluding zero
      wrongChoice =
        Math.floor(Math.random() * (answer + 10 - (answer - 10) + 1)) +
        (answer - 10);
    } while (wrongChoice == answer || choices.includes(wrongChoice));
    choices.push(wrongChoice);
  }

  // Insert the correct answer at a random position
  var correctIndex = Math.floor(Math.random() * choices.length);
  choices.splice(correctIndex, 0, answer);

  // Return the question and the choices as an object
  return {
    question: question,
    choices: choices,
    answer: answer,
    correctIndex: correctIndex,
  };
}

// Create a variable to store the current question
var currentQuestion;

// Create a function to draw the question and the choices on the canvas
function drawQuestion() {
  
}