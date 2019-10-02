API endpoints
  * Get all staff details
  * Get period attendance of all employees
  * Get single employee attendance<br><br>

1. Get all staff details<br>

  * endpoint: '/lc/staff-details'
  * method: GET<br><br>

2. Get period attendance of all employee

  * endpoint: '/staff/period-attendance'
  * method: POST
  * body: <br>
          {<br>
	          "startDay": "2019-05-23",<br>
	          "endDay": "2019-05-26"<br>
          }<br><br>

3. Get single employee attendance<br>

  * endpoint: '/staff/individual-attendance'
  * method: POST
  * body: <br>
          {<br>
            "startDay": "2019-05-23",<br>
            "endDay": "2019-06-17",<br>
            "staffNo": 90<br>
          }<br>