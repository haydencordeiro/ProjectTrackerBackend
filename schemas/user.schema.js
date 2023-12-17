let mongoose =require('mongoose');
let Schema= mongoose.Schema;

const UserSchema = new Schema({
  
  userid: {
    type: String,
    unique: true, // Ensure uniqueness
    required: true, // Make it required
  },
  username: String,
  boardIds: {
      type: [Number], // Assuming board ids are numbers, change as needed
      default: [], // Default to an empty array
    },
  });

const myDB = mongoose.connection.useDb('projecttracker');
const UserModel=myDB.model('UserModel',UserSchema);

// const SnackModel=mongoose.model('Favorite',SnackSchema);
// export default SnackModel;
module.exports=UserModel;