
//----------------------------Readline--------------------------//

const readline = require('readline');
const rl = readline.createInterface(process.stdin, process.stdout);

function ask(questionText) {
  return new Promise((resolve, reject) => {
    rl.question(questionText, resolve);
  });
}

//---------------------Asynchronous Code Start Questions------------------------//
start();

async function start() {

  console.log("Let's play a game where you (human) choose a number and I (computer) try to guess it.")

  let maxNumber = await ask("Please start by picking a maximum number. What is your Max number?\n");

  console.log('You entered: ' + maxNumber);
  //asynchronous function that takes in user input to record their maximum number

  let secretNumber = await ask("Now, please type in your secret number?\nI won't peek, I promise...\n");
  //asynchronous function that takes in user input to record their secret number

  console.log('You entered: ' + secretNumber);

  //---------------------Establishing Max and Min------------------------//

  // first, establish min and max. Here, maxNumber is the user-set maximum number for the guess
  let min = 0;
  let max = maxNumber;

  function getHalf(min, max) {
    //narrows the range for a guessed computer answer by taking the difference between the max/min, dividing it by 2, and adding it to the min to create a smaller range

    return Math.floor((max - min) / 2) + min;
  }

  //---------------------Computer's Guess------------------------//

  let guess = getHalf(min, max)// assigning a value to guess (representing the computer's guess) via callback function getHalf that takes in a min and a max parameter


  let answer = await ask(`Is your secret number ${guess} ?  Please type Y or N`);//asynchronous function that takes in user input to determine if computer guess is correct

  //I kept making entry typos, so I wrote this while loop to re-ask the question and continue on
  while (answer !== "N" && answer !== "n" && answer !== "Y" && answer !== "y") {
    console.log("Please start over and watch for typing errors!")

    answer = await ask(`Is your secret number ${guess} ?  Please type Y or N`);

  }

  //---------------------Adjusting Guess Range Up or Down Based On User Input------------------------//

  //conditional for where user answers no or n to the question "is your number ___?". 

  while (answer === "N" || answer === "n") {

    //asynchronous function to gather user input to determine if guess was higher or lower than user's secret number
    let hiLow = await ask(`Is your secret number higher (h) or lower (l) than ${guess}?`);

    //I kept making entry typos, so I wrote this while loop to re-ask the question and continue on
    while (hiLow !== "h" && hiLow !== "l") {

      hiLow = await ask(`Is your secret number higher (h) or lower (l) than ${guess}?`);

    }

    if (hiLow === "h") {
      //if the user replies "higher," sets a new *minimum* higher by one because the computer was too low
      min = guess + 1;

      //since min has changed, calling guess again will update it accordingly to the new value for guess (adjusting the min)
      guess = getHalf(min, max)

    }
    else if (hiLow === "l") {
      //if the user replies "higher," sets a new *minimum* higher by one because the computer was too low
      max = guess - 1;

      guess = getHalf(min, max)  //since max has changed, calling guess again will update it accordingly to the new value for guess (adjusting the max)

    }

    //----------------------------Cheat Code--------------------------//
    /*when a user responds "lower" it sets a new max, when user responds "higher" it sets a new min. If a user chooses 4, and the computer puts out 8 the user will answer "l" and the computer sets 7 as the new min. If the computer next guesses 3 and the user responds h, it will set 4 as the new min. If the computer then guesses 4 and the user says "l" it will fail because 4 was just established as the  new min!*/

    if (min > max || max < min) {
      console.log("Hey now, no cheating! You contradicted an earlier answer. Start over please and no more tricks! ;)")
      //after scolding the user, the program kicks user out and they  must start over.
      process.exit();
    }

    answer = await ask(`Is your secret number ${guess} ?  Please type Y or N `);//asynchronous function that takes in user input to determine if computer guess is correct called again to check new guess

  }

  //-----------Correct Number Guessed!------------//

  //conditional here where user answers yes or y, console logs a victory message 
  if (answer === "Y" || answer === "y") {
    console.log(`Your number was ${guess}! Yay!`);

  }

  //------------Play Again---------//
  //this code asks the user if they would like to play again with asynchronous code, if they do it restarts the program with start() otherwise it exits with process.exit()

  //asynchronous function that takes in user input if they would like to play again or exit
  let playAgain = await ask("Would you like to play again? Type yes or y to play, no or n to exit.");
  console.log('You entered: ' + playAgain);

  //if statement with conditional for yes to play again and start()
  if (playAgain === "yes" || playAgain === "y") {
    console.log("Awesome, let's go!");

    start();
  }

  //elseif statement with conditional for no further play and process.exit()
  else if (playAgain === "no" || playAgain === "n") {
    process.exit();
  }
}

