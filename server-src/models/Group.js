const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const User = require('./User');
const Message = require('./Message');
const config = require('../config');

const Schema = mongoose.Schema;

const GroupSchema = new Schema({
    name : {
        type : String, 
        required : true
    },
    password : {
        type : String, 
        required : true
    }, 
    createdAt : {
        type : Date, 
        required : true, 
        default : Date.now()
    }, 
    messages : [{
        type : Schema.Types.ObjectId,
        required : true,
        ref : 'Message'
    }], 
    users : [{
        type : Schema.Types.ObjectId, 
        required : true, 
        ref : 'User'
    }]
});

GroupSchema.pre('save', function(next){
    let group = this;
    if(!group.isModified('password')) {
        return next();
    }
    bcrypt.hash(user.password, config.SALT_ROUNDS)
          .then(hash => {
              group.password = hash;
              return next();
          })
          .catch(err => next(err));
});

module.exports = mongoose.model('Group', GroupSchema);