const express = require('express');
const router = express.Router();

var staffReports = require('../LC/staffDetails');

router.get('/StaffDetails', (req, res) => {
  staffReports.generateStaffDetailsReport(req,res);
});


router.get('/test', (req, res) => {
res.end('hi')
});

module.exports = router; 