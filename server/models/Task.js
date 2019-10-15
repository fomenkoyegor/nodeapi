const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const TaskSchema = new mongoose.Schema({
  name: {
    type: String,
    require: true,
    min: 2,
    max: 120
  },
  priority:{
    type:Number,
    default:null
  },
  status:{
    type: Boolean,
    default: false
  },
  user: {
    ref: 'users',
    type: Schema.Types.ObjectId
  },
  project:{
    ref: 'projects',
    type: Schema.Types.ObjectId,
    default:null
  },
  date: {
    type: Date,
    default: null
  },
});


const Task = mongoose.model('Task', TaskSchema);

module.exports = Task;
