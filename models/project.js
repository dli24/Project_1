const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ProjectSchema = new Schema({
    task_list: [{
        type: Schema.Types.ObjectId,
        ref: 'Task'
    }]
})

const Project = mongoose.model('Project', ProjectSchema)

module.exports = Project;