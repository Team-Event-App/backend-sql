const Model = require("../models");
const Sequelize = require('sequelize')
const {
    like,
    or
} = Sequelize.Op;

const Event = Model.Event;
const User = Model.User

module.exports = {
    createData: (req, res) => {
        Event.create({
                title: req.body.title,
                category: req.body.category,
                description: req.body.description,
                imageEvent: req.file && req.file.path,
                organizerName: req.body.organizerName,
                responsibleName: req.body.responsibleName,
                time: req.body.time,
                location: req.body.location,
                date: req.body.date,
                limitPeople: req.body.limitPeople,
                price: req.body.price,
                detail: req.body.detail,
                userId: req.body.userId || req.userId
            })
            .then((result) => {
                console.log(result)
                res.json(result)
            })
            .catch((err) => {
                throw err;
            })
    },
    updateDataById: (req, res) => {
        Event.update({
                title: req.body.title,
                category: req.body.category,
                description: req.body.description,
                imageEvent: req.file && req.file.path,
                organizerName: req.body.organizerName,
                responsibleName: req.body.responsibleName,
                typeEvent: req.body.typeEvent,
                location: req.body.location,
                date: req.body.date,
                limitPeople: req.body.limitPeople,
                price: req.body.price,
                detail: req.body.detail,
                userId: req.body.userId
            }, {
                where: {
                    id: req.params.eventId
                }
            })
            .then((result) => res.json(result))
            .catch((err) => {
                throw err;
            })
    },
    getAllData: (req, res) => {
            console.log('getalldata  ok', req.query)
            const search = (req && req.query && req.query.search) || ""
            Event.findAll({
                    include: "user",
                    where: {
                        [or]: {
                            title: {
                                [like]: `%${search}%`
                            },
                            category: {
                                [like]: `%${search}%`
                            }
                        }
        
                    },
                    limit :5
                })
                .then((result) => res.json(result))
                .catch((err) => {
                    throw err;
                })
        },
    getTitle: (req, res) => {
        const search = (req && req.query && req.query.search) || ""
        Event.findAll({ where: 
            {
            [or]: {
                title: {
                    [like]: `%${search}%`
                }
            }
        }           
            })
            .then((result) => res.json(result))
            .catch((err) => {
                throw err;
            })
    },
    getCategory: (req, res) => {
        console.log('getalldata  ok', req.query)
        const search = (req && req.query && req.query.search) || ""
        Event.findAll({ where: 
            {
                category: {
                    [like]: `%${search}%`
                }
        }           
            })
            .then((result) => res.json(result))
            .catch((err) => {
                throw err;
            })
    },
    getDataById: (req, res) => {
        Event.findAll({
                where: {
                    id: req.params.eventId
                }
            })
            .then((result) => res.json(result))
            .catch((err) => {
                throw err;
            })
    },
    deleteById: (req, res) => {
        Event.destroy({
                where: {
                    id: req.params.eventId
                }
            })
            .then((result) => res.json(result))
            .catch((err) => {
                throw err;
            })
    },
    getByUserId: (req, res) => {
        Event.findAll({
                where: {
                    userId: req.params.userId
                }
            })
            .then((result) => res.json(result))
            .catch((err) => {
                throw err;
            })
    },
    getByTitle: (req, res) => {
        Event.findAll({
                where: {
                    title: req.params.title
                }
            })
            .then((result) => res.json(result))
            .catch((err) => {
                throw err;
            })
    }

}


// getAllData: (req, res) => {
//     console.log('getalldata  ok', req.query)
//     const search = (req && req.query && req.query.search) || ""
//     Event.findAll({
//             include: "user",
//             where: {
//                 [or]: {
//                     title: {
//                         [like]: `%${search}%`
//                     },
//                     category: {
//                         [like]: `%${search}%`
//                     }
//                 }

//             },
//             limit :5
//         })
//         .then((result) => res.json(result))
//         .catch((err) => {
//             throw err;
//         })
// },