var express = require('express');
var app = express();
var bodyparser = require('body-parser');

var testRoutes = require('./Reports/test/testServer');

app.use(bodyparser.urlencoded({ extended: false }));
app.use(bodyparser.json());

app.use((req, res) => {
  if (req.method === 'OPTIONS') {
    return res.status(200).json({});
  }
});

app.get('/', (req, res) => {
  console.log("Hello ClzMate");
  res.status(200).json({
    state: true
  });
});

app.use((error, req, res) => {
  res.status(error.status || 500);
  res.json({
    error: {
      message: error.message
    }
  });
});

app.use('/lc', testRoutes);


module.exports = app;