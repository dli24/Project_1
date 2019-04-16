const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const TaskSchema = new Schema({
    name: String,
    description: String,
    status: String,
    user: [{
        type: Schema.Types.ObjectId,
        ref: 'User'
    }]
})

const Task = mongoose.model('Task', TaskSchema);

module.exports = Task;