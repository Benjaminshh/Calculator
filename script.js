const add = (a,b) => +a + +b;
const subtract = (a,b) => +a - +b;
const multiply = (a,b) => +a * +b;
const divide = (a,b) => +a / +b;

const operate = function(operator,a,b){
    switch(operator){
        case '+':
            return add(a,b);
            break;
        case '-':
            return subtract(a,b);
            break;
        case 'x':
            return multiply(a,b);
            break;
        case '/':
            return divide(a,b);
            break;
    }
}

const buttons = document.querySelectorAll('.button');
const clearButton = document.querySelector('#clear');
let screen = document.querySelector('#screen');
screen.textContent = '0'
let firstInput = secondInput = theOperator ='';
let operateOccured = false;
let periodPressed = false;
let stopFunction = false;
buttons.forEach((button) => {

    button.addEventListener('click',() => {
        checkInputs(button);
    })

})
clearButton.addEventListener('click',() => {
    clearScreen();
})

const clearScreen = function(){
    firstInput = secondInput = theOperator = '';
    screen.textContent = '0';
    operateOccurred = false;
    stopFunction = false;
}
const displayInput = function(button){
    screen.textContent = screen.textContent + button.textContent;
}

const checkInputs = function(input){
    if(!stopFunction){
        let char = input.textContent
        if(operateOccured){
            operateOccured = false;
        if(input.classList[1] === 'number'){
            firstInput = char;
            secondInput = theOperator = '';
            screen.textContent = firstInput;
        }
        else{
                secondInput = '';
                firstInput = screen.textContent;
                theOperator = char;
            }
        }   
        else
        if(theOperator.length == 0 && input.classList[1] === 'number'){
            if(firstInput.length === 1 && firstInput === '0'){
                firstInput = '';
            }
            if(char === '.'){
                if(firstInput.indexOf('.') !== -1){
                    char = '';
                }
            }
            if(firstInput.length <= 7){
                firstInput += char;
                screen.textContent = firstInput;
            }  
        } else
        if(input.classList[1] === "number"){
            if(secondInput.length == 1 && char === '0' && secondInput === '0'){
                secondInput = '';
            }
            if(char === '.'){
                if(secondInput.indexOf('.') !== -1){
                    char = '';
                }
            }
            if(secondInput.length <= 7){
                secondInput += char
                screen.textContent = secondInput
            }
        } else if(char !== '='){
            if(firstInput.length !== 0){
                theOperator = char;
            }
        }
        if(char === '=' && secondInput.length != 0){
            let result = operate(theOperator,firstInput,secondInput)
            if(result.toString().length > 8){
                result = handlesOverflow(result)
            }
            screen.textContent = result;
            operateOccured = true;
        }
    }
}
 
const handlesOverflow = function(overflowingNumber){
    let number = overflowingNumber;
    let numberString = overflowingNumber.toString();
    let indexOfPeriod = numberString.indexOf('.');
    let exp = 0;
    if(indexOfPeriod <= 7 && indexOfPeriod !== -1){
        return(+overflowingNumber.toFixed(8 - (indexOfPeriod + 1)));
    }
    if(indexOfPeriod === -1){
        exp = numberString.length - 1;
        number /= (10**exp)
    } else{
        exp = indexOfPeriod - 1;
        number /= (10**exp);
    }
    stopFunction = true;
    return(number.toFixed(2)+'e+'+ exp);
}