const Role = require('../models').Role;

const Methods= {}

Methods.findAll = async (req, res) => {
    try{
        var result= await Role.findAll();
        return res.send(result)
    }
    catch(error){
        res.status(500).send(error.message)
    }
}

module.exports = Methods;