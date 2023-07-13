const { Schema, model } = require('mongoose');

const taskSchema = new Schema({
    type: {
        type: String,
        required: false
    },
    taskDescription: {
        type: String,
        required: true
    },
    contactPhone: {
        type: String,
        required: false
    },
    dateCreated: {
        type: Date,
        default: Date.now
    },
    contactEmail: {
        type: String,
        required: false
    },
    contactFirstName: {
        type: String,
        required: true
    },
    contactLastName: {
        type: String,
        required: true
    },
    reminderDate: {
        type: Date,
        default: Date.now
    },
})

module.exports = taskSchema;