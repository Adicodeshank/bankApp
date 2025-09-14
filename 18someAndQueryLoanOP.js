const movements = [200, 450, -400, 3000, -650, -130, 70, 1300];
// ---------------Some And Query---------------  
console.log(movements);
// equality
console.log(movements.includes(-130)); // return true or false
//condition => if a single ele satisfy that constion some will return true 
const anyDeposite = movements.some(mov => mov > 1000)
console.log(anyDeposite);

// EVERY => every ele of an array has to satisfy on that consition to return true
console.log(movements.every(mov=>mov >= 0));
console.log(movements.every(mov => mov > 0));

// seperate call back
const deposit = mov => mov > 0;
console.log(movements.some(deposit));
console.log(movements.every(deposit));