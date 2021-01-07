const Task = require('../models').Task;
const Projects = require('../models').Project
const comment = require('../models').Comment
const users = require('../models').User
const TeamLeadProjectModel = require('../models').TeamLeadProject;
var Sequelize = require('sequelize');

// const { validationResult } = require('express-validator');

const Methods = {}

Methods.create = async (req, res, next) => {
    try {
        // const errors = validationResult(req)
        // if(!errors.isEmpty()){
        //     return res.status(400).json({errors: errors.array()})
        // }
        const body = { ...req.body, createdBy: req.user.id };
        var result = await Task.create(body);
        res.status(201).send(result)
    }
    catch (error) {
        next(error);
    }
}
Methods.taskReport = async (req, res, next) => {
    try {
        let condition;
        const user = req.user;

        if (user.role === 'Admin') {
            condition = {};
        } else if (user.role === 'Dev') {
            condition = user ? { createdBy: user.id } : null
        } else if (user.role === 'TeamLead') {
            // get tasks for projects created by team lead
            //admin
            const projects = await TeamLeadProjectModel.findAll({ where: { userId: user.id }, attributes: ['projectId'] })
            const projectIds = projects.map(u => u.get('projectId'))
            condition = {
                projectId: {
                    [Sequelize.Op.in]: [projectIds]
                }
            };
        }

        var result = await Task.findAll({
            where: condition,
            include: [
                {
                    model: Projects, as: "Projects"
                },
                {
                    model: comment, as: "comments"
                },
                {
                    model: users, as: "userInfo"
                }
            ]
        });
        // if(result.length){
        return res.send(result)
        // }
        // throw new Error("No data found")
    }
    catch (error) {
        next(error);
    }
}

Methods.findAll = async (req, res, next) => {
    try {
        let condition;
        const user = req.user;

        if (user.role === 'Dev') {
            condition = user ? { createdBy: user.id } : null
        }else{
            condition = {};
        }

        var result = await Task.findAll({
            where: condition,
            include: [
                {
                    model: Projects, as: "Projects"
                },
                {
                    model: comment, as: "comments"
                },
                {
                    model: users, as: "userInfo"
                }
            ]
        });
        // if(result.length){
        return res.send(result)
        // }
        // throw new Error("No data found")
    }
    catch (error) {
        next(error);
    }
}

Methods.findOne = async (req, res, next) => {
    try {
        const id = req.params.id
        var result = await Task.findByPk(id)
        // if(result){
        res.send(result)
        // }
        // throw new Error("No data found")
    }
    catch (error) {
        next(error);
    }
}


Methods.findInProgress = async (req, res, next) => {
    try {
        var result = await Task.findOne({ where: { approvedStatusId: 2 } })
        if (result) {
            res.send(result)
        } else {
            res.send({})
        }
        // throw new Error("No data found")
    }
    catch (error) {
        next(error);
    }
}

Methods.update = async (req, res, next) => {
    try {
        // const errors = validationResult(req)
        // if(!errors.isEmpty()){
        //     return res.status(400).json({errors: errors.array()})
        // }

        const id = req.params.id
        var result = await Task.update(req.body, { where: { id: id } })
        return res.send(result)
    }
    catch (error) {
        next(error);
    }
}

Methods.delete = async (req, res, next) => {
    try {
        const id = req.params.id
        var result = await Task.destroy({ where: { id: id } })
        if (result == 1) {
            res.send({
                message: "Deleted"
            })
        } else {
            res.send({
                message: "Cannot Update"
            })
        }
    }
    catch (error) {
        next(error);
    }

}

module.exports = Methods;
