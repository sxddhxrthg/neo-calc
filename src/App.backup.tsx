import React, { useState } from 'react';
import "./App.css";
function App() {
  const [currentDisplay, setCurrentDisplay] = useState<string>('0');
  const [previous, setPrevious] = useState<number | null>(null);
  const [operator, setOperator] = useState<string | null>(null);

  const handleButtonClick = (buttonValue: string) => {
    if (buttonValue === 'C') {
      setCurrentDisplay('0');
      setPrevious(null);
      setOperator(null);
      return;
    }

    if (buttonValue === '=') {
      if (previous !== null && operator !== null) {
        let result: number;
        switch (operator) {
          case '+':
            result = previous + parseFloat(currentDisplay);
            break;
          case '-':
            result = previous - parseFloat(currentDisplay);
            break;
          case '*':
            result = previous * parseFloat(currentDisplay);
            break;
          case '/':
            if (parseFloat(currentDisplay) !== 0) {
              result = previous / parseFloat(currentDisplay);
            } else {
              result = 0;
            }
            break;
          default:
            result = 0;
        }
        setCurrentDisplay(result.toString());
        setPrevious(null);
        setOperator(null);
      }
      return;
    }

    if (buttonValue === '0' || buttonValue === '1' || buttonValue === '2' || buttonValue === '3' || buttonValue === '4' || buttonValue === '5' || buttonValue === '6' || buttonValue === '7' || buttonValue === '8' || buttonValue === '9') 
{
if (currentDisplay === '0') {
  setCurrentDisplay(buttonValue);
} else {
  setCurrentDisplay(currentDisplay + buttonValue);
}    }

    if (buttonValue === '+' || buttonValue === '-' || buttonValue === '*' || buttonValue === '/') {
      setPrevious(parseFloat(currentDisplay));
      setOperator(buttonValue);
      setCurrentDisplay('0');
    }
  };

  
return (
  <div className="calculator">
    <h1>NeoCalc</h1>

    <div className="display">{currentDisplay}</div>

    <div className="row">
      <button onClick={() => handleButtonClick('C')}>C</button>
      <button onClick={() => handleButtonClick('/')}>/</button>
      <button onClick={() => handleButtonClick('*')}>*</button>
      <button onClick={() => handleButtonClick('-')}>-</button>
    </div>

    <div className="row">
      <button onClick={() => handleButtonClick('7')}>7</button>
      <button onClick={() => handleButtonClick('8')}>8</button>
      <button onClick={() => handleButtonClick('9')}>9</button>
      <button onClick={() => handleButtonClick('+')}>+</button>
    </div>

    <div className="row">
      <button onClick={() => handleButtonClick('4')}>4</button>
      <button onClick={() => handleButtonClick('5')}>5</button>
      <button onClick={() => handleButtonClick('6')}>6</button>
    </div>

    <div className="row">
      <button onClick={() => handleButtonClick('1')}>1</button>
      <button onClick={() => handleButtonClick('2')}>2</button>
      <button onClick={() => handleButtonClick('3')}>3</button>
      <button onClick={() => handleButtonClick('=')}>=</button>
    </div>

    <div className="row">
      <button onClick={() => handleButtonClick('0')}>0</button>
      <button>.</button>
    </div>
  </div>
);  
}

export default App;

