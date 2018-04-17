const mongoose = require('mongoose');

const Group = require('../models/Group');
const basicUtils = require('../utils/basicUtils');

module.exports = {
    newGroup(req, res){
        body = req.body;
        if(!basicUtils.hasProperties(body, ['name', 'password'])){
            //Set the appropriate status code for such request
            return res.send('Insufficient parameters found');
        }
        const newGroup = new Group({
            name : body.name, 
            password : body.password, 
            createdBy : mongoose.Types.ObjectId(body.userID),
            users : [
                mongoose.Types.ObjectId(body.userID)
            ],
            messages : [],
        });        
        newGroup.save()
                .then(doc => {
                    res.status(200).send(doc);
                })
                .catch(err => {
                    console.log(err);
                    res.send('Failed to create the group');
                })
    }, 
    joinGroup(req, res){

    }
};