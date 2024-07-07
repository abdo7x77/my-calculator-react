import React, { useState } from 'react';
import './style.css';

const Calculator = () => {
  const [input, setInput] = useState('');
  const [darkMode, setDarkMode] = useState(false);
  const operators = ['+', '-', 'x', '÷'];
  let decimalAdded = false;

  const handleButtonClick = (btnVal) => {
    if (btnVal === 'C') {
      setInput('');
      decimalAdded = false;
    } else if (btnVal === '=') {
      let equation = input;
      const lastChar = equation[equation.length - 1];

      equation = equation.replace(/x/g, '*').replace(/÷/g, '/');

      if (operators.indexOf(lastChar) > -1 || lastChar === '.')
        equation = equation.replace(/.$/, '');

      if (equation) setInput(eval(equation).toString());

      decimalAdded = false;
    } else if (operators.indexOf(btnVal) > -1) {
      const lastChar = input[input.length - 1];

      if (input !== '' && operators.indexOf(lastChar) === -1)
        setInput(input + btnVal);
      else if (input === '' && btnVal === '-') setInput(input + btnVal);

      if (operators.indexOf(lastChar) > -1 && input.length > 1) {
        setInput(input.replace(/.$/, btnVal));
      }

      decimalAdded = false;
    } else if (btnVal === '.') {
      if (!decimalAdded) {
        setInput(input + btnVal);
        decimalAdded = true;
      }
    } else {
      setInput(input + btnVal);
    }
  };

  const switchTheme = () => {
    setDarkMode(!darkMode);
    document.documentElement.setAttribute('data-theme', darkMode ? 'light' : 'dark');
  };

  return (
    <div className='calculator' id='calc'>
      <div className='toggle'>
        <div className='theme-switch-wrapper'>
          <label className='theme-switch' htmlFor='checkbox'>
            <input id='checkbox' type='checkbox' onChange={switchTheme} />
            <div className='slider round'></div>
          </label>
        </div>
      </div>
      <div className='display'>{input}</div>
      {['C', '+/-', '%', '÷', '7', '8', '9', 'x', '4', '5', '6', '-', '1', '2', '3', '+', '0', '.'].map((key, index) => (
        <span key={index} className={`neumorphic ${key}`} onClick={() => handleButtonClick(key)}>
          {key}
        </span>
      ))}
      <span className='neumorphic equals' onClick={() => handleButtonClick('=')}>
        =
      </span>
    </div>
  );
};

export default Calculator;
