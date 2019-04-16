const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ProjectSchema = new Schema({
    name: String,
    task: [{
        type: Schema.Types.ObjectId,
        ref: 'Task'
    }],
    date: Date
})

const Project = mongoose.model('Project', ProjectSchema)

module.exports = Project;