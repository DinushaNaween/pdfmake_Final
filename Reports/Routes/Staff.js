const express = require('express');
const router = express.Router();

let periodAttendance = require('../Staff/periodAttendance');
let singleMemberAttendance = require('../Staff/singaleMemberAttendance');

router.post('/PeriodAttendance', (req, res) => {
    periodAttendance.generatePeriodAttendanceReport(req, res);
})

router.post('/SingleMemberAttendance', (req, res) => {
    singleMemberAttendance.generateSingleMemberAttendanceReport(req, res);
})

module.exports = router; 