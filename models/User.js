const mongoose = require('mongoose');

const User = mongoose.model('users', {
    username: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true,
    },
    imgSrc: {
        type: String,
        default: ''
    },
    createdDate: {
        type: Object,
        required: true
    }
});

module.exports = {
  User,
};