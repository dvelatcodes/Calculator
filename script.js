console.log("javascript connected");
// creating class object
// creating class object
class Calculator {
  constructor(previousOperandTextElement, currentOperandTextElement) {
    this.previousOperandTextElement = previousOperandTextElement;
    this.currentOperandTextElement = currentOperandTextElement;
    this.clear();
  }

  clear() {
    this.previousOperand = "";
    this.currentOperand = "";
    this.operation = undefined;
  }

  delete() {
    this.currentOperand = this.currentOperand.toString().slice(0, -1);
  }

  appendNumber(number) {
    if (number === "." && this.currentOperand.includes(".")) return;
    this.currentOperand = this.currentOperand.toString() + number.toString();
  }

  chooseOperation(operation) {
    if (operation === "") return;
    if (this.previousOperand !== "") this.compute();
    this.operation = operation;
    this.previousOperand = this.currentOperand;
    this.currentOperand = "";
  }

  compute() {
    let computation;
    const prev = parseFloat(this.previousOperand);
    const current = parseFloat(this.currentOperand);
    if (isNaN(prev) || isNaN(current)) return;
    switch (this.operation) {
      case "+":
        computation = prev + current;
        break;
      case "-":
        computation = prev - current;
        break;
      case "*":
        computation = prev * current;
        break;
      case "÷":
        computation = prev / current;
        break;
      default:
        return;
    }
    this.currentOperand = computation;
    this.operation = undefined;
    this.previousOperand = "";
  }

  getDisplayNumber(number) {
    let stringNum = number.toString();
    let integerDigits = parseFloat(stringNum.split(".")[0]);
    let decimalDigits = number.toString().split(".")[1];
    let displayDigits;
    if (isNaN(integerDigits)) return (displayDigits = "");
    else {
      displayDigits = integerDigits.toLocaleString("en", {
        maximumFractionDigits: 0,
      });
    }
    if (decimalDigits != null) return `${displayDigits}.${decimalDigits}`;
    else {
      return displayDigits;
    }
  }

  updateDisplay() {
    this.currentOperandTextElement.innerText = this.getDisplayNumber(
      this.currentOperand
    );
    if (this.operation != null) {
      this.previousOperandTextElement.innerText = `${this.getDisplayNumber(
        this.previousOperand
      )} ${this.operation}`;
    } else {
      this.previousOperandTextElement.innerText = "";
    }
  }
}
// ---------------------------------------------------------------------------------------------------------
// getting all our required elements from html document
// getting all our required elements from html document
const numberBtn = document.querySelectorAll("[data-number]");
const operationBtn = document.querySelectorAll("[data-operation]");
const equalsBtn = document.querySelector("[data-equals]");
const allClearBtn = document.querySelector("[data-all-clear");
const deleteBtn = document.querySelector("[data-delete]");
const previousOperandTextElement = document.querySelector(
  "[data-previous-operand]"
);
const currentOperandTextElement = document.querySelector(
  "[data-current-operand]"
);
// ---------------------------------------------------------------------------------------------------------
// assigning of new calculator function
// assigning of new calculator function
const calculator = new Calculator(
  previousOperandTextElement,
  currentOperandTextElement
);
// ---------------------------------------------------------------------------------------------------------
//  number event listener
//  number event listener
numberBtn.forEach((btn) => {
  btn.addEventListener("click", () => {
    calculator.appendNumber(btn.innerText);
    calculator.updateDisplay();
  });
});
// ---------------------------------------------------------------------------------------------------------
// operation event listener
// operation event listener
operationBtn.forEach((btn) => {
  btn.addEventListener("click", () => {
    calculator.chooseOperation(btn.innerText);
    calculator.updateDisplay();
  });
});
// ---------------------------------------------------------------------------------------------------------
// clear all buttons event listener
// clear all buttons event listener
allClearBtn.addEventListener("click", () => {
  calculator.clear();
  calculator.updateDisplay();
});
// ---------------------------------------------------------------------------------------------------------
//equalsBtn event listener
//equalsBtn event listener
equalsBtn.addEventListener("click", () => {
  calculator.compute();
  calculator.updateDisplay();
});

// deleteBtn event listener
// deleteBtn event listener
deleteBtn.addEventListener("click", () => {
  calculator.delete();
  calculator.updateDisplay();
});
