const mongoose = require('../config/database');
const Schema = mongoose.Schema;

mongoose.set('useFindAndModify', false);

/* ############### Set object model to be stored ################ */

const taskSchema = new Schema({
    mac: {type: String, required: true},
    type: {type: Number, required: true},
    title: {type: String, required: true},
    description: {type: String, required: true},
    when: {type: Date, required: true},
    complete: {type: Boolean, default: false},
    dateCreated: {type: Date, default: Date.now()}
});

module.exports = mongoose.model('Task', taskSchema);