const mongoose = require('mongoose');
const DB_URL = 'mongodb://localhost:27017/project1';

mongoose.connect(DB_URL, {useNewUrlParser: true, useFindAndModify: false})

module.exports = {
    Project: require("./project.js"),
    Task: require("./task"),
    User: require("./user")
}