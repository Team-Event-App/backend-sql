var express = require('express');
var router = express.Router();
const Event = require('../controller/Event')

const multer = require("multer");
const { validateAdmin, validateUser } = require ('../validation')

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

router.get ('/show',Event.getAllData)
router.get('/show/:eventId', Event.getDataById)
router.get('/getTitle', Event.getTitle)
router.get('/getCategory', Event.getCategory)

router.post('/create',validateUser, upload.single("imageEvent"), Event.createData)
router.delete('/delete/:eventId',validateUser, Event.deleteById)
router.put('/edit/:eventId',validateUser, Event.updateDataById)

router.get('/getByUserId/:userId',validateAdmin, Event.getByUserId)

module.exports = router;
