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
    
}
// returns an array of coordinates




