const CommentModel = require('../models').Comment;

const Methods = {};

Methods.create = async (req, res, next) => {
    try{
        var result = await CommentModel.create(req.body)
        res.json(result);
    }
    catch(error){
        next(error);
    }
}

Methods.findAll = async (req, res, next) => {
    try{
        const condition= { isDeleted: false }
        var result = await CommentModel.findAll({
            where: condition,
            include : [
                {
                  model: CommentModel,
                  as: "reply"
                }
              ]
            })
        return res.json(result);
    }
    catch(error){
        next(error);
    }
}

Methods.findOne = async (req, res, next) => {
    try{
        const condition= { isDeleted: false }
        var result = await CommentModel.findByPk(req.params.id,
            {
                where: condition,
                include : [
                    {
                      model: CommentModel,
                      as: "reply"
                    }
                  ]
            }
            )
        return res.json(result);
    }
    catch(error){
        next(error);
    }
}

Methods.update = async (req, res, next) => {
    try{
        const id = req.params.id;
        var result = await CommentModel.update(req.body, {where: { id: id }})
        res.json(result);
    }
    catch(error){
        next(error);
    }
}

module.exports = Methods;