const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const privateKey = "testing123";

const validationRegister = require("../validation/Register");
const Models = require("../models");
const User = Models.User


module.exports = {
  register: ((req, res, next) => {
    const { errors, isValid } = validationRegister(req.body );
    if (!isValid) {
        return res
            .status(400)
            .json(errors)
    }
    User
        .findOne({where: {email: req.body.email}})
        .then(user => {
            if (user) {
                return res
                    .status(400)
                    .json({email: "Email already exists"});
            } else {
                const newUser = new User({
                  username : req.body.username,
                  fullname: req.body.fullname,
                  phone: req.body.phone,
                  email: req.body.email,
                  password: req.body.password,
                  imageUrl : req.file && req.file.path,})
                bcrypt.genSalt(10, (err, salt) => {
                    bcrypt.hash(newUser.password, salt, (err, hash) => {
                        if (err) 
                            throw err;
                        newUser.password = hash;
                        newUser
                            .save()
                            .then(user => res.json(user))
                            .catch(err => console.log(err));
                    });
                })
            }
        })
}),

authenticated: (req, res) => {
  User.findOne({where: { email: req.body.email }}).then((user) => {
    if (!user) {
      return res.status(404).json({ email: "Email not Found" });
    }
    bcrypt.compare(req.body.password, user.password).then((isMatch) => {
      if (isMatch) {
        const payload = {
          id: user.id,
          fullname: user.fullname,
        };
        jwt.sign(
          payload,
          privateKey,
          {
            expiresIn: "1d",
          },
          (err, token) => {
            res.json(token);
          }
        );
      } else {
        return res.status(400).json("Password Incorrect");
      }
    });
  });
},

      getAllData: (req, res, next) => {
        User.findAll({ })      
        .then((result) => {
            res.json({ status: "200", data: result });
          })
          .catch((err) => err);
      },
      updateDataById: (req, res) => {
          User.update({
            username: req.body.username,
            fullname: req.body.fullname,
            phone: req.body.phone,
            email: req.body.email,
            password : req.body.password,
            imageUrl : req.body.imageUrl
          }, {
            where: {id : req.params.userId}
          })
          .then((result) => res.json(result))
          .catch ((err) => {
          throw err;
      })
      },
      getDataById: (req, res) => {
        User.findAll({
          where: {id : req.params.userId}
         })
      .then((result)=> res.json(result))
      .catch((err) => {
          throw err;
      })
      },
      deleteById: (req, res) => {
        User.destroy({
          where: {id: req.params.eventId}
        })
      .then((result) => res.json(result))
      .catch ((err) => {
          throw err;
      })
      }
  
  }
 