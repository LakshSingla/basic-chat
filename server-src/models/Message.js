const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const MessageSchema = new Schema({
    sender : {
        type : Schema.Types.ObjectId, 
        required : true, 
        ref : 'User'
    }, 
    timeSent : {
        type : Date, 
        required : true, 
        default : Date.now()
    }, 
    content : {
        type : String, 
        required : true
    }
});

module.exports = mongoose.model('Message', MessageSchema);