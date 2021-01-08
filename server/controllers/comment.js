const CommentModel = require('../models').Comment;
const viewedCommentsModel = require('../models').viewedComments;

const users = require('../models').User;
var Sequelize = require('sequelize');


const Methods = {};

Methods.create = async (req, res, next) => {
    const body = { ...req.body, createdBy: req.user.id };
    try {
        var result = await CommentModel.create(body)
        res.json(result);
    }
    catch (error) {
        next(error);
    }
}
Methods.unreadComments = async (req, res, next) => {

    let taskIdParams = [3,4];  
    try {
        var result = await CommentModel.findAll({
            group: ['timeEntryId'],
            where: {
                timeEntryId: { [Sequelize.Op.in]: taskIdParams }
            },
            attributes: ['id', [Sequelize.fn('COUNT', 'id'), 'count']],
            include: [
                {
                    model: viewedCommentsModel, as: "commentData",
                    
                }
            ]
        })
        res.json(result);
    }
    catch (error) {
        next(error);
    }


}

Methods.findAll = async (req, res, next) => {


    const timeEntryId = req.query.timeEntryId;
    console.log("TImeEntry: ", timeEntryId)
    try {
        const condition = { active: true, timeEntryId }
        var result = await CommentModel.findAll({
            where: condition,
            include: [
                {
                    model: users, as: "userInfo"
                }
            ]
        })
        return res.json(result);
    }
    catch (error) {
        next(error);
    }
}

Methods.findOne = async (req, res, next) => {
    try {
        const condition = { active: false }
        var result = await CommentModel.findByPk(req.params.id,
            {
                where: condition,
                include: [
                    {
                        model: CommentModel,
                        as: "reply"
                    },
                    {
                        model: users, as: "userInfo"
                    }
                ]
            }
        )
        return res.json(result);
    }
    catch (error) {
        next(error);
    }
}

Methods.update = async (req, res, next) => {
    try {
        const id = req.params.id;
        var result = await CommentModel.update(req.body, { where: { id: id } })
        res.json(result);
    }
    catch (error) {
        next(error);
    }
}

module.exports = Methods;
