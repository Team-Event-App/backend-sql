const Model = require("../models");

const Booking = Model.Booking
const Event = Model.Event
const User = Model.User
module.exports = {
    createData: (req,res) => {
        Booking.create({
            name : req.body.name,
            quantity : req.body.quantity,
            total : req.body.total,
            eventId : req.body.eventId
        })
        .then((result)=> {
            res.json(result)
        })
        .catch((err)=> {
            throw err;
        })
    },
    updateDataById: (req, res) => {
        Booking.update({
            name : req.body.name,
            quantity : req.body.quantity,
            total : req.body.total,
            eventId : req.body.eventId
        }, {
          where: {id : req.params.bookingId}
        })
        .then((result) => res.json(result))
        .catch ((err) => {
        throw err;
    })
    },
    getAllData: (req,res)=> {
        Booking.findAll({  include: [
            // show joining table with include configure
            { 
              model: Event,
              as: 'event',
              include: [{model: User, as: 'user'}]
            }
          ]
    })
        .then((result) => res.json(result))
        .catch((err)=> {
            throw err;
        })
    },
    getDataById: (req, res) => {
        Booking.findAll({where: {id : req.params.bookingId}

})
        .then((result)=> res.json(result))
        .catch((err) => {
            throw err;
        })
    },
    deleteById: (req, res) => {
        Booking.destroy({
            where: {id: req.params.bookingId}
          })
        .then((result) => res.json(result))
        .catch ((err) => {
            throw err;
        })
    }
    
}