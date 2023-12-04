let mongoose =require('mongoose');
let Schema= mongoose.Schema;

const UserSchema = new Schema({
    userid: String,
    username: String,
  });

const myDB = mongoose.connection.useDb('projecttracker');
const UserModel=myDB.model('UserModel',UserSchema);

// const SnackModel=mongoose.model('Favorite',SnackSchema);
// export default SnackModel;
module.exports=UserModel;