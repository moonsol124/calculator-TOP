//basic math functions
function add(a, b) {
    return a+b;
}

function substract(a, b) {
    return a-b;
}

function multiply(a, b) {
    return a*b;
}

function divde(a, b) {
    return a/b;
}

// emptyArrays 
function emptyArrays() {
    displayArray = [];
    array = [];
    sortedArray = [];
}

// calls the basic math functions
function operate(a, operator, b) {
    if (operator === '+') {
        return add(a, b);
    }
    if (operator === '-') {
        return substract(a, b);
    }
    if (operator === '*') {
        return multiply(a, b);
    }
    if (operator === '/') {
        return divde(a, b);
    }
}
//adding a display section
const display = document.querySelector('.display-result');
let displayArray = [];
let array = [];
let sortedArray = [];

//making digit buttons 1-9
const digitContainer = document.querySelector('.digit-container');
for (let i = 1; i <= 9; i++) {
    const btn = document.createElement('button');
    btn.setAttribute('id', 'digit');
    btn.setAttribute('data-key', `${i}`);
    btn.classList.add('btn');
    btn.textContent = i;
    digitContainer.appendChild(btn);
}

//adding operators and backspace
const operatorContainer = document.querySelector('.operator-container');
const sum = document.createElement('button');
sum.textContent = '+';
sum.setAttribute('id', 'operator');
sum.setAttribute('data-key', '+');
const subs = document.createElement('button');
subs.textContent = '-';
subs.setAttribute('id', 'operator');
subs.setAttribute('data-key', '-');
const mult = document.createElement('button');
mult.textContent = '*';
mult.setAttribute('id', 'operator');
mult.setAttribute('data-key', '*');
const divide = document.createElement('button');
divide.textContent = '/';
divide.setAttribute('id', 'operator');
divide.setAttribute('data-key', '/');
const backSpace = document.createElement('button');;
backSpace.textContent = '<-';
backSpace.setAttribute('id', 'backspace');
backSpace.classList.add('btn');
operatorContainer.append(sum, subs, mult, divide, backSpace);

//add function to backspace
backSpace.addEventListener('click', e => {
    displayArray.splice(displayArray.length-1, 1);
    display.removeChild(display.lastElementChild);
    console.log(displayArray);
})

const operatorBtns = document.querySelectorAll('#operator');
operatorBtns.forEach (btn => {
    btn.classList.add('btn');
})

//adding event to operators
const operators = document.querySelectorAll('#operator');
operators.forEach(operator => operator.addEventListener ('click', e => {
    const o = document.createElement('h1');
    const key = operator.getAttribute('data-key');
    o.textContent = key;
    display.appendChild(o);
    const numbersStr = displayArray.join("");
    const numbersInt = parseInt(numbersStr);
    array.push(numbersInt);
    array.push(key);
    displayArray = [];
})
)

//adding point, zero, equal,
const point = document.createElement('button');
point.textContent = '.';
point.setAttribute('id', 'operator');
point.classList.add('btn');
const zero = document.createElement('button');
zero.textContent = 0;
zero.setAttribute('id', 'digit');
zero.setAttribute('data-key', 0);
zero.classList.add('btn');
const equal = document.createElement('button');
equal.textContent = "=";
equal.setAttribute('id', 'operate');
equal.classList.add('btn');
digitContainer.append(point, zero, equal);

//populate
const buttonsNode = document.querySelectorAll('#digit');
const buttons = Array.from(buttonsNode);
buttons.forEach(button => {button.addEventListener('click', e => {
    const number = document.createElement('h1');
    const key = button.getAttribute('data-key');
    number.textContent = key;
    display.appendChild(number);
    displayArray.push(key);
    console.log (displayArray);
    //store two values
    //pass them to operate() function
}
)});

//add event to clear button
let count = 0;
const clearBtn = document.getElementById('clear');
clearBtn.addEventListener ('click', e => {
    displayArray = [];
    array = [];
    sortedArray = [];
    display.replaceChildren();
    count = 0;
})

//add event to equal button
equal.addEventListener ('click', e => {
    if (count > 0) {
        let nanIndex = array.findIndex(element => {
            if (isNaN(element)) {
                return true;
            }
            else {
                return false;
            }
        })
        array.splice(nanIndex, 1);
    }
    const numbers = displayArray.join("");
    array.push(parseInt(numbers));
    let result = 0;
    let i = 1;
    while (i < array.length-1) {
        if (array[i] === '+' || array[i] === '-') {
            sortedArray.push(array[i-1]);
            sortedArray.push(array[i]);
        }
        //problem 1: doesn't store the last element if the last operator is '+' or '-'
        //problem 2: doesn't store the last three elements if the last operator is '*' or '/'
        else if (array[i] === '*' || array[i] === '/') {
            let result = operate(array[i-1], array[i], array[i+1]);
            array[i+1] = result;
        }
        
        // if array[i] is the last operator
        if (i === array.length-2) {
            if (array[i] === '+' || array[i] === '-') {
                sortedArray.push(array[array.length-1]);
            }
            else if (array[i] === '*' || array[i] === '/') {
                sortedArray.push(array[array.length-1]);
            }
        }
        i = i+2;
        }   
        let finalResult = 0;
        for (let i = 0; i < sortedArray.length; i++) {
            if (i%2 == 0) {
                finalResult = sortedArray[i];
            }
            else {
                const firstNumber = sortedArray[i-1];
                const secondNumber = sortedArray[i+1];
                finalResult = operate(firstNumber, sortedArray[i], secondNumber);
                sortedArray[i+1] = finalResult; 
            }
        }
        // when it's sum or minus it calculates
        // if its mult or div the length of sortedarray is 1.
        // so it doesn't calculate and displays the value directly
        // so it doesn't change the value of final result which stays as 0
        const finalResultDisplay = document.createElement('h1');
        finalResultDisplay.textContent = sortedArray[sortedArray.length-1];
        display.replaceChildren(finalResultDisplay);
        // console.log (`array ${array}`);
        // console.log (`sortedArray ${sortedArray}`);
        displayArray = [];
        array = [];
        sortedArray = [];
        array.push(finalResult);
        if (isNaN(finalResult)) {
            emptyArrays();
        }
        count++;
    }
)

//adding class when clicked 
const btns = document.querySelectorAll("#digit, #operator, #operate, #clear");
btns.forEach (btn => {btn.addEventListener('click', e => {
    btn.classList.add('click-effect');
})})

btns.forEach (btn => btn.addEventListener('transitionend', e => {
    btn.classList.remove('click-effect');
}))

// let test;
// if (test) {
//     console.log ("yes");
// }
// else {
//     console.log ("no");
// }
// console.log (isNaN(NaN));
// let ls = [1, 2, true, 4, 5];
// console.log (ls);
// let index = ls.findIndex(element => {
//     if (element === true) {
//         return true;
//     }
//     else {
//         return false;
//     }
// })

// ls.splice(index, 1);
// console.log (ls);
// let str = "";
// for (let i = 0; i < 10; i++) {
//     str += i.toString();
// }
// console.log (str);
// str = "";
// console.log (str);
