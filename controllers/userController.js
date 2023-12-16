const UserModel= require('../models/user.model.js');
const UserController={}

UserController.createNewUser = (req, res) => {

    // const user=new UserModel({
    //     userid: req.body.userid,//dont push plural value validator example
    //     username: req.body.username,
    // });
    // user.save()
    // return res.json(user)

    
    // UserModel.createNew(req.body).then(result=>{
    //     return res.json(result);
    // }).catch(error=>{
    //     return res.json(error);
    // })
  }

module.exports=UserController;