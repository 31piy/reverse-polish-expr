// Allowed operations with their definitions
const operations = {
  '+': (a, b) => a + b,
  '-': (a, b) => a - b,
  '*': (a, b) => a * b,
  '/': (a, b) => a / b
};

/**
 * Accepts a reverse-polish expression and returns the evaluation result.
 * @param String expression The expression to be parsed
 * @returns The result of the expression
 * @throws Error if the expression couldn't be parsed
 */
function evaluate(expression) {
  let e = expression.slice();
  let grouped;

  // Check for the grouped expressions until they are substituted
  do {
    grouped = e.match(/\([^()]+\)/g);

    // If groups found, evaluate them first and substitute the result in the expression
    if (grouped && grouped.length) {
      grouped.forEach(group => {
        let result = eval(group);
        e = e.replace(group, result);
      });
    }
  } while (grouped && grouped.length);

  return eval(e);
}

/**
 * Accepts an atomic expression, and evaluates it. It also normalizes (removes parentheses) the expression, if required.
 * @param String expression The expression to be parsed
 * @return The result of the expression
 * @throws Error if the expression couldn't be parsed
 */
function eval(expression) {
  // Normalize the expression (removes the parentheses), if required
  let normalizedExpression = normalize(expression);

  // Separate the entities from the expression
  let entities = normalizedExpression.split(' ');

  // Determine the operator
  const operator = entities.shift();

  // Check if the operator is valid
  if (!Object.keys(operations).includes(operator)) {
    throw new Error('Invalid expression');
  }

  // Convert the strings to numbers
  entities = entities.map(item => parseInt(item, 10));

  // Get the first operand
  const first = entities.shift();

  // Apply the operator to the remaining operands
  return entities.reduce((result, item) => {
    return operations[operator](result, item);
  }, first);
}

/**
 * Determines whether an expression is a group. Check if the expression starts and ends with parentheses.
 * @param String expression The expression to be checked
 * @returns true if the expression is a group, false otherwise
 */
function isGroup(expression) {
  return expression && expression[0] === '(' && expression[expression.length - 1] === ')';
}

/**
 * Normalizes an expression.
 * @param String expression The expression to be normalized
 * @returns The normalized expression. If the expression is already normalized, returns the expression itself.
 */
function normalize(expression) {
  if (!isGroup(expression)) {
    return expression;
  }

  return expression.slice(1, -1);
}

// Expose the API to outside world
module.exports = {
  evaluate: evaluate
};