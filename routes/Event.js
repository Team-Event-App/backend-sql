var express = require('express');
var router = express.Router();
const Event = require('../controller/Event')
const jwt = require("jsonwebtoken");
const privateKey = "testing123";
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
function validateUser(req, res, next) {
  jwt.verify(req.headers["access-token"], privateKey, (err, decoded) => {
    if (err) {
      res.status(401).json({...err, message: "please log in again"});
    } else {
      req.body.userId = decoded.id;
      next();
    }
  });
}
router.post('/create',validateUser, upload.single("imageEvent"), Event.createData)
router.get ('/show',Event.getAllData)
router.delete('/delete/:eventId',validateUser, Event.deleteById)
router.get('/show/:eventId', validateUser, Event.getDataById)
router.put('/edit/:eventId',validateUser, Event.updateDataById)
module.exports = router;
