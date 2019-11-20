const express = require('express');
const router = express.Router();

let staffReports = require('../LC/staffDetails');
let holidayDetails = require('../LC/holidayDetails');

router.post('/staff-details', (req, res) => {
  staffReports.generateStaffDetailsReport(req,res);
});

router.post('/holiday-details', (req, res) => {
  holidayDetails.generateHolidayDetailsReport(req, res);
})

router.get('/test', (req, res) => {
res.end('hi')
});

module.exports = router;  