let mongoose =require('mongoose');
let Schema= mongoose.Schema;

const UserSchema = new Schema({
    userid: String,
    username: String,
    boardIds: {
      type: [Number], // Assuming board ids are numbers, change as needed
      default: [], // Default to an empty array
      unique: true,
    },
  });

const myDB = mongoose.connection.useDb('projecttracker');
const UserModel=myDB.model('UserModel',UserSchema);

// const SnackModel=mongoose.model('Favorite',SnackSchema);
// export default SnackModel;
module.exports=UserModel;