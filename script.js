// Screen switch logic
document.getElementById('startBtn').addEventListener('click', () => {
    const start = document.getElementById('start-screen');
    const generator = document.getElementById('generator-screen');
    start.style.opacity = 0;
    setTimeout(() => {
      start.style.display = 'none';
      generator.style.display = 'block';
      generator.style.opacity = 1;
    }, 400);
  });
  
  // Elements
  const result = document.getElementById('result');
  const passwordLength = document.getElementById('length');
  const upperCase = document.getElementById('uppercase');
  const lowerCase = document.getElementById('lowercase');
  const passwordNumbers = document.getElementById('numbers');
  const passwordSymbols = document.getElementById('symbols');
  const passwordGenerate = document.getElementById('generate');
  const clipBoard = document.getElementById('clipboard');
  
  const randomFunc = {
    lower: getRandomLower,
    upper: getRandomUpper,
    number: getRandomNumber,
    symbol: getRandomSymbol,
  };
  
  // Copy to clipboard
  clipBoard.addEventListener('click', () => {
    const password = result.innerText;
    if (!password) return;
    navigator.clipboard.writeText(password);
    alert('Password copied to clipboard!');
  });
  
  // Generate password
  passwordGenerate.addEventListener('click', () => {
    const length = +passwordLength.value;
    const hasLower = lowerCase.checked;
    const hasUpper = upperCase.checked;
    const hasNumber = passwordNumbers.checked;
    const hasSymbol = passwordSymbols.checked;
  
    result.innerText = generatePassword(
      hasLower,
      hasUpper,
      hasNumber,
      hasSymbol,
      length
    );
  });
  
  function generatePassword(lower, upper, number, symbol, length) {
    let generatedPassword = '';
    const typesCount = lower + upper + number + symbol;
    const typesArr = [{ lower }, { upper }, { number }, { symbol }].filter(
      item => Object.values(item)[0]
    );
  
    if (typesCount === 0) return '';
  
    for (let i = 0; i < length; i += typesCount) {
      typesArr.forEach(type => {
        const funcName = Object.keys(type)[0];
        generatedPassword += randomFunc[funcName]();
      });
    }
  
    return generatedPassword.slice(0, length);
  }
  
  // Random generators
  function getRandomLower() {
    return String.fromCharCode(Math.floor(Math.random() * 26) + 97);
  }
  function getRandomUpper() {
    return String.fromCharCode(Math.floor(Math.random() * 26) + 65);
  }
  function getRandomNumber() {
    return String.fromCharCode(Math.floor(Math.random() * 10) + 48);
  }
  function getRandomSymbol() {
    const symbols = '!@#$%^&*(){}[]=<>/,.';
    return symbols[Math.floor(Math.random() * symbols.length)];
  }
  