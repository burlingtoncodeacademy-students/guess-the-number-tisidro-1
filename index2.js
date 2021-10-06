/*This file contains part 3 of the icebox challenge where I allow the user to choose between the regular game and the reverse game. The issue here is that when I call the async functions iWillChoose() or youChoose(), it will only play the one that I call first. I did write a conditional loop but it seems like it is not working. I will try to figure out what the problem is, or ask for help. But you can see I made the effort! :)*/

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

    //code that allows user input to determine which game to play (index.js or reverse_name.js)

    let chooseGame = await ask(`Hi! Which game would you like to play? Type "You guess" to have the computer guess a number  you think of, or type "I'll guess" to guess the computer's number.`);

    //conditional statement that allows user to play index.js game if they type "you guess" or reverse_name.js if they type "i'll guess"

    let newChoice = chooseGame.toLowerCase//changes user input to all lowercase  to prevent errors in recognizing input that is capitalized or a mix of lower case and capital letters


    if (newChoice === `you guess`) {
        youGuess();

    } else if (newChoice === `i'll guess`) {
        iWillGuess();
    };




    async function youGuess() {
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


    async function iWillGuess() {


        //establishing random number function that will be used in asynchronous code to generate computer's secret number
        function randomNum(min, max) {
            let range = max - min + 1

            return Math.floor(Math.random() * range) + min
        }

        //---------------------Asynchronous Code Start Questions------------------------//

        reverseGame();

        async function reverseGame() {

            console.log("Let's play a game where I(computer) choose a number and you (human) try to guess it!")

            let maxNumber = await ask("Please start by picking a maximum number. What is your Max number?\n");

            //asynchronous function that takes in user input to record their setting for the maximum number in the game
            console.log('You entered: ' + maxNumber);

            //---------------------Establishing Max and Min------------------------//


            //here, I set the minimum and declare the max as the user-generated maxNumber
            let min = 0;
            let max = maxNumber;

            //---------------------Generating the Computer's Secret Number------------------------//


            //variable compNumber uses a function that generates a random number taking in a min and  max value (the max that was generated by the user), then declaring a variable range that takes the difference between min and max and adds one to it. the function returns the range as a random number using Math.random and uses Math.floor to round it down and adding the minimum to it.

            let compNumber = randomNum(min, max);//calling random number function established earlier and passing in min and max as parameters to generate computer's secret number

            //asynchronous function that takes in the user's guess computer's secret number
            let guess = await ask("It's time to guess my number. Please go ahead and type in your guess!\n");


            //asynchronous variable that takes in user input to the console to  input to confirm their guess
            let confirm =

                await ask(`You entered ${guess}. Is this correct? Type "y" for Yes and "n" for No.`);

            if (confirm !== 'y') {
                console.log("Please enter your number again");

                guess = await ask("It's time to guess my number. Please go ahead and type in your guess!\n");
            };


            //---------------------Comparing Computer Guess to User's Input------------------------//


            //computer prompts user to adjust their guess higher or lower:

            let count = 0;//I am declaring count here and setting it equal to zero. I will use this to keep track of how many tries it takes user to guess the number

            while (guess !== compNumber) {

                guess = parseInt(guess);
                //The user input is a string due to the readline function. The computer number is generated using the Math.random() so it is a number not a string. The two cannot be compared in the if statement unless they are the same type, so I'm converting the user input to a number for comparison using parse.Int().

                if (guess < compNumber) {
                    guess = await ask("Your guess is too low--Please type in a new guess!\n")
                    count = count + 1;//I'm adding 1 to the count each time this function loops. This will allow me to track how many times the user guessed too low
                }
                else if (guess > compNumber) {
                    guess = await ask("Your guess is too high--Please type in a new guess!\n");
                    count = count + 1;//I'm adding 1 to the count each time this function loops. This will allow me to track how many times the user guessed too low
                }
            }



            //user guess is successful:
            if (guess === compNumber) {
                console.log(`Yay, you guessed my number correctly and it took you ${count} tries!!`);//here I call the count variable to tell the user how many tries it took (how many times user guessed low plus how many times user guessed high which was tracked by count = count +1)


                //------------Play Again---------//
                //this code asks the user if they would like to play again with asynchronous code, if they do it restarts the program with start() otherwise it exits with process.exit()
                //asynchronous function that takes in user input if they would like to play again or exit
                let playAgain = await ask(`Would you like to play again? Type yes or y to play, no or n to exit.`);

                console.log('You entered: ' + playAgain);

                //if statement with conditional for yes to play again and start()
                if (playAgain === "yes" || playAgain === "y") {
                    console.log("Awesome, let's go!");

                    start();
                }

                //elseif statement with conditional for no further play says goodbye to user and process.exit()
                else if (playAgain === "no" || playAgain === "n") {

                    console.log("Goodbye!");

                    process.exit();
                }
            }
        }
    }



}