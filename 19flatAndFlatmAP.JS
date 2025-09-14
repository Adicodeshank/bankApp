// Data
const account1 = {
    owner: "Jonas Schmedtmann",
    movements: [200, 450, -400, 3000, -650, -130, 70, 1300],
    interestRate: 1.2, // %
    pin: 1111,
  };
  
  const account2 = {
    owner: "Jessica Davis",
    movements: [5000, 3400, -150, -790, -3210, -1000, 8500, -30],
    interestRate: 1.5,
    pin: 2222,
  };
  
  const account3 = {
    owner: "Steven Thomas Williams",
    movements: [200, -200, 340, -300, -20, 50, 400, -460],
    interestRate: 0.7,
    pin: 3333,
  };
  
  const account4 = {
    owner: "Sarah Smith",
    movements: [430, 1000, 700, 50, 90],
    interestRate: 1,
    pin: 4444,
  };
  
  const accounts = [account1, account2, account3, account4];
  
  // Elements
  const labelWelcome = document.querySelector(".welcome");
  const labelDate = document.querySelector(".date");
  const labelBalance = document.querySelector(".balance__value");
  const labelSumIn = document.querySelector(".summary__value--in");
  const labelSumOut = document.querySelector(".summary__value--out");
  const labelSumInterest = document.querySelector(".summary__value--interest");
  const labelTimer = document.querySelector(".timer");
  
  const containerApp = document.querySelector(".app");
  const containerMovements = document.querySelector(".movements");
  
  const btnLogin = document.querySelector(".login__btn");
  const btnTransfer = document.querySelector(".form__btn--transfer");
  const btnLoan = document.querySelector(".form__btn--loan");
  const btnClose = document.querySelector(".form__btn--close");
  const btnSort = document.querySelector(".btn--sort");
  
  const inputLoginUsername = document.querySelector(".login__input--user");
  const inputLoginPin = document.querySelector(".login__input--pin");
  const inputTransferTo = document.querySelector(".form__input--to");
  const inputTransferAmount = document.querySelector(".form__input--amount");
  const inputLoanAmount = document.querySelector(".form__input--loan-amount");
  const inputCloseUsername = document.querySelector(".form__input--user");
  const inputClosePin = document.querySelector(".form__input--pin");
  
  /////////////////////////////////////////////////
  /////////////////////////////////////////////////
  // LECTURES
  
  const currencies = new Map([
    ["USD", "United States dollar"],
    ["EUR", "Euro"],
    ["GBP", "Pound sterling"],
  ]);
  
  const movements = [200, 450, -400, 3000, -650, -130, 70, 1300];
  
  // -------------BANKIST APP--------------
  const createUsername = function (accs) {
    accs.forEach(function (acc) {
      acc.username = acc.owner
        .toLowerCase()
        .split(" ")
        .map((name) => name[0])
        .join("");
    });
  };
  createUsername(accounts);
  const displayMovements = function (movements, sort = false) {
    containerMovements.innerHTML = "";
    movements.forEach(function (mov, i) {
      const type = mov > 0 ? "deposit" : "withdrawal";
  
      const html = `
          <div class="movements__row">
            <div class="movements__type movements__type--${type}">${
        i + 1
      } ${type}</div>
            <div class="movements__value">${mov}€</div>
          </div>
        `;
  
      containerMovements.insertAdjacentHTML("afterbegin", html);
    });
  };
  
  const displaybalance = function (acc) {
    acc.balance = acc.movements.reduce((acc, mov) => acc + mov, 0);
    labelBalance.textContent = `${acc.balance} EUR`;
  };
  
  const calcDispalySummary = function (acc) {
    const incomes = acc.movements
      .filter((mov) => mov > 0)
      .reduce((acc, mov) => acc + mov, 0);
    labelSumIn.textContent = `${incomes}EUR`;
  
    const outcome = acc.movements
      .filter((mov) => mov < 0)
      .reduce((acc, mov) => acc + mov, 0);
    labelSumOut.textContent = `${Math.abs(outcome)}EUR`;
  
    const interest = acc.movements
      .filter((mov) => mov > 0)
      .map((mov) => (mov * acc.interestRate) / 100)
      // .filter(mov => mov > 1)
      .filter((mov, i, arr) => {
        // sirf usi pe interest cal karo jispe interest 1 se uper ho
        console.log(arr);
        return mov > 1;
      })
      .reduce((acc, mov) => acc + mov, 0);
    labelSumInterest.textContent = `${interest}EUR`;
  };
  const updateUI = function (acc) {
    // dispaly Movements
    displayMovements(acc.movements);
  
    // display Balance
    displaybalance(acc);
  
    // dispaly Summary
    calcDispalySummary(acc);
  };
  
  let currentAccount;
  /* Login karte hi form submit ho jaiga isiliye e walli funcnality ko banaya ha */
  btnLogin.addEventListener("click", function (e) {
    // prevent form from submitting
    e.preventDefault();
    // console.log(e);
    // console.log('LOGIN');
  
    currentAccount = accounts.find(
      (acc) => acc.username === inputLoginUsername.value
    );
    console.log(currentAccount);
  
    if (currentAccount?.pin === Number(inputLoginPin.value)) {
      // optional channing is done here because when usernmaer is wrong find will return undefined
      // clearing input data
      inputLoginUsername.value = "";
      inputLoginPin.value = "";
      inputLoginPin.blur();
  
      // display UI and welcome message
      labelWelcome.textContent = `Welcome back ${
        currentAccount.owner.split(" ")[0]
      }`;
      containerApp.style.opacity = 100;
  
      updateUI(currentAccount);
    }
  });
  
  // --------- TRANSFER MONEY --------------
  btnTransfer.addEventListener("click", function (e) {
    e.preventDefault();
    const amount = Number(inputTransferAmount.value);
    const receiverAcc = accounts.find(
      (acc) => acc.username === inputTransferTo.value
    );
    // console.log(amount, receiverAcc);
    inputTransferAmount.value = inputTransferTo.value = "";
  
    if (
      amount > 0 &&
      receiverAcc &&
      currentAccount.balance >= amount &&
      receiverAcc?.username !== currentAccount.username
    ) {
      // Doing the transfer
      currentAccount.movements.push(-amount);
      receiverAcc.movements.push(amount);
  
      // Update UI
      updateUI(currentAccount);
    }
  });
  // ----------loan implementation-----------
  btnLoan.addEventListener('click', function(e){
    e.preventDefault();
    const loanAmount = Number(inputLoanAmount.value);
    if(loanAmount > 0 && currentAccount.movements.some(mov => mov >=  (loanAmount*10)/100))
    {
       currentAccount.movements.push(loanAmount);
       updateUI(currentAccount);
    }
    inputLoanAmount.value="";
  });
  // -------------close Account----------
  btnClose.addEventListener("click", function (e) {
    e.preventDefault();
  
    if (
      inputCloseUsername.value === currentAccount.username &&
      Number(inputClosePin.value) === currentAccount.pin
    ) {
      const index = accounts.findIndex(
        (acc) => acc.username === currentAccount.username
      );
      console.log(index);
      // .indexOf(23)
  
      // Delete account
      accounts.splice(index, 1);
  
      // Hide UI
      containerApp.style.opacity = 0;
    }
    console.log(accounts); // account nahi milega jo delete hua
    inputCloseUsername.value = inputClosePin.value = "";
  });
// ---------------Some And Query---------------  
// console.log(movements);
// // equality
// console.log(movements.includes(-130)); // return true or false
// //condition => if a single ele satisfy that constion some will return true 
// const anyDeposite = movements.some(mov => mov > 1000)
// console.log(anyDeposite);

// // EVERY => every ele of an array has to satisfy on that consition to return true
// console.log(movements.every(mov >= 0));
// console.log(account4.movements.every(mov => mov > 0));

// // seperate call back
// const deposit = mov => mov > 0;
// console.log(movements.some(deposit));
// console.log(movements.every(deposit));

// ------------flat and flatMap--------------
// flat and flatMap
const arr = [[1, 2, 3], [4, 5, 6], 7, 8];
console.log(arr.flat());

const arrDeep = [[[1, 2], 3], [4, [5, 6]], 7, 8];
console.log(arrDeep.flat(2));

// flat
// const acc = accounts.map(acc => acc.movements);
// console.log(acc);
// const acc1 = acc.flat();
// console.log(acc1);
const overalBalance = accounts
  .map(acc => acc.movements)
  .flat()
  .reduce((acc, mov) => acc + mov, 0);
console.log(overalBalance);

// flatMap => // flatmap goes only one level deep of nesting
const overalBalance2 = accounts
  .flatMap(acc => acc.movements)
  .reduce((acc, mov) => acc + mov, 0);
console.log(overalBalance2);
