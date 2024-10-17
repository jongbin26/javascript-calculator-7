import {
    SEPERATOR_STRING,
    DEFAULT_SEPERATOR,
    NUMBER_PATTERN,
    SEPERATOR_SUBTITUTE,
    NULL_STRING,
    ERROR_MESSAGE
} from '../constant/index.js'

function getSeperatorArray(expression){
    const seperator = DEFAULT_SEPERATOR;
    if(hasCustomSeperator(expression)){
        const seperatorStartIndex = expression.indexOf(SEPERATOR_STRING.START) + 2;
        const seperatorEndIndex = expression.indexOf(SEPERATOR_STRING.END);
        seperator.push(expression.slice(seperatorStartIndex, seperatorEndIndex))
    }
    return seperator;
}

function getExpressionString(expression){
    if(hasCustomSeperator(expression)){
        const expressionStartIndex = expression.indexOf(SEPERATOR_STRING.END) + 2;
        return expression.slice(expressionStartIndex);
    }
    return expression;
}

function hasCustomSeperator(expression){
    return expression.startsWith(SEPERATOR_STRING.START) && expression.includes(SEPERATOR_STRING.END);
}

function hasSeperatorError(expression, seperatorArray){
    seperatorArray.map((seperator) => {
        expression = expression.replaceAll(seperator, NULL_STRING);
    })
    return NUMBER_PATTERN.test(expression);
}

function hasExpressionError(numArray){
    return numArray.includes(NULL_STRING) || numArray.includes(SEPERATOR_SUBTITUTE.repeat(2));
}

function checkExpressionError(expression, seperetorArray, numArray){
    if(hasSeperatorError(expression, seperetorArray)){
        throw new Error(ERROR_MESSAGE.OTHER_CHARACTER);
    }
    if(hasExpressionError(numArray)){
        throw new Error(ERROR_MESSAGE.INVALID_EXPRESSION);
    }
}

function splitBySeperator(expression, seperatorArray){
    seperatorArray.map((seperator) => {
        expression = expression.replaceAll(seperator, SEPERATOR_SUBTITUTE);
    })
    return expression.split(SEPERATOR_SUBTITUTE);
}

function sumArray(array){
    return array.reduce((acc, num) => acc + parseInt(num), 0);
}

export {
    getSeperatorArray,
    getExpressionString,
    checkExpressionError,
    splitBySeperator,
    sumArray,
}