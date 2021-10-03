
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

    console.log("Let's play a game where I(computer) choose a number and you (human) try to guess it!")

    let maxNumber = await ask("Please start by picking a maximum number. What is your Max number?\n");

    //asynchronous function that takes in user input to record their setting for the maximum number in the game
    console.log('You entered: ' + maxNumber);

    //here, I set the minimum and declare the max as the user-generated maxNumber
    let min = 0;
    let max = maxNumber;


    //asynchronous function that takes in the user's guess computer's secret number
    let guess = await ask("It's time to guess my number. Please go ahead and type in your guess!\n");


    console.log('You entered: ' + guess);

    //asynchronous function that takes in user input to the console to  input to confirm their guess
    let confirm = await ask("Is this correct? Type 'y' for Yes and 'n' for No.");

    while (confirm !== 'y') {
        console.log("Please try again");

        guess = await ask("It's time to guess my number. Please go ahead and type in your guess!\n");
    }

    //variable compNumber uses a function that generates a random number taking in a min and  max value, then declaring a variable range that takes the difference between min and max and adds one to it. the function returns the range as a random number using Math.random and uses Math.floor to round it down and adding the minimum to it.
    let compNumber = function randomNum(min, max) {
        let range = max - min + 1

        return Math.floor(Math.random() * range) + min
    }



}