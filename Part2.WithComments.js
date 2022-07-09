/* This is the file of TAYLOR MCNAIR's BATTLESHIP PART 2
*  This includes my comments of how I have each of the sections working.*/
const rs = require('readline-sync');
const initQuestion = rs.keyIn('Press any key to start.');
// The entire game is one very large function
function entireGame() {
    // Here is the setup
    // Grid Builder
    const alpha = Array.from(Array(26)).map((e, i) => i + 65);
    const alphabet = alpha.map((x) => String.fromCharCode(x));
    function gridBuilder(num) {
        let arr = [];
        for (i = 0; i < num; i++) {
            let k = alphabet[i] + (i + 1);
            for (j = 0; j < num; j++) {
                arr.push(alphabet[j] + (i + 1));
            };
            if (!arr.includes(k)) {
                arr.push(alphabet[i] + (i + 1));
            }
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
        let num = randomizer(lenAndWid ** 2);
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
            } else if (shipLast === 10) {
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
            //if IS going to run over j and NOT 10, subtract the ship length so  new index max letter will be j
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
    // This sorts the first coordinate to the respective border checking function
    const vertCheck = (isVert, shipFirstLetter, shipLast, shipLength) => {
        if (isVert) {
            return borderCheckerVertical(shipFirstLetter, shipLength, shipLast);
        } else {
            return borderCheckerHorizontal(shipFirstLetter, shipLength, shipLast);
        }
    };
    let firstCoord = coordSplitter();
    let orientation = randomBool();
    let coords = vertCheck(orientation, firstCoord[0], firstCoord[firstCoord.length - 1], 5);
    /* This bad boy was the source of 3 weeks of frustration for me.
    * This checks for duplicate coordinates, and is seperate from the building function, 
    * the SRP practice helped with it too. */
    const dupeCoordsChecker = (coords) => {
        if (!coords.some(elm => totalCoords.includes(elm))) {
            return false;
        } else {
            return true;
        }
    };
    // This also took a while to smush together.
    // The result of combining all the functions above into something I wanted. 
    function generateShip(shipLength) {
        let firstCoord = coordSplitter();
        let orientation = randomBool();
        let coords = vertCheck(orientation, firstCoord[0], firstCoord[firstCoord.length - 1], shipLength);
        return shipDupeChecker(coords);
    };
    // This, in conjunction with the dupeCoordChecker, allowed me to perform the 'rerolling' for 
    // ships coordinates INSIDE the ship generator. 
    const shipDupeChecker = (coords) => {
        if (dupeCoordsChecker(coords)) {
            return generateShip(coords.length);
        } else {
            totalPusher(coords);
            return coords;
        }
    };
    // This adds the finally determined coordinates to the total coords array. 
    function totalPusher(coords) {
        totalCoords.push(...coords);
    };
    // I definitely overthought this the first few weeks of this project. 
    class Ship {
        constructor(num, name, shipLength, coords, isSunk = false) {
            this.num = num;
            this.name = name;
            this.shipLength = shipLength;
            this.isSunk = isSunk;
            this.coords = coords;
        };
    }
    const shipOne = new Ship(1, "Destroyer", 2, generateShip(2), false);
    const shipTwo = new Ship(2, "Submarine", 3, generateShip(3), false);
    const shipThree = new Ship(3, "Cruiser", 3, generateShip(3), false);
    const shipFour = new Ship(4, "Battleship", 4, generateShip(4), false);
    const shipFive = new Ship(5, "Carrier", 5, generateShip(5), false);
    const fleet = [shipOne, shipTwo, shipThree, shipFour, shipFive];
    // This lets players know if they've guessed the same coordinate before
    // or else adds the new guess in to be checked against future ones.  
    function duplicateGuessChecker(theGuess) {
        if (prevGuesses.includes(theGuess)) {
            console.log(`You've already guessed ${theGuess}! Miss!`);
            guesser();
        }
        prevGuesses.push(theGuess);
        return theGuess;
    };
    // The Guess Function, this is where the game starts to take shape.
    // it takes in the input for the cordinates as well as runs the duplicate guess function.
    function guesser() {
        let coordGuess = rs.question('Enter strike location with a letter A through J, and a number 1 through 10, such as "A1" or "B10".', {
            limit: theGrid,
            limitMessage: 'Please only enter letters A-J with only numbers 1-10 such as "A3" or "G10".  Pick "I9" only if you truly must.'
        });
        let actualCoordGuess = coordGuess.toUpperCase();
        return duplicateGuessChecker(actualCoordGuess);
    };
    // This function is for anouncing what ship is hit and includes the check to see if that ship has been sunk.  
    const whichShipHit = (guess) => {
        let guessShip = fleet.find(ship => ship.coords.includes(guess));
        console.log(`YOU HIT The ${guessShip.name}!`);
        deadShipCheck(guessShip);
    }
    // The Hit Function does much of the heavy lifting for the game.
    const hitCoords = [];
    const hitCheck = (guess) => {
        if (totalCoords.includes(guess)) {
            // This tells which ship was hit.
            hitCoords.push(guess);
            whichShipHit(guess);
        } else {
            console.log('You have missed!');
        }
        /* This is for cheating in the game to make it go faster (and helped with my coding): 
        console.log(`Try aiming for ${totalCoords}.`); 
         Remove this comment if you want EZ mode*/ 
         console.log(`Your previous guesses include:`);
         console.log(prevGuesses);
    };
    //This checks an idividual ship if it's still alive
    const sunkCheck = (ship) => {
        return ship.coords.every(coord => hitCoords.includes(coord));
    }
    //This gived the value 'true' to the ships isSunk after it's run through the sunkCheck
    const deadShipCheck = (ship) => {
        if (sunkCheck(ship)) {
            ship.isSunk = true;
            console.log(`The ${ship.name} has been sunk!`);
        }
    };
    //Checks if all ships are sunk
    const deadCheckAll = (fleet) => {
        return fleet.every(ship => sunkCheck(ship));
    };
    //The function that checks if the game is over by seeing if all the ships in the fleet are actually sunk.
    const gameOverCheck = () => {
        if (deadCheckAll(fleet)) {
            console.log("YOU HAVE WON! NO SHIPS REMAINING");
            return true;
        } else {
            return false;
        }
    };
    // This was the last piece of the puzzle, by removing the setup for the next guess from the hitCheck,
    // I squashed my last huge bug that made the player guess AFTER all the ships were dead.
    const nextGuess = () => {
        console.log('NEXT GUESS');
        let nextGuess = guesser();
        game(nextGuess);
    }
    // Actual game structure, with the terms for victory at the start,
    function game(guess) {
        if (totalCoords.length - (hitCoords.length) === 0) {
            console.log('YOU HAVE DESTROYED ALL BATTLESHIPS AND HAVE WON THE BATTLE');
            return true;
        } else {
            hitCheck(guess);
            gameOverCheck() ? game(hitCoords[hitCoords.length - 1]) : nextGuess();
        };
    };
    //How the game begins
    let startGuess = guesser();
    game(startGuess);
    if (rs.keyInYN('Do you wish to play again? Please enter Y or N')) {
        entireGame();
    }
}
// Do you want to play a game?
entireGame();