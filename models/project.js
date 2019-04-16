const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ProjectSchema = new Schema({
    name: String,
    date: Date,
    task: [{
        type: Schema.Types.ObjectId,
        ref: 'Task',
        default: ()=> {return null;}
    }],
    user: [{
        type: Schema.Types.ObjectId,
        ref: 'User'
    }]
})

const Project = mongoose.model('Project', ProjectSchema)

module.exports = Project;