let express = require('express');
let app = express();
let bodyparser = require('body-parser');
const cors = require('cors');
let LCRoutes = require('./Reports/Routes/LC');
let StaffRoutes = require('./Reports/Routes/Staff');

app.use(bodyparser.urlencoded({ extended: false }));
app.use(bodyparser.json());
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false}));

app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*"); // update to match the domain you will make the request from
  next();
});

app.use('/lc', LCRoutes);
app.use('/staff', StaffRoutes);


module.exports = app;