const express = require('express');
const router = express.Router();

let periodAttendance = require('../Staff/periodAttendance');
let singleMemberAttendance = require('../Staff/singaleMemberAttendance');

router.post('/PeriodAttendance', (req, res) => {
  console.log('testRoute');
  if(req.body.report === 'ok'){
    periodAttendance.generatePeriodAttendanceReport();
    res.status(200).json({
      state: true
    })
  } else{
    res.status(500).json({
      state: false
    })
  }
})

router.post('/SingleMemberAttendance', (req, res) => {
  console.log('testRoute');
  if(req.body.report === 'ok'){
    singleMemberAttendance.generateSingleMemberAttendanceReport();
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