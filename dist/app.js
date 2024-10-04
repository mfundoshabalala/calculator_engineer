export class BasicCalculator {
    constructor() {
        this.currentCalculation = '0';
        this.result = null;
        this.newCalculation = true;
        this.calculationCompleted = false;
    }
    evaluate(expression) {
        var _a;
        const trimmedExpression = expression.trim();
        const endsWithOperator = /[+\-]$/.test(trimmedExpression);
        if (endsWithOperator) {
            const expressionWithoutOperator = trimmedExpression.slice(0, -1).trim();
            this.currentCalculation = expressionWithoutOperator || '0';
            return null;
        }
        try {
            this.result = this.evaluateExpression(trimmedExpression);
            this.currentCalculation = ((_a = this.result) === null || _a === void 0 ? void 0 : _a.toString()) || '0';
            this.newCalculation = true;
            this.calculationCompleted = true;
            return this.result;
        }
        catch (_b) {
            this.currentCalculation = 'Error';
            this.result = null;
            this.newCalculation = true;
            this.calculationCompleted = true;
            return null;
        }
    }
    clearAll() {
        this.currentCalculation = '0';
        this.result = null;
        this.newCalculation = true;
        this.calculationCompleted = false;
    }
    clearEntry() {
        this.currentCalculation = '0';
    }
    deleteLast() {
        if (this.currentCalculation.length > 1 && this.currentCalculation !== '0') {
            this.currentCalculation = this.currentCalculation.slice(0, -1);
        }
        else {
            this.currentCalculation = '0';
        }
    }
    appendValue(value) {
        var _a;
        const lastChar = this.currentCalculation.trim().slice(-1);
        if (value === '+' && (this.currentCalculation === '0' || lastChar === '+' || lastChar === '-')) {
            return;
        }
        if (value === '-' && this.currentCalculation === '0') {
            this.currentCalculation = '-';
            return;
        }
        if (this.calculationCompleted && !isNaN(Number(value))) {
            this.currentCalculation = value;
            this.calculationCompleted = false;
        }
        else if (this.calculationCompleted && value === '.') {
            this.currentCalculation = '0.';
            this.calculationCompleted = false;
        }
        else {
            if (this.calculationCompleted) {
                this.currentCalculation = ((_a = this.result) === null || _a === void 0 ? void 0 : _a.toString()) || '0';
                this.calculationCompleted = false;
            }
            if (value === '+' || value === '-') {
                if (lastChar !== '+' && lastChar !== '-') {
                    this.currentCalculation += ` ${value} `;
                }
            }
            else if (value === '.') {
                const parts = this.currentCalculation.split(/[\+\-]/);
                const lastPart = parts[parts.length - 1];
                if (!lastPart.includes('.')) {
                    this.currentCalculation += value;
                }
            }
            else if (!isNaN(Number(value))) {
                if (this.currentCalculation === '0' && value !== '.') {
                    this.currentCalculation = value;
                }
                else {
                    this.currentCalculation += value;
                }
            }
        }
    }
    getCurrentCalculation() {
        return this.currentCalculation || '0';
    }
    evaluateExpression(expression) {
        const tokens = expression.split(' ').filter(token => token.length > 0);
        const numbers = [];
        const operators = [];
        for (const token of tokens) {
            if (!isNaN(Number(token))) {
                numbers.push(Number(token));
            }
            else if (token === '+' || token === '-') {
                while (operators.length && this.hasPrecedence(operators[operators.length - 1], token)) {
                    this.compute(numbers, operators.pop());
                }
                operators.push(token);
            }
        }
        while (operators.length) {
            this.compute(numbers, operators.pop());
        }
        return numbers.length > 0 ? numbers[0] : null;
    }
    hasPrecedence(op1, op2) {
        return (op1 === '+' || op1 === '-') && (op2 === '+' || op2 === '-');
    }
    compute(numbers, operator) {
        const b = numbers.pop();
        const a = numbers.pop();
        let result = 0;
        if (operator === '+') {
            result = a + b;
        }
        else if (operator === '-') {
            result = a - b;
        }
        numbers.push(result);
    }
}
export class CalculationHistory {
    constructor() {
        this.history = [];
    }
    addEntry(entry) {
        this.history.push(entry);
    }
    getHistory() {
        return this.history;
    }
    clearHistory() {
        this.history = [];
    }
}
export class CalculatorUI {
    constructor(calculator, history) {
        this.lastExpression = '';
        this.showingFullExpression = false;
        this.calculator = calculator;
        this.history = history;
        this.display = document.getElementById('display');
        this.historyDisplay = document.getElementById('history');
        this.initializeButtons();
        this.updateDisplay();
    }
    updateDisplay() {
        if (this.display) {
            if (this.showingFullExpression) { // Display formatted expression when '=' has been pressed
                this.display.innerHTML = this.formatDisplay(this.lastExpression);
            }
            else {
                // Display normal expression while inputting
                this.display.innerText = this.calculator.getCurrentCalculation();
            }
        }
    }
    formatDisplay(expression) {
        const parts = expression.split(' = ');
        const expressionPart = parts[0];
        const resultPart = parts.length === 2 ? parts[1] : '';
        // Dynamically adjust font size based on the length of the expression
        const expressionFontSize = '1.825rem'; // Decrease size for the expression
        const resultFontSize = '2rem'; // Keep the default size for the result
        return `<span style="font-size: ${expressionFontSize};">${expressionPart}</span> = <span style="font-size: ${resultFontSize}; color: black;">${resultPart}</span>`;
    }
    updateHistory() {
        if (this.historyDisplay) {
            this.historyDisplay.innerHTML = this.history.getHistory().join('<br>');
        }
    }
    isValidExpression(expression) {
        return /[+\-×÷]/.test(expression.slice(1)); // expression has to contain atleast one operator
    }
    initializeButtons() {
        document.querySelectorAll('.btn').forEach(button => {
            if (button.classList.contains('disabled')) {
                button.disabled = true;
                return;
            }
            button.addEventListener('click', (event) => {
                const target = event.target;
                const value = target.dataset.value || target.innerText.trim();
                switch (value) {
                    case 'CE':
                        this.calculator.clearEntry();
                        this.lastExpression = '';
                        this.showingFullExpression = false;
                        break;
                    case 'AC':
                        this.calculator.clearAll();
                        this.history.clearHistory();
                        this.updateHistory();
                        this.lastExpression = '0';
                        this.showingFullExpression = false;
                        break;
                    case 'Back':
                        this.calculator.deleteLast();
                        break;
                    case '=':
                        const originalExpression = this.calculator.getCurrentCalculation();
                        if (this.isValidExpression(originalExpression)) {
                            const result = this.calculator.evaluate(originalExpression);
                            if (result !== null) {
                                this.lastExpression = `${originalExpression} = ${result}`;
                                this.display.innerText = this.lastExpression;
                                this.showingFullExpression = true;
                            }
                        }
                        else {
                            this.display.innerText = originalExpression;
                        }
                        break;
                    default:
                        if (this.lastExpression && this.isValidExpression(this.lastExpression.split(' = ')[0])) {
                            this.history.addEntry(this.lastExpression);
                            this.lastExpression = '';
                            this.updateHistory();
                        }
                        this.showingFullExpression = false;
                        this.calculator.appendValue(value);
                        break;
                }
                this.updateDisplay();
            });
        });
    }
}
const calculator = new BasicCalculator();
const calculatorHistory = new CalculationHistory();
const calculatorUI = new CalculatorUI(calculator, calculatorHistory);
