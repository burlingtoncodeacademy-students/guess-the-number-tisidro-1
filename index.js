
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

  /*code that allows user input to determine which game to play (index.js or reverse_name.js)

  //what I would like to do here for this portion of icebox, is copy the reverse_name.js code at the end this file and have an async function reverse() that starts the code for the reverse code. However, I wasn't able to get that part to work properly and decide to put it in a file called index2.js--I kept the file separate so you can see this initial part of the project works, and it's got clean code. I explain the problem in index2.js Please take a look at the index2.js that has my attempt at the last part of the Ice Box story, thank you! :) */


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

  let count = 0;//I am declaring count here and setting it equal to zero. I will use this to keep track of how many tries it takes user to guess the number

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
      guess = getHalf(min, max);

      count = count + 1;//I'm adding 1 to the count each time this function loops. This will allow me to track how many times the user guessed too low

    }
    else if (hiLow === "l") {
      //if the user replies "higher," sets a new *minimum* higher by one because the computer was too low
      max = guess - 1;

      guess = getHalf(min, max);  //since max has changed, calling guess again will update it accordingly to the new value for guess (adjusting the max)

      count = count + 1;//I'm adding 1 to the count each time this function loops. This will allow me to track how many times the user guessed too low

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
    console.log(`Your number was ${guess} and it took you ${count} tries!!! Yay!`);

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

