import { CalculatorUI, BasicCalculator, CalculationHistory } from '../app';

describe('CalculatorUI', () => {
	let ui: CalculatorUI;
	let calculator: BasicCalculator;
	let history: CalculationHistory;

	beforeEach(() => {
		calculator = new BasicCalculator();
		history = new CalculationHistory();
		document.body.innerHTML = `<div id="display"></div><div id="history"></div>`;
		ui = new CalculatorUI(calculator, history);
	});

	test('should update display after button press', () => {
		calculator.appendValue('5');
		ui.updateDisplay();
		expect(document.getElementById('display')!.innerText).toBe('5');
	});
});
