const express = require('express');
const router = express.Router();

let periodAttendance = require('../Staff/periodAttendance');
let singleMemberAttendance = require('../Staff/singaleMemberAttendance');

router.post('/period-attendance', (req, res) => {
    periodAttendance.generatePeriodAttendanceReport(req, res);
})

router.post('/individual-attendance', (req, res) => {
    singleMemberAttendance.generateSingleMemberAttendanceReport(req, res);
})

module.exports = router; 