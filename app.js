// Require external modules
const express = require('express');
const path = require('path');
const app = express();

// Require our evaluator module
const evaluator = require('./evaluator');

// Bind path specific handlers
app.use(express.static('./node_modules'));
app.use('/assets', express.static('./assets'));

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'index.html'));
});

app.get('/evaluate', (req, res) => {
  // Get expression from the query parameter
  const expression = req.query['expression'];

  try {
    // Try evaluating the expression and send the result to client
    res.status(200).send(String(evaluator.evaluate(expression)));
  } catch (e) {
    // If anything goes wrong, print the error to console, and sent the error response to client
    console.error('Error while evaluating expression', e);
    res.status(422).send('');
  }
});

// Listen to the port (starts the server)
app.listen(3000, () => {
  console.log('App is running on port 3000. Visit http://localhost:3000 to get started.');
});
