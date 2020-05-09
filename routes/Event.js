var express = require('express');
var router = express.Router();
const Event = require('../controller/Event')

router.post('/create', Event.createData)
router.get ('/show',Event.getAllData)
router.delete('/delete/:eventId', Event.deleteById)
router.get('/show/:eventId', Event.getDataById)
module.exports = router;
