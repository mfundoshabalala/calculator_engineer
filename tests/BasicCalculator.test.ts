import { BasicCalculator } from '../app';

describe('BasicCalculator', () => {
	let calculator: BasicCalculator;

	beforeEach(() => {
		calculator = new BasicCalculator();
	});

	test('should start with 0', () => {
		expect(calculator.getCurrentCalculation()).toBe('0');
	});

	test('should append value correctly', () => {
		calculator.appendValue('2');
		expect(calculator.getCurrentCalculation()).toBe('2');
	});

	test('should evaluate addition correctly', () => {
		calculator.appendValue('2');
		calculator.appendValue('+');
		calculator.appendValue('3');
		expect(calculator.evaluate(calculator.getCurrentCalculation())).toBe(5);
	});

	test('should evaluate subtraction correctly', () => {
		calculator.appendValue('7');
		calculator.appendValue('-');
		calculator.appendValue('5');
		expect(calculator.evaluate(calculator.getCurrentCalculation())).toBe(2);
	});

	test('should handle negative numbers correctly', () => {
		calculator.appendValue('-');
		calculator.appendValue('6');
		expect(calculator.getCurrentCalculation()).toBe('-6');
		expect(calculator.evaluate(calculator.getCurrentCalculation())).toBe(-6);
	});

	test('should clear all', () => {
		calculator.appendValue('5');
		calculator.clearAll();
		expect(calculator.getCurrentCalculation()).toBe('0');
	});

	test('should delete last character', () => {
		calculator.appendValue('7');
		calculator.appendValue('6');
		calculator.deleteLast();
		expect(calculator.getCurrentCalculation()).toBe('7');
	});

	test('should not evaluate if there is no valid operator', () => {
		calculator.appendValue('2');
		expect(calculator.evaluate(calculator.getCurrentCalculation())).toBe(2);
	});

	test('should evaluate complex expression correctly', () => {
		calculator.appendValue('10');
		calculator.appendValue('+');
		calculator.appendValue('15');
		calculator.appendValue('-');
		calculator.appendValue('5');
		expect(calculator.evaluate(calculator.getCurrentCalculation())).toBe(20);
	});

	// NOTE: Edge cases
	test('should not allow leading "+" without a number', () => {
    calculator.appendValue('+');
    expect(calculator.getCurrentCalculation()).toBe('0');
	});

	test('should allow leading "-" to denote negative number', () => {
		calculator.appendValue('-');
		calculator.appendValue('5');
		expect(calculator.getCurrentCalculation()).toBe('-5');
	});

	test('should not evaluate if expression ends with an operator', () => {
    calculator.appendValue('5');
    calculator.appendValue('+');
    expect(calculator.getCurrentCalculation()).toBe('5 + ');

    calculator.evaluate(calculator.getCurrentCalculation());
    expect(calculator.getCurrentCalculation()).toBe('5');  // Operator gets trimmed, no evaluation occurs
	});

});
