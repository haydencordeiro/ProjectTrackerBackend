const UserModel= require('../models/user.model.js');
const UserController={}

UserController.createNewUser=(req, res, next)=>{
    console.log(req.body)

    UserModel.createNew(req.body).then(result=>{
        return res.json(result);
    }).catch(error=>{
        return res.json(error);
    })
  }

module.exports=UserController;