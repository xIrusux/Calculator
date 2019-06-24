const calculator = {
    displayValue: '0', /*represents the input of the user or the result of an operation. This is what will be shown on the screen.*/
    firstOperand: null, 
    waitingForSecondOperand: false, /*a flag that checks whether an expression can be evaluated or whether the second operand needs to be inputed*/
    operator: null,
};

function inputDigit(digit) { /*we check if waitingForSecondOperand is true and set displayValue to the key that was clicked. Otherwise, we perform the same check as before, overwriting or appending to calculator.displayValue as appropriate.*/
    const { displayValue, waitingForSecondOperand } = calculator;
    
    if (waitingForSecondOperand === true) {
        calculator.displayValue = digit;
        calculator.waitingForSecondOperand = false;
    } else {
        calculator.displayValue = displayValue === '0' ? digit : displayValue + digit;
    }
        console.log(calculator);
    }

function updateDisplay() {
    const display = document.querySelector('.calculator-screen');
    display.value = calculator.displayValue;
}

updateDisplay();

const keys = document.querySelector('.calculator-keys');
keys.addEventListener('click', (event) => {
    const target = event.target;
    if (!target.matches('button')) {
        return;
    }

    if (target.classList.contains('operator')) {
        handleOperator(target.value);
        updateDisplay();
        return;
    }

    if (target.classList.contains('decimal')) {
        inputDecimal(target.value);
        console.log(event);
        updateDisplay();
        return;
    }

    if (target.classList.contains('all-clear')) {
        console.log('clear', target.value);
        return;
    }

    inputDigit(target.value);
    updateDisplay();
});

function inputDecimal(dot) {
    if (!calculator.displayValue.includes(dot)) {
        calculator.displayValue += dot;
    }
}

function handleOperator(nextOperator) {
 const { firstOperand, displayValue, operator } = calculator;
 const inputValue = parseFloat(displayValue); /* convert the current number displayed on the screen to a number*/
 
 if (firstOperand === null) { /*, only if the first operand is not 0 we will then assign this value to the first operand in the next section */
     calculator.firstOperand = inputValue;
 } else if (operator) {
     const result = performCalculation[operator](firstOperand, inputValue); /* ??? this is called 'property lookup' ?? inputValue here is then the second value inserted? I think */
     
     calculator.displayValue = String(result);
     calculator.firstOperand = result;
 }

 calculator.waitingForSecondOperand = true;
 calculator.operator = nextOperator; /* next operator here refers to the current operator e.g. + that is being used*/
 console.log(calculator);
}

const performCalculation = {
    '/': (firstOperand, secondOperand) => firstOperand / secondOperand,
    '*': (firstOperand, secondOperand) => firstOperand * secondOperand,
    '+': (firstOperand, secondOperand) => firstOperand + secondOperand,
    '-': (firstOperand, secondOperand) => firstOperand - secondOperand,
    '=': (firstOperand, secondOperand) => secondOperand
};
