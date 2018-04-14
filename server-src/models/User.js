const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const Group = require('./Group');

const Schema = mongoose.Schema;

const userSchema = new Schema({
    nick : {
        type: String,
        required : true
    }, 
    password : {
        type : String,
        required : true
    },
    memberOfGroups : [{
        type : Schema.Types.ObjectId , 
        ref : 'Group',
    }]
});

module.exports = mongoose.model('User', userSchema);