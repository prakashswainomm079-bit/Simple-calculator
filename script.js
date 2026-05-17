let display = document.getElementById('display');
let expression = '';

// Append number to display
function appendNumber(num) {
    expression += num;
    updateDisplay();
}

// Append operator to display
function appendOperator(op) {
    if (expression === '') return;
    if (['+', '-', '*', '/', '.'].includes(expression[expression.length - 1])) {
        return; // Prevent multiple operators in a row
    }
    expression += op;
    updateDisplay();
}

// Delete last character
function deleteLastChar() {
    expression = expression.slice(0, -1);
    updateDisplay();
}

// Clear display
function clearDisplay() {
    expression = '';
    updateDisplay();
}

// Calculate the result
function calculate() {
    if (expression === '') return;
    
    try {
        // Using Function constructor instead of eval for better practice
        const result = Function('return ' + expression)();
        expression = result.toString();
        updateDisplay();
    } catch (error) {
        display.value = 'Error';
        expression = '';
        setTimeout(() => {
            display.value = '';
        }, 1500);
    }
}

// Update display
function updateDisplay() {
    display.value = expression || '0';
}

// Allow keyboard input
document.addEventListener('keydown', (e) => {
    if (e.key >= '0' && e.key <= '9') {
        appendNumber(e.key);
    } else if (e.key === '+' || e.key === '-' || e.key === '*' || e.key === '/') {
        appendOperator(e.key);
    } else if (e.key === '.') {
        appendOperator('.');
    } else if (e.key === 'Enter' || e.key === '=') {
        e.preventDefault();
        calculate();
    } else if (e.key === 'Backspace') {
        e.preventDefault();
        deleteLastChar();
    } else if (e.key === 'Escape') {
        clearDisplay();
    }
});