var express = require('express');
var router = express.Router();
const User = require('../controller/User')

/* GET users listing. */
router.post('/register', User.createData )
router.get ('/show',User.getAllData)
router.get ('/show/:userId', User.getDataById)
router.put('/edit/:userId',User.updateDataById)
module.exports = router;
