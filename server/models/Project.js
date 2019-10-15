const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ProjectSchema = new mongoose.Schema({
  name: {
    type: String,
    require: true,
    min: 2,
    max: 12
  },
  user: {
    ref: 'users',
    type: Schema.Types.ObjectId
  }
});


const Project = mongoose.model('Project', ProjectSchema);

module.exports = Project;
