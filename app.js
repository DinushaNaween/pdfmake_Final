let express = require('express');
let app = express();
let bodyparser = require('body-parser');

let LCRoutes = require('./Reports/Routes/LC');
let StaffRoutes = require('./Reports/Routes/Staff');

app.use(bodyparser.urlencoded({ extended: false }));
app.use(bodyparser.json());

app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept, Authorization"
  );
  if (req.method === 'OPTIONS') {
    res.header('Access-Control-Allow-Methods', 'PUT, POST, PATCH, DELETE')
    return res.status(200).json({});
  }
  next();
});

app.get('/', (req, res, next) => {
  console.log("Hello World");
  res.status(200).json({
    state: true
  })
})

app.use('/LC', LCRoutes);
app.use('/Staff', StaffRoutes);

app.use((req, res, next) => {
  const error = new Error('Not Found');
  error.status(404);
  next(error);
});

app.use((error, req, res, next) => {
  res.status(error.status || 500);
  res.json({
    error: {
      message: error.message
    }
  });
});

module.exports = app;