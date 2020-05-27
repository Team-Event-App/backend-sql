module.exports = {
    validateUser(req, res, next) {
        jwt.verify(req.headers["access-token"], privateKey => {
          if (err) {
            res.status(401).json({...err, message: "please log in again"});
          } else {
            req.body.userId = "admin@gmail.com";
           
            next();
          }
        });
      }
}