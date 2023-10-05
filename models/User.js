const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = new Schema({
    name: {
        type: String,
        required: [true, 'Please Provide Name'],
        trim: true,
        minlength: 4,
        maxlength: 30
    },
    email: {
        type: String,
        match:
            [/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
                'Please Provide valid E-mail'],
        required: [true, 'Please Provide E-mail'],
        trim: true,
        unique: true
    },
    password: {
        type: String,
        required: [true, 'Please Provide Password'],
        minlength: 8
    }
});

module.exports = mongoose.model('User', userSchema);