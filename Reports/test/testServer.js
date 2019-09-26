const express = require('express');
const router = express.Router();

var staffReports = require('../LC/staffDetails');
// var periodAttendance = require('../Staff/periodAttendance');

router.post('/reportTest', (req, res, next) => {
  console.log('testRoute');
  if(req.body.report === 'ok'){
    staffReports.generateReport();
    res.status(200).json({
      state: true
    })
  } else{
    res.status(500).json({
      state: false
    })
  }
})

module.exports = router; 