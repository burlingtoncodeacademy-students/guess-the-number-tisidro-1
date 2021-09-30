const readline = require('readline');
const rl = readline.createInterface(process.stdin, process.stdout);

function ask(questionText) {
  return new Promise((resolve, reject) => {
    rl.question(questionText, resolve);
  });
}

start();

async function start() {
  console.log("Let's play a game where you (human) make up a number between 1-50 and I (computer) try to guess it.")

  let secretNumber = await ask("What is your secret number?\nI won't peek, I promise...\n");
  //asynchronous function that takes in user input to record their secret number

  console.log('You entered: ' + secretNumber);

  // first, establish min and max. I chose smaller range to start to make it less complicated
  let min = 0;
  let max = 50;

  function getHalf(min, max) {
    return Math.floor((max - min) / 2) + min; //narrows the range for a guessed computer answer
  }

  let guess = getHalf(min, max)// assigning a value to guess (representing the computer's guess) via callback function getHalf that takes in a min and a max parameter


  let answer = await ask(`Is your secret number ${guess} ?  Please type Y or N`);//asynchronous function that takes in user input to determine if computer guess is correct

  //I kept making entry typos, so I wrote this while loop to re-ask the question and continue on
  while (answer !== "N" && answer !== "n" && answer !== "Y" && answer !== "y") {
    console.log("Please start over and watch for typing errors!")

    answer = await ask(`Is your secret number ${guess} ?  Please type Y or N`);

  }

  //conditional for where user answers no or n to the question "is your number ___?". 

  while (answer === "N" || answer === "n") {

    //asynchronous function to gather user input to determine if guess was higher or lower than user's secret number
    let hiLow = await ask(`Is your secret number higher (h) or lower (l) than ${guess}?`);

    //I kept making entry typos, so I wrote this while loop to re-ask the question and continue on
    while (hiLow !== "h" && answer !== "l") {

      hiLow = await ask(`Is your secret number higher (h) or lower (l) than ${guess}?`);
    }

    if (hiLow === "higher" || hiLow === "h") {
      //if the user replies "higher," raise the *minimum* higher  + 1 than the computer guess because the computer was too low
      min = guess + 1;

      //since min has changed, calling guess again will update it accordingly to the new value for guess (adjusting the min)
      guess = getHalf(min, max)

    }
    else if (hiLow === "lower" || hiLow === "l") {//if the user replies, "lower," raise the *maximum* to be lower - 1 than the computer guess because the computer was too high 
      max = guess - 1;

      guess = getHalf(min, max)  //since max has changed, calling guess again will update it accordingly to the new value for guess (adjusting the max)

    }


    answer = await ask(`Is your secret number ${guess} ?  Please type Y or N `);//asynchronous function that takes in user input to determine if computer guess is correct called again to check new guess

  }
  //conditional here where user answers yes or y, console logs a victory message 
  if (answer === "Y" || answer === "y") {
    console.log(`Your number was ${guess}! Yay!`);
    process.exit();
  }


}