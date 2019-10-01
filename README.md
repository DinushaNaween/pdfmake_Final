API endpoints
  * Get all staff details
  * Get period attendance of all employees
  * Get single employee attendance

1. Get all staff details

  * endpoint: '/LC/StaffDetails'
  * method: GET

2. Get period attendance of all employee

  * endpoint: '/Staff/PeriodAttendance'
  * method: POST
  * body: 
          {
	          "startDay": "2019-05-23",
	          "endDay": "2019-05-26"
          }

3. Get single employee attendance

  * endpoint: '/Staff/SingleMemberAttendance'
  * method: POST
  * body: 
          {
            "startDay": "2019-05-23",
            "endDay": "2019-06-17",
            "staffNo": 90
          }