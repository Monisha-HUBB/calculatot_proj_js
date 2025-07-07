// Calculator Buttons
const buttons = [
    'C', '←', '.', '×',
    '7', '8', '9', '/',
    '4', '5', '6', '-',
    '1', '2', '3', '+',
    '0', '00', '='
];

let currentInput = '';
let display;

function createCalculator() {
    const calculator = document.getElementById('calculator');

    // Create display
    display = document.createElement('div');
    display.classList.add('display');
    display.innerText = '0';
    calculator.appendChild(display);

    // Create buttons container
    const buttonsContainer = document.createElement('div');
    buttonsContainer.classList.add('buttons');
    calculator.appendChild(buttonsContainer);

    // Create buttons
    buttons.forEach(btn => {
        const button = document.createElement('button');
        button.innerText = btn;

        if (btn === 'C') button.classList.add('clear');
        if (btn === '=') button.classList.add('equal');

        button.addEventListener('click', () => handleButtonClick(btn));
        buttonsContainer.appendChild(button);
    });

    // Handle keyboard input
    document.addEventListener('keydown', handleKeyboardInput);
}

function handleButtonClick(value) {
    if (value === 'C') {
        currentInput = '';
        updateDisplay('0');
    } else if (value === '←') {
        currentInput = currentInput.slice(0, -1);
        updateDisplay(currentInput || '0');
    } else if (value === '=') {
        try {
            const result = eval(currentInput.replace(/×/g, '*'));
            updateDisplay(result);
            currentInput = result.toString();
        } catch (error) {
            updateDisplay('Error');
            currentInput = '';
        }
    } else {
        currentInput += value;
        updateDisplay(currentInput);
    }
}

function updateDisplay(value) {
    display.innerText = value;
}

function handleKeyboardInput(e) {
    if (e.key >= '0' && e.key <= '9') {
        currentInput += e.key;
        updateDisplay(currentInput);
    } else if (e.key === 'Backspace') {
        currentInput = currentInput.slice(0, -1);
        updateDisplay(currentInput || '0');
    } else if (['+', '-', '*', '/', '.'].includes(e.key)) {
        currentInput += e.key;
        updateDisplay(currentInput);
    } else if (e.key === 'Enter') {
        try {
            const result = eval(currentInput.replace(/×/g, '*'));
            updateDisplay(result);
            currentInput = result.toString();
        } catch (error) {
            updateDisplay('Error');
            currentInput = '';
        }
    } else {
        alert('Only numbers are allowed');
    }
}

createCalculator();
