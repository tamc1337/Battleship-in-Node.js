// // function minMax(arr) {
// // 	let newArr = [];
// // 	let sortedArr = arr.sort((a,b)=>a-b);
// //     newArr.push(sortedArr[0]);
// // 	newArr.push(sortedArr[sortedArr.length-1]);
// // 	return newArr;
// // }

// // function largestSwap(num) {
// // 	let str = num.toString();
// // 	let arr = str.split("");
// //     console.log(arr);
// // 	let rev = arr.reverse();
// // 	let joint = rev.join("");
// // 	let final = parseInt(joint);
// //     return final;
// // }
// // largestSwap(28);
// // function abbrevName(name){
// //     let initials= name.split(" ");
// //     let arr=[];
// //     let holdThis1 = [];
// //     let holdThis2 = [];
// //     holdThis1.push(...initials[0]);
// //     holdThis2.push(...initials[1]);
// //     arr.push(holdThis1[0].toUpperCase(),holdThis2[0].toUpperCase());
// //     let final = arr.join(".");
// //     return final;
// //     }
// // console.log(abbrevName("bob vance"));






// // let a = ['a', 'b', 'c'];
// // let q = ['a', 2];
// // let t = [['a', 2], ['a', 'b', 'c'], 420];

// // console.log(a.includes('c'));

// // let a = 'C1';
// // let b = ['C1', 'C1'];
// // let filtered = b.filter( word => word != a)
// // // console.log(c(a));
// // console.log(filtered);


// // console.log(b[0]);
// // console.log(b);






// /////////////////////////////////////////////
// /* 
// function game(guess, enemy1=null, enemy2=null){
// coordGuess;//and conslog
// function battleChecker(guess, enemyCoords) {
//     if (enemyCoords.includes(guess)){
//     console.log("You have hit");
//     enemyCoords.delete(guess);
//       } else {
//           console.log('You have missed!');
//       };
//   }
//   if(enemy1!=null&&enemy2!==null){
//       game(guess,enemyCoords);
//   } else {
//       console.log('YOU HAVE WON THE BATTLE')
//   }

// }
// */

// /*objects and classes :
// let ships have coordinates and boolean of isSunk
// ship 1 coords = randomed
// ship 2 coords = randomed
//  both start as isSunk = false;




//  let lastEnemy = enemyCoords.filter(coord => coord != guess)
// */


// // const ship1 = {
// //     coords: 'enemyShip1',
// //     isSunk: false,
// // };
// // const ship2 = {
// //     coords: 'enemyShip2',
// //     isSunk: false,
// // };

// // console.log(ship2);
// //  ship2.isSunk = true;
// //  console.log(ship2);
// // const letterOptions = ['A', 'B', 'C'];
// // const randomLetter = () => {
// // // let enemyShip1 = [randCoord1 + (randomizer(3) + 1)];
// // // let enemyShip2 = [randCoord3 + (randomizer(3) + 1)];
// // [randCoord1 + (randomizer(3) + 1)], [randCoord3 + (randomizer(3) + 1)]
// // // let randCoord1 = randomLetter();
// // // let randCoord3 = randomLetter();

// function randomCoords(randoNum, randoLett){
//     // let randCoord1 = randoLett;
//     // let randCoord3 = randoLett;
//     let enemyShip1 = [randoLett + (randoNum(3) + 1)];
//     let enemyShip2 = [randoLett + (randoNum(3) + 1)];
//     let enemyCoords = [enemyShip1, enemyShip2];
//     if (enemyShip1 === enemyShip2){
//         randomCoords(randoNum(), randoLett);
//     } else { 
//         return enemyCoords;
//     }
// };

//grid builder:
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
// console.log(gridBuilder(lenAndWid));
// returns an array of coordinates
/*.sort((a,b) => a-b)*/

//ship builder

const randomizer = maxNum => Math.floor(Math.random() * maxNum);
const randomFirstCoord = () => {
    let num = randomizer(100);
    return theGrid[num];
};
const randomBool = Math.random() < 0.5; 

console.log(`First random Coord is ${randomFirstCoord()}.`);
// console.log(`Rabdom Bool is ${randomBool}.`);


const coordSplitter = (firstCoord = randomFirstCoord()) => {
    firstCoord.split("");
    // if (firstCoord[2]==0){
    //     firstCoord[1].concat(firstCoord[2]);
    // }
    return firstCoord;
};
let firstShip = coordSplitter();
let secondShip = coordSplitter();
let thirdShip = coordSplitter();
let fourthShip = coordSplitter();
let fifthShip = coordSplitter();

// console.log(`the first ship is at ${(firstShip)}.`);
// console.log(`the second ship is at ${(secondShip)}.`);
// console.log(`the third ship is at ${(thirdShip)}.`);
// console.log(`the fourth ship is at ${(fourthShip)}.`);
console.log(`the fifth ship is at ${(fifthShip)}.`);
console.log(`the fifth ship is at ${fifthShip[1]}.`);

let firstFirst = firstShip[0];
let secondFirst = secondShip[0];
let thirdFirst = thirdShip[0];
let fouthFirst = fourthShip[0];
let fifthFirst = fifthShip[0];
let totalCoords = [];

/* LAST INDEX OF!! A-J will either be [0-9] OR [1-10], the last index of the coord vvvvvv will only ever be digits 0-9.  */
let firstSecond = firstShip[firstShip.length-1];
let secondSecond = secondShip[secondShip.length-1];
let thirdSecond = thirdShip[thirdShip.length-1];
let fouthSecond = fourthShip[fourthShip.length-1];
let fifthSecond = fifthShip[fifthShip.length-1];


console.log(` ${fifthSecond}.`);

// If vertical, only going to call this first coord to change letter
const firstCoordBuilder = (firstShip, shipFirst, shipLength) => {
    let shipArray=[];
    let indexOfLetter = alphabet.indexOf(shipFirst);
    if (indexOfLetter<(lenAndWid-shipLength)){
        for (let i=0;i<shipLength;i++){
            let hold = 
            shipArray.push()
        }
        //build array of coords with firstShip, nextship= alphabet[indexOfLetter+1], itterate through shipLength, and push it to totalCoords
        return alphabet[indexOfLetter];
    } else if (indexOfLetter>(lenAndWid-shipLength)){
        let newIndex = (indexOfLetter - shipLength);
        // alphabet[newIndex] is now the first coord in the array, build it out like above, and add each coord to totalCoords. If ever a Duplicate,
    } else if (totalCoords.includes(indexOfLetter,))

   /*while ( (indexOfLetter + shipLength) > 10){
        shipFirst -1;
        firstCoordBuilder(shipFirst,shipLength)};
        return alphabet[indexOfLetter];*/
/*
console.log(`This is the first coord letter of ship 1 ${firstCoordBuilder(firstShip,2)}`);

//return letter that will then be pairedwith number in array
const secondCoordBuilder = (shipSecond, shipLength) => {
    let indexNumber = parseInt(shipSecond);
    while ( (indexNumber + shipLength) > 10){
        shipSecond -1;
        firstCoordBuilder(shipSecond,shipLength)};
        return indexNumber ;
    
}
console.log(`This is the second coord letter of ship 1 ${secondCoordBuilder(firstShip,2)}`);

function shipBuilderFunc(rand , shipLength = 0, isVertical = randomBool){
    let finalArr=[];
    let indexLetter = alphabet.indexOf(arr[0]);
    inLetterBounds(indexLetter,shipLength);
    let plusLength = alphabet[indexLetter+shipLength]; 
    inNumberBounds(arr[1], shipLength);

    let ifVert = firstCoordBuilder() + arr[1];
    let ifHorz = arr[0] + secondCoordBuilder();
    if (isVertical){

       finalArr.push(firstCoord, ifVert) ;
    } else {

        finalArr.push(firstCoord, ifHorz) ;
    }
    return finalArr
}

const battleship1 = shipBuilderFunc(randomFirstCoord(), 2,false)

console.log(coordSplitter());
// console.log(battleship2);

class Ship {
    constructor(firstCoordBuilder,secondCoordBuilder,coordList, isSunk, shipLength, orientation){
      /*  this.coords = coords; // array of coords 
        this.firstCoord = firstCoord; // random coord func 
        this all needs to be made with a function
        
        this.isSunk = isSunk; // random bool
        this.shipLength = shipLength;
        // lengths predetermed? like ship 1 is 2 units, ship 2 
        // is 3 units, 3 is 3 units, 4 is 4 units, 5 is 5 units
        this.orientation = orientation;
        // isVertical = t/f
    }
}

const shipOne = new Ship(['b2,c3'],randomFirstCoord(),false,2, true);
// console.log(shipOne.firstCoord);
// const shipTwo = new Ship(randomCoord(),false,shipLength, orientated);
*/