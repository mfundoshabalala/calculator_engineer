# Basic Calculator

This is a simple web-based calculator built with **TypeScript** and **HTML**. It supports basic arithmetic operations like addition and subtraction. The calculator also includes an interactive UI with a history log of calculations, and numbers appear from the right of the display, moving to the left as more values are entered.

## Features

- **Basic Arithmetic Operations**: Addition (`+`), Subtraction (`-`)
- **Interactive UI**: Buttons for digits, operations, and control features like clear and delete.
- **Expression Evaluation**: Supports evaluation of simple expressions like `X + Y` or `X - Y`.
- **Input Handling**:
  - Automatically ignores invalid sequences like `0 +` or `X +` (if a second operand is missing).
  - Allows a leading `-` for negative numbers.
  - Numbers input from the right side of the display, moving left.
- **Calculation History**: Displays past calculations.
- **Edge Cases Handled**:
  - Prevents entering invalid expressions like starting with `+` without a number.
  - Allows correct handling of floating point numbers and negative signs.

## Folder Structure

```bash
calculator/
│
├── index.html           # Main HTML file with the calculator layout
├── style.css           # CSS file for styling the calculator
├── app.ts               # TypeScript code implementing calculator logic
├── README.md            # Documentation for the project
└── tests/               # Unit tests for the calculator
```

## Installation

### Prerequisites

- **Node.js** (for compiling TypeScript and running the development server)
- **TypeScript**

### Steps

1. Clone the repository:

   ```bash
   git clone https://github.com/your-username/basic-calculator.git
   cd basic-calculator
   ```
2. Install dependencies
  ```bash
   npm install
   ```
3. Run the application in development
   ```bash
   npm run dev
   ```
4. Open [http://localhost:3000](http://localhost:3000) on your preferred browser to view the application.


## Running Unit Tests

Unit tests are included to check key functionalities, such as preventing invalid expressions (e.g., `X +` without the second operand). To run the tests:

1. Run the test command:

 ```bash
   npm run test
  ```

## Usage

The calculator consists of several buttons for digits (`0-9`), operations (`+`, `-`, `=`), and controls like **Clear All (AC)**, **Clear Entry (CE)**, and **Delete Last**. Here's a breakdown of the main features:

### Basic Controls:

- **Digits (`0-9`)**: Enter numeric values.
- **`+`, `-`**: Add or subtract values.
- **`.`**: Add a decimal point to a number.
- **`=`**: Evaluate the current expression.
- **AC**: Clears all entries and resets the calculator.
- **CE**: Clears the last entered value or the current entry.
- **Back**: Deletes the last entered digit.

### Display Behavior

- The calculator display aligns input numbers from the right.
- If an incomplete expression (like `X +`) is entered, the calculator waits for the second operand and does not evaluate.
- Leading `-` signs are allowed for negative numbers.

### Edge Cases

The calculator handles a few specific edge cases:
- Prevents invalid expressions (e.g., starting with `+`).
- Supports floating point numbers.
- Ignores invalid sequences like `0 +` by displaying only the initial number.
