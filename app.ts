type CalculationResult = number | null;

interface Calculator {
	evaluate(expression: string): CalculationResult;
	clearAll(): void;
	clearEntry(): void;
	deleteLast(): void;
	appendValue(value: string): void;
	getCurrentCalculation(): string;
}

export class BasicCalculator implements Calculator {
	private currentCalculation = '0';
	private result: CalculationResult = null;
	private newCalculation = true;
	private calculationCompleted = false;

	evaluate(expression: string): CalculationResult {
    const trimmedExpression = expression.trim();
    const endsWithOperator = /[+\-]$/.test(trimmedExpression);

    if (endsWithOperator) {
			const expressionWithoutOperator = trimmedExpression.slice(0, -1).trim();
			this.currentCalculation = expressionWithoutOperator || '0';
			return null;
    }

    try {
			this.result = this.evaluateExpression(trimmedExpression);
			this.currentCalculation = this.result?.toString() || '0';
			this.newCalculation = true;
			this.calculationCompleted = true;
			return this.result;
    } catch {
			this.currentCalculation = 'Error';
			this.result = null;
			this.newCalculation = true;
			this.calculationCompleted = true;
			return null;
		}
	}


	clearAll(): void {
		this.currentCalculation = '0';
		this.result = null;
		this.newCalculation = true;
		this.calculationCompleted = false;
	}

	clearEntry(): void {
		this.currentCalculation = '0';
	}

	deleteLast(): void {
		if (this.currentCalculation.length > 1 && this.currentCalculation !== '0') {
			this.currentCalculation = this.currentCalculation.slice(0, -1);
		} else {
			this.currentCalculation = '0';
		}
	}

	appendValue(value: string): void {
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
		} else if (this.calculationCompleted && value === '.') {
			this.currentCalculation = '0.';
			this.calculationCompleted = false;
		} else {
			if (this.calculationCompleted) {
				this.currentCalculation = this.result?.toString() || '0';
				this.calculationCompleted = false;
			}

			if (value === '+' || value === '-') {
				if (lastChar !== '+' && lastChar !== '-') {
						this.currentCalculation += ` ${value} `;
				}
			} else if (value === '.') {
				const parts = this.currentCalculation.split(/[\+\-]/);
				const lastPart = parts[parts.length - 1];
				if (!lastPart.includes('.')) {
						this.currentCalculation += value;
				}
			} else if (!isNaN(Number(value))) {
				if (this.currentCalculation === '0' && value !== '.') {
						this.currentCalculation = value;
				} else {
						this.currentCalculation += value;
				}
			}
		}
	}


	getCurrentCalculation(): string {
		return this.currentCalculation || '0';
	}

	private evaluateExpression(expression: string): CalculationResult {
		const tokens = expression.split(' ').filter(token => token.length > 0);
		const numbers: number[] = [];
		const operators: string[] = [];

		for (const token of tokens) {
			if (!isNaN(Number(token))) {
				numbers.push(Number(token));
			} else if (token === '+' || token === '-') {
				while (operators.length && this.hasPrecedence(operators[operators.length - 1], token)) {
					this.compute(numbers, operators.pop()!);
				}
				operators.push(token);
			}
		}

		while (operators.length) {
			this.compute(numbers, operators.pop()!);
		}

		return numbers.length > 0 ? numbers[0] : null;
	}

	private hasPrecedence(op1: string, op2: string): boolean {
		return (op1 === '+' || op1 === '-') && (op2 === '+' || op2 === '-');
	}

	private compute(numbers: number[], operator: string): void {
		const b = numbers.pop()!;
		const a = numbers.pop()!;
		let result = 0;

		if (operator === '+') {
			result = a + b;
		} else if (operator === '-') {
			result = a - b;
		}

		numbers.push(result);
	}
}

export class CalculationHistory {
	private history: string[] = [];

	addEntry(entry: string): void {
		this.history.push(entry);
	}

	getHistory(): string[] {
		return this.history;
	}

	clearHistory(): void {
		this.history = [];
	}
}

export class CalculatorUI {
	private display: HTMLElement | null;
	private historyDisplay: HTMLElement | null;
	private calculator: Calculator;
	private history: CalculationHistory;
	private lastExpression: string = '';
	private showingFullExpression = false;

	constructor(calculator: Calculator, history: CalculationHistory) {
		this.calculator = calculator;
		this.history = history;
		this.display = document.getElementById('display');
		this.historyDisplay = document.getElementById('history');
		this.initializeButtons();
		this.updateDisplay();
	}

	public updateDisplay(): void {
		if (this.display && !this.showingFullExpression) {
			this.display.innerText = this.calculator.getCurrentCalculation();
		}
	}

	private updateHistory(): void {
		if (this.historyDisplay) {
			this.historyDisplay.innerHTML = this.history.getHistory().join('<br>');
		}
	}

	private isValidExpression(expression: string): boolean {
		return /[+\-×÷]/.test(expression.slice(1));  // expression has to contain atleast one operator
	}

	private initializeButtons(): void {
		document.querySelectorAll('.btn').forEach(button => {
			if (button.classList.contains('disabled')) {
				(button as HTMLButtonElement).disabled = true;
				return;
			}
			button.addEventListener('click', (event) => {
				const target = event.target as HTMLButtonElement;
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
								this.display!.innerText = this.lastExpression;
								this.showingFullExpression = true;
							}
						} else {
							this.display!.innerText = originalExpression;
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
