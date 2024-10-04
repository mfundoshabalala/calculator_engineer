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


