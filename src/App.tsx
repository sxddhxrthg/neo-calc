import React, { useEffect, useState } from "react";
import "./App.css";

function App() {
  const [currentDisplay, setCurrentDisplay] = useState("0");
  const [previous, setPrevious] = useState<number | null>(null);
  const [operator, setOperator] = useState<string | null>(null);

  const handleButtonClick = (buttonValue: string) => {
    if (buttonValue === "C") {
      setCurrentDisplay("0");
      setPrevious(null);
      setOperator(null);
      return;
    }

    if (
      ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9"].includes(buttonValue)
    ) {
      if (currentDisplay === "0") {
        setCurrentDisplay(buttonValue);
      } else {
        setCurrentDisplay(currentDisplay + buttonValue);
      }
      return;
    }

    if (["+", "-", "*", "/"].includes(buttonValue)) {
      setPrevious(parseFloat(currentDisplay));
      setOperator(buttonValue);
      return;
    }

    if (buttonValue === "=") {
      if (previous !== null && operator !== null) {
        const current = parseFloat(currentDisplay);
        let result = 0;

        switch (operator) {
          case "+":
            result = previous + current;
            break;
          case "-":
            result = previous - current;
            break;
          case "*":
            result = previous * current;
            break;
          case "/":
            result = current !== 0 ? previous / current : 0;
            break;
        }

        setCurrentDisplay(result.toString());
        setPrevious(null);
        setOperator(null);
      }
    }
  };

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key >= "0" && e.key <= "9") {
        handleButtonClick(e.key);
      } else if (["+", "-", "*", "/"].includes(e.key)) {
        handleButtonClick(e.key);
      } else if (e.key === "Enter") {
        handleButtonClick("=");
      } else if (e.key === "Backspace") {
        handleButtonClick("C");
      }
    };

    window.addEventListener("keydown", handleKeyDown);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [currentDisplay, previous, operator]);

  return (
    <div className="calculator">
      <h1>NeoCalc</h1>

      <div className="display">{currentDisplay}</div>

      <div className="row">
        <button onClick={() => handleButtonClick("C")}>C</button>
      </div>

      <div className="row">
        <button onClick={() => handleButtonClick("7")}>7</button>
        <button onClick={() => handleButtonClick("8")}>8</button>
        <button onClick={() => handleButtonClick("9")}>9</button>
        <button onClick={() => handleButtonClick("/")}>/</button>
      </div>

      <div className="row">
        <button onClick={() => handleButtonClick("4")}>4</button>
        <button onClick={() => handleButtonClick("5")}>5</button>
        <button onClick={() => handleButtonClick("6")}>6</button>
        <button onClick={() => handleButtonClick("*")}>*</button>
      </div>

      <div className="row">
        <button onClick={() => handleButtonClick("1")}>1</button>
        <button onClick={() => handleButtonClick("2")}>2</button>
        <button onClick={() => handleButtonClick("3")}>3</button>
        <button onClick={() => handleButtonClick("-")}>-</button>
      </div>

      <div className="row">
        <button onClick={() => handleButtonClick("0")}>0</button>
        <button onClick={() => handleButtonClick("=")}>=</button>
        <button onClick={() => handleButtonClick("+")}>+</button>
      </div>
    </div>
  );
}

export default App;
