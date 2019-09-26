const express = require('express');
const router = express.Router();

var staffReports = require('../LC/staffDetails');

router.post('/StaffDetails', (req, res) => {
  console.log('testRoute');
  if(req.body.report === 'ok'){
    staffReports.generateStaffDetailsReport();
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