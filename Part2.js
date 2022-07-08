const rs = require('readline-sync');
const initQuestion = rs.keyIn('Press any key to start.');

function entireGame(){
// Grid Builder
const alpha = Array.from(Array(26)).map((e, i) => i + 65);
const alphabet = alpha.map((x) => String.fromCharCode(x));
function gridBuilder(num){
    let arr=[];
    for (i=0; i<num; i++){
        let k = alphabet[i]+(i+1);
        for(j=0; j<num;j++){
            arr.push(alphabet[j]+(i+1));
        };
        if (!arr.includes(k)){
        arr.push(alphabet[i]+(i+1));}
    }
    return arr;
}
const lenAndWid = 10;
const theGrid = gridBuilder(lenAndWid);
const randomBool = () => (Math.random() < 0.5);
let prevGuesses = [];
let totalCoords = []; 

//Random Enemy Coordinates 
const randomizer = maxNum => Math.floor(Math.random() * maxNum);
const randomCoord = () => {
    let num = randomizer(100);
    return theGrid[num];
};


const coordSplitter = (firstCoord = randomCoord()) => {
    firstCoord.split("");
    return firstCoord;
};
const indexOfLetter = (shipFirstIndex) => alphabet.indexOf(shipFirstIndex);

// Ship Builder
const wholeShipBuilderVertical = (shipFirstLetter, shipLength, shipLast) => {
    let shipArray = [];
    for (let i = 0; i < shipLength; i++) {
        shipArray.push(alphabet[indexOfLetter(shipFirstLetter) + i].concat(shipLast));
    }
    return shipArray;
}
const wholeShipBuilderHorizontal = (shipFirstLetter, shipLength, shipLast) => {
    let shipArray = [];
    for (let i = 0; i < shipLength; i++) {
        if (shipLast !== 10) {
            shipArray.push(shipFirstLetter + (Number(shipLast) + Number(i)));
        } else if (shipLast === 10){
            shipArray.push(shipFirstLetter + (6 + i));
        }
    }
    return shipArray;
}

// If vertical, only going to call this first coord to change letter

const borderCheckerVertical = (shipFirstLetter, shipLength, shipLast) => {

    //run it like usual if its NOT over j and it's NOT 10   
    if (indexOfLetter(shipFirstLetter) <= (lenAndWid - shipLength) && shipLast != 0) {
        return wholeShipBuilderVertical(shipFirstLetter, shipLength, shipLast);

        //if IS going to run over j and NOT 10, subtract the ship length so  new ind max letter will be j
    } else if (indexOfLetter(shipFirstLetter) > (lenAndWid - shipLength) && shipLast != 0) {
        let newIndex = (indexOfLetter(shipFirstLetter) - shipLength);
        return wholeShipBuilderVertical(alphabet[newIndex], shipLength, shipLast);

        // if IS going to run over j and IS 10, newInd and 10
    } else if (indexOfLetter(shipFirstLetter) > (lenAndWid - shipLength) && shipLast == 0) {
        let newIndex = (indexOfLetter(shipFirstLetter) - shipLength);
        return wholeShipBuilderVertical(alphabet[newIndex], shipLength, 10);

        // if NOT over j and IS 10, first ship and 10
    } else if (indexOfLetter(shipFirstLetter) <= (lenAndWid - shipLength) && shipLast == 0) {

        return wholeShipBuilderVertical(shipFirstLetter, shipLength, 10)
    }
};

const borderCheckerHorizontal = (shipFirstLetter, shipLength, shipLast) => {
    //if number NOT go over and coord is NOT 10
    if (shipLast <= (lenAndWid - shipLength) && shipLast != 0) {
        return wholeShipBuilderHorizontal(shipFirstLetter, shipLength, shipLast);

        //if number DOES over and cord  is NOT 10
    } else if (shipLast > (lenAndWid - shipLength)) {
        let newLast = (lenAndWid - shipLength) + 1;
        return wholeShipBuilderHorizontal(shipFirstLetter, shipLength, newLast);

        // if num DOES go over and IS 10, i'll fix it in the next PROBLEM IS HERE
    } else if (shipLast == 0) {
        return wholeShipBuilderHorizontal(shipFirstLetter, shipLength, 10);
    };
}
// This sorts the first coordinate to the respective 
const vertCheck = (isVert, shipFirstLetter, shipLast, shipLength) => {
    if (isVert) {
        return borderCheckerVertical(shipFirstLetter, shipLength, shipLast);
    } else {
        return borderCheckerHorizontal(shipFirstLetter, shipLength, shipLast);
    }
};


const dupeCoordsChecker = (coords) => {
    if (!coords.some(elm => totalCoords.includes(elm))) {
        return false;
    } else {
        return true;
    }
};

function generateShip(shipLength){
    let firstCoord = coordSplitter();
    let orientation = randomBool();
    let coords = vertCheck(orientation, firstCoord[0], firstCoord[firstCoord.length - 1], shipLength);
    return shipDupeChecker(coords);
 };
 const shipDupeChecker = (coords) => {
    if (dupeCoordsChecker(coords)) {
        return generateShip(coords.length);
    } else {
        totalPusher(coords);
        return coords;
    }
};

function totalPusher(coords) {
    totalCoords.push(...coords);
}; 

 class Ship {
    constructor(num, shipLength,coords, isSunk = false){
        this.num = num; 
        this.shipLength = shipLength;
        this.isSunk = isSunk; 
        this.coords = coords;
    };
 }
    const shipOne = new Ship(1,2,generateShip(2), false);
    const shipTwo = new Ship(2,3,generateShip(3), false);
    const shipThree = new Ship(3,3,generateShip(3), false);
    const shipFour = new Ship(4,4,generateShip(4), false);
    const shipFive = new Ship(5,5,generateShip(5), false);

    const fleet = [shipOne,shipTwo,shipThree,shipFour,shipFive];
    const fleetMap = fleet.map((x)=> x.coords);
// fleetmap is nested totalcoords

// Guess  
function duplicateGuessChecker(theGuess){
    if (prevGuesses.includes(theGuess)) {
        console.log(`You've already guessed ${theGuess}! Miss!`);
        guesser();
    }
    prevGuesses.push(theGuess);
    console.log(`Your previous guesses include: ${prevGuesses}. Happy Hunting!`);
    return theGuess;
};

function guesser() {
    let coordGuess = rs.question('Enter strike location with a letter a through j, and a number 1 through 10, such as "A1" or "B10".', {
        limit: theGrid,
        limitMessage: 'Please only enter letters A-J with only numbers 1-10 such as "A3" or "B10". '
    });
    let actualCoordGuess = coordGuess.toUpperCase();
    return duplicateGuessChecker(actualCoordGuess);
};


//Hit or miss
const hitCoords = [];
// let shipsToGo = totalCoords.length-(hitCoords.length);
const hitCheck = (guess) => {
    if (totalCoords.includes(guess)){
        console.log(`the ships to go is ${totalCoords.length-(hitCoords.length)}`);
        hitCoords.push(guess);
        console.log(`You have hit a Battleship! You have ${totalCoords.length-(hitCoords.length)} ship remaining! `);
    } else {
        console.log('You have missed!');
        console.log(`the ships to go is ${totalCoords.length-(hitCoords.length)}`);
    }
        /* This is for cheating in the game to make it go faster (and helped with my coding ;D ) 
        vvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvv*/
        console.log(`Try aiming for ${totalCoords}.`);
        /*^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
        Remove this comment if you want EZ mode*/
        deadCheckAll(fleet);
};

//THIS Method checks an idividual ship, will have to run this through a seperate function
const deadShipCheck = (ship) => {
    if (hitCoords.includes(ship.coords)){
        ship.isSunk = true;
        console.log(`Ship Number ${ship.num} is sunk!`);
    }
};

const deadCheckAll = (fleet) => {
    for(const ship of fleet){
        deadShipCheck(ship);
    }
};

// const includedInTotal = (x) => totalCoords.includes(x);

const gameOverCheck = () =>{
if (deadCheckAll(fleet)){
    console.log("YOU HAVE WON! NO SHIPS REMAINING");
}
};


// Actual game structure
function game(guess) {
    if (totalCoords.length-(hitCoords.length) === 0) {
        return console.log('YOU HAVE DESTROYED ALL BATTLESHIPS AND HAVE WON THE BATTLE');
    } else if(!fleet.every((ship)=> {totalCoords.includes(ship)})) {
        hitCheck(guess);
        console.log(`the coords hit are ${hitCoords}`);
        let nextGuess = guesser();
        game(nextGuess);
    } else {
        console.log('somthing messed up');
    }
    ;
};

let startGuess = guesser();
game(startGuess);
if (rs.keyInYN('Do you wish to play again? Please enter Y or N')){
    entireGame();}
}

entireGame();
