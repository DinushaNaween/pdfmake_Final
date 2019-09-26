const express = require('express');
const router = express.Router();

router.get('/reportTest', (req, res, next) => {
  console.log('testRoute');
})

module.exports = router;