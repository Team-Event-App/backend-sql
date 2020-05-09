const Model = require("../models");

const Event = Model.Event;

module.exports = {
    createData: (req,res) => {
        Event.create ({
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
            detail : req.body.detail,
            userId : req.body.userId

        })
        .then((result)=> res.json(result))
        .catch((err)=> {
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
            where: {id : req.params.eventId},
            truncate: true
          })
        .then((result)=> res.json(result))
        .catch((err) => {
            throw err;
        })
    },

    deleteById: (req, res) => {
        const id = req.params.id
        Event.findAll(id)
        .then( resultToDelete=>{
            resultToDelete.destroy(id); 
        })
        .then( resultAfterDestroy=>{
            console.log("Deleted :",resultAfterDestroy);
        })
        .catch(err=> console.log(err));
    }
}