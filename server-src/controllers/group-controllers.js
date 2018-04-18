const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

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
        body = req.body;
        const groupID = req.params.gid;
        console.log(groupID);
        Group.findById(groupID)
             .then(doc => {
                if(!doc) {
                    return res.send('Group doesnot exist');
                }
                bcrypt.compare(body.password, doc.password)
                      .then(hashResult => {
                          if(!hashResult) {
                            return res.send('Please verify the password');
                          }
                          try{
                            basicUtils.pushUnique(doc.users, mongoose.Types.ObjectId(body.userID), JSON.stringify);
                          }catch(err){
                            console.log(err);
                            return 'User already present in the group';
                          }
                        //   doc.users.push(mongoose.Types.ObjectId(body.userID));
                          return doc.save();
                      })
                      .then(savedDoc => {
                          res.send(savedDoc);
                      })
                      .catch(err => {
                          console.log(err);
                          res.send('Unable to hash the password');
                      })
             })
             .catch(err => {
                 console.log(err);
                 res.send('Unable to query the database');
             })
    },

    leaveGroup(req, res){
        body = req.body;
        const groupID = req.params.gid;

   }, 

   retrieveChats(req, res){
       body = req.body;
       const groupID = req.params.gid;
   },

   sendChats(req, res){
       body = req.body;
       const groupID = req.params.gid;
   }
};