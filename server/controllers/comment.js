const CommentModel = require('../models').Comment;
const users = require('../models').User;

const Methods = {};

Methods.create = async (req, res, next) => {
    const body = { ...req.body, createdBy: req.user.id};
    try {
        var result = await CommentModel.create(body)
        res.json(result);
    }
    catch (error) {
        next(error);
    }
}

Methods.findAll = async (req, res, next) => {
    const timeEntryId = req.query.timeEntryId;

    try {
        const condition = {active: true, timeEntryId}
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
