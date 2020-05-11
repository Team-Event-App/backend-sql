const Model = require("../models");

const Event = Model.Event;

module.exports = {
    createData: (req,res) => {
        Event.create({
            title : req.body.title,
            category : req.body.category,
            description : req.body.description,
            imageEvent : req.file && req.file.path,
            organizerName : req.body.organizerName,
            responsibleName : req.body.responsibleName,
            typeEvent : req.body.typeEvent,
            location : req.body.location,
            date : req.body.date,
            limitPeople : req.body.limitPeople,
            price : req.body.price,
            detail : req.body.detail,
            userId : req.body.userId
        })
        .then((result)=> {
            console.log(result)
            res.json(result)
        })
        .catch((err)=> {
            throw err;
        })
    },
    updateDataById: (req, res) => {
        Event.update({
            title : req.body.title,
            category : req.body.category,
            description : req.body.description,
            imageEvent : req.body.imageEvent,
            organizerName : req.body.organizerName,
            responsibleName : req.body.responsibleName,
            typeEvent : req.body.typeEvent,
            location : req.body.location,
            date : req.body.date,
            limitPeople : req.body.limitPeople,
            price : req.body.price,
            detail : req.body.detail,
            userId : req.body.userId
        }, {
          where: {id : req.params.eventId}
        })
        .then((result) => res.json(result))
        .catch ((err) => {
        throw err;
    })
    },
    getAllData : (req,res)=>{
        Event.findAll({include: "user"})        
        .then((result) => res.json(result))
        .catch((err)=> {
            throw err;
        })
    },
   
    getDataById: (req, res) => {
        Event.findAll({
            where: {id : req.params.eventId}
         })
        .then((result)=> res.json(result))
        .catch((err) => {
            throw err;
        })
    },
    deleteById: (req, res) => {
        Event.destroy({
            where: {id: req.params.eventId}
          })
        .then((result) => res.json(result))
        .catch ((err) => {
            throw err;
        })
    }
    
}