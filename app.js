var express = require("express");
var path = require("path");
var cookieParser = require("cookie-parser");
var logger = require("morgan");
const bodyParser = require("body-parser");
const cors = require("cors");
// const jwt = require ('jsonwebtoken')
// const privateKey = "testing123";
require("dotenv").config();

var indexRouter = require("./routes/index");
const UserRouter = require("./routes/users");
const EventRouter = require("./routes/Event");
const BookingRouter = require("./routes/Booking");
const PaymentRouter = require("./routes/Payment");
const ContactRouter = require("./routes/Contact");
const { validateUser } = require("./validation");
var app = express();

app.use(cors());
app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
// app.use(bodyParser.json())
// app.use(bodyParser.urlencoded({extended:false}))

app.use(bodyParser.json({ limit: "50mb" }));
app.use(bodyParser.urlencoded({ extended: true, limit: "50mb" }));

app.use(cookieParser());
app.use("/public", express.static("public"));
app.use(express.static(path.join(__dirname, "public")));

app.use("/", indexRouter);
app.use("/user", UserRouter);
app.use("/event", EventRouter);
app.use("/contact", ContactRouter);
app.use("/booking", validateUser, BookingRouter);
app.use("/payment", validateUser, PaymentRouter);

module.exports = app;

// const nodemailer = require("nodemailer");

// let mailTransporter = nodemailer.createTransport({
//   service: "gmail",
//   auth: {
//     user: "evenityasia@gmail.com",
//     pass: "evanindraariq",
//   },
// });

// let mailDetails = {
//   from: "evenityasia@gmail.com",
//   to: "me@indrakawasan.com",
//   subject: "welcome",
//   text: "Thank you to register in our web",
// };

// mailTransporter.sendMail(mailDetails, function (err, data) {
//   if (err) {
//     console.log("Error Occurs");
//   } else {
//     console.log("Email sent successfully");
//   }
// });

// const accountSid = "AC7ffaea289b86b82f3c89c097da98f459";
// const authToken = "b1e47424916aa924e392d736d641763f";

// const Twilio = require("twilio");
// const client = new Twilio(accountSid, authToken);

// const service = client.notify.services("ISa572e8924707ad0af9ad02745f92b3ae");

// service.notifications
//   .create({
//     toBinding: [
//       JSON.stringify({
//         binding_type: "sms",
//         address: "+6285132405154",
//       }),
//     ],
//     body: "Hello ",
//   })
//   .then((notification) => {
//     console.log(notification);
//   })
//   .catch((error) => {
//     console.log(error);
//   })
//   .done();
