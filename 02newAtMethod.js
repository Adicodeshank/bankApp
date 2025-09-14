// The new at Method
const arr = [23, 11, 64];
console.log(arr[0]);
console.log(arr.at(0));

// getting last array element
console.log(arr[arr.length - 1]);
console.log(arr.slice(-1)[0]); // [0] na likhne par slice se array aata ha likh dene par to last ele ki value aa jaigi 
console.log(arr.at(-1)); // same kaam uper statement ka 

console.log('jonas'.at(0));
console.log('jonas'.at(-1));
