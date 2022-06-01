const rs = require('readline-sync');

const initQuestion = rs.keyIn('Press any key to start.');

// Variables
const letterOptions = ['A', 'B', 'C'];
const grid = [
    ['A1'], ['A2'], ['A3'],
    ['B1'], ['B2'], ['B3'],
    ['C1'], ['C2'], ['C3'],
];
let prevGuesses = [];
//Random Coordinates generator
const randomizer = maxNum => Math.floor(Math.random() * maxNum);
const randomLetter = () => {
    let num = randomizer(3);
    return letterOptions[num];
};
//I wanted to turn randomCoords into a function for the purpose of players wanting to start a new game, but I want the game to work through at least once FIRST
// function randomCoords(){
let randCoord1 = randomLetter();
let randCoord3 = randomLetter();
let enemyShip1 = [randCoord1 + (randomizer(3) + 1)];
let enemyShip2 = [randCoord3 + (randomizer(3) + 1)];
let enemyCoords = [enemyShip1, enemyShip2];
// };
// randomCoords();


// Guess input / start of turn
function guesser() {
    let coordGuess = rs.question('Enter strike location with a letters a,b, or c, and either numbers 1,2, or 3, such as "A1" or "C3".', {
        limit: grid.flat(1),
        limitMessage: 'Please only enter A, B, or C with 1,2,or 3, such as "C2" or "B3". '
    });
    let actualCoordGuess = coordGuess.toUpperCase();
    console.log(`You have guessed ${actualCoordGuess} to attack. `);
    prevGuesses.push(actualCoordGuess);
    return actualCoordGuess;
};
// let battleTimeout = setTimeout(battleChecker(actualCoordGuess), 1500);
// Maybe use this timeout between guess and reveal to add a lil tension.

//Hit or miss
function battleChecker(guess, enemyCoords) {
    if (enemyCoords.includes(guess)) {        
        let lastEnemy = enemyCoords.filter(coord => coord != guess);
        console.log(`You have hit a Battleship! You have ${lastEnemy.length} remaining! `);
        return lastEnemy;
    } else if(prevGuesses.includes(nextGuess)){
        console.log(`You've already guessed ${guess}! Miss!`);
    } else {
        console.log('You have missed!');console.log(enemyCoords);
    };
}

function game(guess, enemies) {
    if (enemies[0] !== [] && enemies[1] !== []) {
        let nextGuess = guesser();
        battleChecker(nextGuess, enemies);
        game(nextGuess, enemies);
    } else {
       return console.log('YOU HAVE WON THE BATTLE');
    };
};

let startGuess = guesser();
game(startGuess, enemyCoords);