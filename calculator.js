const calculator = document.querySelector('.calculator');
const keys = calculator.querySelector('.calculator__keys');
const display = document.querySelector('.calculator__display');
let previousKeyType = null;
let firstValue = null;
let operator = null;

const calculate = (n1, operator, n2) => {
    let result = '';
    
    if(operator === 'add'){
        result = parseFloat(n1) + parseFloat(n2);
    }else if(operator === 'subtract'){
        result = parseFloat(n1) - parseFloat(n2);
    }else if(operator === 'multiply'){
        result = parseFloat(n1) * parseFloat(n2);
    }else if(operator === 'divide'){
        result = parseFloat(n1) / parseFloat(n2);
    }

    return result;
}

//determining the type of key that was pressed using an event delegation patter since all children are of type calculator key
keys.addEventListener('click', e => {
    if (e.target.matches('button')) {
        const key = e.target;
        const action = key.dataset.action;
        const keyContent = key.textContent;
        const displayedNum = display.textContent;


        if (!action) {
            if (displayedNum === '0' || previousKeyType === 'operator') {
              display.textContent = keyContent;
              previousKeyType = null;
              calculator.dataset.previousKey = 'number';
            } else {
              display.textContent = displayedNum + keyContent
            }
          }

        if(
            action === 'add' ||
            action === 'subtract' ||
            action === 'multiply' ||
            action === 'divide' 
        ){
            //custom attribute to know if previous key type was an operator
            previousKeyType = "operator";
            firstValue = displayedNum;
            operator = action;
            key.classList.add('is-depressed');
        }

        if (action === 'decimal') {
          calculator.dataset.previousKey = 'decimal';
          if(!displayedNum.includes('.')){
            display.textContent = displayedNum + '.';
          }
          }
          
          if (action === 'clear') {
            calculator.dataset.previousKey = 'clear';
            display.textContent = '0';
          }
          
          if (action === 'calculate') {
            calculator.dataset.previousKey = 'calculate';
            previousKeyType = null;
            const secondValue = displayedNum;
            display.textContent = calculate(firstValue, operator, secondValue);
          }
        
          //creates array from the children and then removes .is-depressed from them
          //making an array of them first so that we can use .forEach on the array
          //classList operates on each of the elements so that we could call .remove on them
          Array.from(key.parentNode.children)
            .forEach(k => k.classList.remove('.is_depressed'));
    }
});


