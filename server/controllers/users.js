const UserModel = require('../models').User;
const userDetailsModel = require('../models').UserDetails;
// const { validationResult } = require('express-validator');

const Methods = {};

// Methods.create = async (req,res) => {
//     try{
//         const errors = validationResult(req);
//         if (!errors.isEmpty()) {
//           return res.status(400).json({ errors: errors.array() });
//         }
//         var result = await UserModel.create(req.body)
//         res.status(201).send(result)
//     }
//     catch(error){
//         res.status(500).send(error.message)
//     }
// }

Methods.findAll = async (req, res, next) => {
    try{
        const userType= req.query.user_type
        const condition= userType ? { type: userType } : ''
        var result = await UserModel.findAll({
            where: condition,
            where: {active:true},

            include : [
                {
                  model: userDetailsModel,
                  as: "UserDetails"
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
        var result = await UserModel.findByPk(req.params.id,
            {
                include : [
                    {
                      model: userDetailsModel,
                      as: "UserDetails"
                    }
                  ]
            })
        res.json(result);
    }
    catch(error){
        next(error);
    }
}

// Methods.update = async (req, res) => {
//     try{
//         const id = req.params.id;
//         var result = await User.update(req.body, {where: { id: id }})
//         console.log("result",result)
//         if(result == 1){
//             res.send({
//                 message: "Updated"
//             })
//         }else{
//             res.send({
//                 message: "Cannot Update"
//             })
//         }
//     }
//     catch(error){
//         res.status(500).send(error.message)
//     }
// }

// Methods.delete = async (req, res) => {
//     try{
//         const id = req.params.id
//         var result = await User.destroy({
//                 where: {
//                     id: id
//                 }
//             })
//             if (result == 1) {
//                 res.send({
//                     message: "Deleted successfully!"
//                 });
//             } else {
//                 res.send({
//                     message: `Cannot delete id=${id}`
//                 });
//             }
//     }
//     catch(error){
//         res.status(500).send(error.message)
//     }
// }

module.exports = Methods;