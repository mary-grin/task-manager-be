const mongoose = require('mongoose');

const boardSchema = mongoose.Schema({
    createdBy: {
        type: mongoose.Schema.Types.ObjectId,
        required: true
    },
    name: {
        type: String,
        required: true,
    },
    description: {
        type: String,
    },
    tasks: [{
        name: {
            type: String,
            required: true,
        },
        description: {
            type: String,
        },
        status: {
            type: String,
            default: 'NEW',
            enum: ['NEW', 'IN PROCESS', 'DONE'],
            required: true
        },
        isArchived: {
            type: Boolean,
            default: false
        }
    }, {timestamps: true}]
}, {timestamps: true});

const Board = mongoose.model('board', boardSchema);

module.exports = {
  Board,
};