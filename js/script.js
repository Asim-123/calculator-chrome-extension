const input = document.querySelector(".input");
const buttons = document.querySelector(".buttons");

let currentNumber = "0";
let previousNumber = null;
let currentOperator = null;
let shouldReset = false;

const updateInput = () => {
  input.value = currentNumber;
}

const handleNumberClick = (event) => {
  const number = event.target.textContent;
  
  if (shouldReset) {
    currentNumber = number;
    shouldReset = false;
  } else {
    currentNumber = currentNumber === "0" ? number : currentNumber + number;
  }
  
  updateInput();
}

const handleOperatorClick = (event) => {
  const operator = event.target.textContent;
  
  if (operator === "C") {
    currentNumber = "0";
    previousNumber = null;
    currentOperator = null;
    shouldReset = false;
    updateInput();
    return;
  }
  
  if (previousNumber !== null) {
    handleEqualsClick();
  }
  
  previousNumber = currentNumber;
  currentNumber = "0";
  currentOperator = operator;
  shouldReset = false;
}

const handleDecimalClick = () => {
  if (!currentNumber.includes(".")) {
    currentNumber += ".";
    shouldReset = false;
    updateInput();
  }
}

const handleEqualsClick = () => {
  const current = parseFloat(currentNumber);
  const previous = parseFloat(previousNumber);

  if (currentOperator === "+") {
    currentNumber = previous + current;
  } else if (currentOperator === "-") {
    currentNumber = previous - current;
  } else if (currentOperator === "*") {
    currentNumber = previous * current;
  } else if (currentOperator === "/") {
    currentNumber = previous / current;
  }

  currentNumber = currentNumber.toString();
  previousNumber = null;
  currentOperator = null;
  shouldReset = true;

  updateInput();
}

buttons.addEventListener("click", (event) => {
  const element = event.target;

  if (element.classList.contains("button")) {
    handleNumberClick(event);
  } else if (element.classList.contains("operator")) {
    handleOperatorClick(event);
  } else if (element.classList.contains("decimal")) {
    handleDecimalClick();
  } else if (element.classList.contains("equals")) {
    handleEqualsClick();
  }
});
