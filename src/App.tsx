import { useState } from "react";
import "./App.css";

function App() {
  const [display, setDisplay] = useState("0");
  const [previous, setPrevious] = useState<number | null>(null);
  const [operator, setOperator] = useState("");

  function handleClick(value: string) {
    if ("0123456789".includes(value)) {
      if (display === "0") {
        setDisplay(value);
      } else {
        setDisplay(display + value);
      }
      return;
    }

    if (value === ".") {
      if (!display.includes(".")) {
        setDisplay(display + ".");
      }
      return;
    }

    if (["+", "-", "*", "/"].includes(value)) {
      setPrevious(parseFloat(display));
      setOperator(value);
      setDisplay("0");
      return;
    }

    if (value === "=") {
      if (previous !== null) {
        const current = parseFloat(display);
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

        setDisplay(result.toString());
        setPrevious(null);
        setOperator("");
      }
      return;
    }

    if (value === "Clear") {
      setDisplay("0");
      setPrevious(null);
      setOperator("");
    }
  }

  return (
    <div className="calculator">

      <h1>NeoCalc</h1>

      <div className="display">
        {display}
      </div>

      <div className="buttons">

        <button onClick={() => handleClick("Clear")}>Clear</button>
        <button onClick={() => handleClick("/")}>/</button>
        <button onClick={() => handleClick("*")}>*</button>
        <button onClick={() => handleClick("-")}>-</button>

        <button onClick={() => handleClick("7")}>7</button>
        <button onClick={() => handleClick("8")}>8</button>
        <button onClick={() => handleClick("9")}>9</button>
        <button onClick={() => handleClick("+")}>+</button>

        <button onClick={() => handleClick("4")}>4</button>
        <button onClick={() => handleClick("5")}>5</button>
        <button onClick={() => handleClick("6")}>6</button>

        <button onClick={() => handleClick("1")}>1</button>
        <button onClick={() => handleClick("2")}>2</button>
        <button onClick={() => handleClick("3")}>3</button>

        <button onClick={() => handleClick(".")}>.</button>
        <button onClick={() => handleClick("0")}>0</button>
        <button onClick={() => handleClick("=")}>=</button>

      </div>

    </div>
  );
}

export default App;
