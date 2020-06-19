const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const privateKey = "testing123";

const validationRegister = require("../validation/register");
const Models = require("../models");
const User = Models.User;
const nodemailer = require("nodemailer");

let mailTransporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: "evenityasia@gmail.com",
    pass: "evanindraariq",
  },
});

module.exports = {
  register: (req, res, next) => {
    const { errors, isValid } = validationRegister(req.body);
    if (!isValid) {
      return res.status(400).json(errors);
    }
    User.findOne({
      where: {
        email: req.body.email,
      },
    }).then((user) => {
      if (user) {
        return res.status(400).json({
          message: "Email already exists",
        });
      } else {
        const newUser = new User({
          username: req.body.username,
          fullname: req.body.fullname,
          phone: req.body.phone,
          email: req.body.email,
          password: req.body.password,
          imageUrl: req.file && req.file.path,
        });
        let mailDetails = {
          from: "evenityasia@gmail.com",
          to: req.body.email,
          subject: "welcome",
          text: "Thank you for register in our website, Explore the web",
        };

        mailTransporter.sendMail(mailDetails, function (err, data) {
          if (err) {
            console.log("Error Occurs");
          } else {
            console.log("Email sent successfully");
          }
        });
        const accountSid = "AC7ffaea289b86b82f3c89c097da98f459";
        const authToken = "b1e47424916aa924e392d736d641763f";

        const Twilio = require("twilio");
        const client = new Twilio(accountSid, authToken);

        const service = client.notify.services(
          "ISa572e8924707ad0af9ad02745f92b3ae"
        );

        service.notifications
          .create({
            toBinding: [
              JSON.stringify({
                binding_type: "sms",
                address: `+62${req.body.phone}`,
              }),
            ],
            body: "Thank you for Register in Our Web ",
          })
          .then((notification) => {
            console.log("success  ");
          })
          .catch((error) => {
            console.log(error);
          })
          .done();
        bcrypt.genSalt(10, (err, salt) => {
          bcrypt.hash(newUser.password, salt, (err, hash) => {
            if (err) throw err;
            newUser.password = hash;
            newUser
              .save()
              .then((user) => res.json(user))
              .catch((err) => console.log(err));
          });
        });
      }
    });
  },

  authenticated: (req, res) => {
    User.findOne({
      where: {
        email: req.body.email,
      },
    }).then((user) => {
      if (!user) {
        return res.status(404).json({
          email: "Email not Found",
        });
      }
      bcrypt.compare(req.body.password, user.password).then((isMatch) => {
        if (isMatch) {
          const payload = {
            id: user.id,
            fullname: user.fullname,
            email: user.email,
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
    User.findAll({})
      .then((result) => {
        res.json({
          status: "200",
          data: result,
        });
      })
      .catch((err) => err);
  },

  // getDataEmail: (req, res, next) => {
  //   User.findOne({
  //       where: {
  //         email: req.body.email
  //       }
  //     })
  //     .then((res) => {
  //         res
  //           .status(400)
  //           .json({
  //             message: "Email already exists"
  //           });
  //         })
  //         .catch((err) => err);
  // },
  getDataEmail: (req, res) => {
    User.findOne({
      where: {
        email: req.params.email,
      },
    }).then((user) => {
      if (user) {
        return res.status(200).json({
          email: "Email already exist",
        });
      } else {
        return res.status(400).json("create");
      }
    });
  },

  updateDataById: (req, res, next) => {
    // bcrypt.hash(req.body.password, 10, function (err, hash) {
    //   if (err)
    //     throw err;
    //req.body.password = hash;

    User.update(
      {
        username: req.body.username,
        fullname: req.body.fullname,
        phone: req.body.phone,
        email: req.body.email,
        // password: hash,
      },
      {
        where: {
          id: req.params.userId,
        },
      }
    )
      .then((respose) => res.json(respose))
      .catch((err) => console.log(err));
  },
  getDataById: (req, res) => {
    User.findOne({
      where: {
        id: req.params.userId,
      },
    })
      .then((result) => res.json(result))
      .catch((err) => {
        throw err;
      });
  },
  deleteById: (req, res) => {
    User.destroy({
      where: {
        id: req.params.userId,
      },
    })
      .then((result) => res.json(result))
      .catch((err) => {
        throw err;
      });
  },
  updatePasswordById: (req, res) => {
    console.log(req.userId);

    User.findOne({
      where: {
        id: req.userId,
      },
    })
      .then((user) => {
        bcrypt.compare(req.body.oldPassword, user.password).then((isMatch) => {
          if (isMatch) {
            bcrypt.hash(req.body.password, 10, function (err, hash) {
              if (err) throw err;
              //req.body.password = hash;

              User.update(
                {
                  password: hash,
                },
                {
                  where: {
                    id: req.userId,
                  },
                }
              )
                .then((respose) => res.json(respose))
                .catch((err) => console.log(err));
            });
          } else {
            return res.status(400).json("Password Incorrect");
          }
        });
      })
      .catch((err) => {
        throw err;
      });
  },
};
