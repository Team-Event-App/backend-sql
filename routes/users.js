var express = require('express');
var router = express.Router();
const User = require('../controller/User')

/* GET users listing. */
router.post('/register', User.createData )
router.get ('/show',User.getAllData)

module.exports = router;
