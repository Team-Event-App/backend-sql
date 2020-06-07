const jwt = require('jsonwebtoken')
const privateKey = "testing123";

module.exports.validateAdmin = (req, res, next) => {
  jwt.verify(req.headers["access-token"], privateKey, (err, decoded) => {
    if (decoded.email == "adminsaja@gmail.com" && !err) {
      req.userId = decoded.id;
      next();
    } else {
      res.status(401).json({
        ...err,
        message: "You are not admin"
      });
    }
  });
}

module.exports.validateUser = (req, res, next)=> {
  jwt.verify(req.headers["access-token"], privateKey, (err, decoded) => {
    if (err) {
      res.status(401).json({
        ...err,
        message: "please log in again"
      });
    } else {
      req.userId = decoded.id;
      next();
    }
  });
}