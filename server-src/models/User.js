const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const Group = require('./Group');
const config = require('../config');

const Schema = mongoose.Schema;

const UserSchema = new Schema({
    nick : {
        type: String,
        required : true,
        unique : true
    }, 
    password : {
        type : String,
        required : true,
    },
    memberOfGroups : [
        {
            type : Schema.Types.ObjectId, 
            ref : 'Group'
        }
    ]
});

UserSchema.pre('save', function(next){
    let user = this;
    if(!user.isModified('password')){
        return next();
    }

    bcrypt.hash(user.password, config.SALT_ROUNDS)
          .then(hash => {
              user.password = hash;
              return next();
          })
          .catch(err => next(err));

});

module.exports = mongoose.model('User', UserSchema);