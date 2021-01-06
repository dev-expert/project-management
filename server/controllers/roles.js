const Role = require('../models').Role;

const Methods= {}

Methods.findAll = async (req, res,next) => {
    try{
        var result= await Role.findAll();
        return res.send(result)
    }
    catch(error){
        next(error);
    }
}

module.exports = Methods;