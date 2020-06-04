var express = require('express');
var router = express.Router();
const User = require('../controller/User')
const jwt = require ('jsonwebtoken')
const privateKey = "testing123";

const { validateAdmin } = require ('../validation/isAdmin')

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
      console.log('decoded.id = ',decoded.id)
      req.userId = decoded.id;
      next();
    }
  });
}


router.post('/register', upload.single("imageUrl"),User.register)
router.post('/login', User.authenticated)
router.get ('/show',validateAdmin, User.getAllData)
router.get ('/show/:userId',User.getDataById)
router.put('/edit/:userId', validateUser, User.updateDataById)
router.delete('/delete/:userId',validateAdmin, User.deleteById)
router.put('/editPassword',validateUser, User.updatePasswordById)
module.exports = router;