const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const { v4: uuidv4 } = require('uuid');

const TaskSchema = new Schema({
  task: {
    type: String,
    required: true,
  },
  dueDate: {
    type: String,
  },
  list: {
    type: String,
    required: true,
  },
  id: {
    type: String,
    default: uuidv4, 
    required: true,
  },
});

// Board schema
const BoardSchema = new Schema({
  id: {
    type: String,
    default: uuidv4, 
    required: true,
  },
  name:String,
  boardList: [String],
  tasks: [TaskSchema], // Embedding TaskSchema within BoardSchema as an array
});

// User schema
const UserSchema = new Schema({
  userid: {
    type: String,
    unique: true,
    required: true,
  },
  username: String,
  boards: [BoardSchema],
});

// Pre-save hook to generate random IDs
BoardSchema.pre('save', function (next) {
  if (!this.id) {
    this.id = uuidv4();
  }
  next();
});

TaskSchema.pre('save', function (next) {
  if (!this.id) {
    this.id = uuidv4();
  }
  next();
});

// Models
const UserModel = mongoose.model('UserModel', UserSchema);

module.exports = UserModel;
