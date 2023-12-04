const UserModel=require('../schemas/user.schema.js');

/*CREATE METHOD*/
UserModel.createNew= function (userObject) {
    const user=new UserModel({
        userid: userObject.userid,//dont push plural value validator example
        username: userObject.username,
    });
    return user.save().then(result=>{
        // console.log('insertion was successful');
        return result
    }).catch(error=>{
        // console.('something wen wrong insertion not suceessful');
        return error;

    });
}
module.exports=UserModel;