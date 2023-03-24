"use strict";

/////////////////////////////////////////////////
/////////////////////////////////////////////////
// BANKIST APP

// Data
const account1 = {
  owner: "Juan Sánchez",
  movements: [200, 450, -400, 3000, -650, -130, 70, 1300],
  interestRate: 1.2, // %
  pin: 1111,
};

const account2 = {
  owner: "María Portazgo",
  movements: [5000, 3400, -150, -790, -3210, -1000, 8500, -30],
  interestRate: 1.5,
  pin: 2222,
};

const account3 = {
  owner: "Estefanía Pueyo",
  movements: [200, -200, 340, -300, -20, 50, 400, -460],
  interestRate: 0.7,
  pin: 3333,
};

const account4 = {
  owner: "Javier Rodríguez",
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

//init data
const createusername = () => {
  accounts.forEach((account) => {
    account.username = account.owner
      .toLowerCase()
      .split(" ")
      .map((name) => name[0])
      .join("");
  });
};

console.log(accounts);

createusername();

btnLogin.addEventListener("click", (e) => {
  e.preventDefault();
  const username = inputLoginUsername.value;
  const pin = Number(inputLoginPin.value);
  console.log(`Login con el usuario es ${username} y el pin es ${pin}`);

  // recorremos todas las accounts y buscamos el que coincida con username y luego comparamos con el pin

  const currentAccount = accounts.find(
    (account) => account.username === username
  );
  console.log(currentAccount);
  // o también hacer currentAccount && currentAccount.pin===currentAccount.pin , da lo mismo
  if (currentAccount && currentAccount.pin === pin) {
    console.log("PIN correcto");
    labelWelcome.textContent = `Bienvenido ${
      currentAccount.owner.split("")[0]
    }`;
    containerApp.style.opacity = 100;
    inputLoginUsername.value = inputLoginPin == "";
    inputLoginPin.blur();
    //mostrar datos
    updateUI(currentAccount);
  }
});

const updateUI = (currentAccount) => {
  //document.querySelector('movements').innerHTML = ''
  //limpiar mv antiguos
  // insert con insertAdjacentHTML
  //comprobar si son positivos o negativos para los inserciones
  const mvHtml = `<div class="movements__row">
          <div class="movements__type movements__type--deposit">2 deposit</div>
          <div class="movements__date">3 days ago</div>
          <div class="movements__value">4 000€</div>
        </div>`;
  //obtener mv
  const movements = currentAccount.movements; // o hacer tambien const {movements}=curranAccout : devuelve lo mismo
  //mostrar mov
  displayMovement(movements);
  //mostrar balance
  calcAndDisplayBalance(movements);

  //mostrar resumen
  calcAndDisplaySumary(movements);
};
// calculamos el balance
const calcAndDisplayBalance = (currentAccount) => {
  const balance = currentAccount.reduce((acc, mov) => acc + mov, 0);
  labelBalance.textContent = `${balance.toFixed(2)}€`;
};
const calcAndDisplaySumary = (currentAccount) => {
  const { movements } = currentAccount;

  const sumary = currentAccount
    .filter((mov) => mov > 0)
    .reduce((acc, mov) => acc + mov, 0);
  labelSumIn.textContent = `${sumary}`;

  const out = movements
    .filter((mov) => mov < 0)
    .reduce((acc, mov) => acc + mov, 0);
  labelSumOut.textContent = `${Math.abs(out).toFixed(2)}`;

  //calculo de intereses

  const interest = movements
    .filter((mov) => mov > 100)
    .map((mov) => (mov * currentAccount.interestRate) / 100)
    .filter((int) => int >= 2)
    .reduce((acc, int) => acc + int, 0);
  labelSumInterest.textContent = `${interest.toFixed(2)}`;
};

// transferencias entre cuenta
const movimientos = [
  {
    date: "2021-01-01",
    cuantia: 1000,
  },
  {
    date: "2021-01-02",
    cuantia: 2000,
  },
  {
    date: "2021-01-03",
    cuantia: 3000,
  },
  {
    date: "2021-01-04",
    cuantia: 4000,
  },
  {
    date: "2021-01-05",
    cuantia: 5000,
  },
  {
    date: "2021-01-06",
    cuantia: 6000,
  },
  {
    date: "2021-01-07",
    cuantia: 7000,
  },
  {
    date: "2021-01-08",
    cuantia: 8000,
  },
];

const cuantia = Number(inputTransferAmount.value);

inputTransferTo.addEventListener(function transfer(orig, dest, cuantia) {
  let Acountorigin = accounts.find((accounts) => accounts.owner == orig);
  let Accountdest = accounts.find((accounts) => accounts.owner == dest);
  if (Acountorigin.cuantia < cuantia) {
    const msj = "No tienes suficiente saldo ";
    console.log(msj);
  } else Accountdest = cuantia++;
      Acountorigin = cuantia--;
  return "La transferencia ha sido un exito";
});
