var express = require('express');
var router = express.Router();
const Event = require('../controller/Event')
const multer = require("multer");

const storage = multer.diskStorage({
  destination: function (req, res, cb) {
    cb(null, "./public/images");
  },
  filename: function (req, file, cb) {
    cb(null, new Date().toISOString() + file.originalname);
  },
});
const upload = multer({
  storage: storage,
});

router.post('/create',upload.single("imageEvent"), Event.createData)
router.get ('/show',Event.getAllData)
router.delete('/delete/:eventId', Event.deleteById)
router.get('/show/:eventId', Event.getDataById)
router.put('/edit/:eventId', Event.updateDataById)
module.exports = router;
