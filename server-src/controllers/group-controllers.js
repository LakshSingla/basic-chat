const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const Group = require('../models/Group');
const Message = require('../models/Message');
const basicUtils = require('../utils/basicUtils');

module.exports = {
    newGroup(req, res){
        const body = req.body;
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
        const body = req.body;
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
                            basicUtils.pushUnique(doc.users, mongoose.Types.ObjectId(body.userID), JSON.stringify, (arr, val) => arr.push(val));
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
        const body = req.body;
        const groupID = req.params.gid;
        Group.findByIdAndUpdate(groupID, {
            $pullAll : {
                users : [mongoose.Types.ObjectId(req.userID)]
            }
        })
            .then(doc => {
                if(!doc) {
                    return res.send('Given group not found');
                }
                // try{
                //     if(basicUtils.pushUnique(doc.users, mongoose.Types.ObjectId(body.userID))){
                //         res.send('User already not present in the group');
                //     }
                // }catch(err) {
                //     console.log(err);
                //     doc.users.splice(doc.users.map(
                //         val => JSON.stringify(val)
                //     )
                //     .indexOf(body.userID), 1);
                //     res.send(doc);
                // }
                // console.log(doc);
                // console.log(body.userID);
                // const indexOfUser = doc.users.map(val => {
                    // console.log('***************');
                    // console.log(val);
                    // return JSON.stringify(val)
                // }).indexOf(`${body.userID}`);
                // console.log(indexOfUser);
                // if(indexOfUser === -1 ) {
                    // return res.send('User already doesnot exist in the group');
                // }

                // console.log('Before splicing');
                // console.log(doc);

                // doc.users.splice(indexOfUser, 1);

                // console.log('After splicing');
                // console.log(doc);

                // doc.save().then(savedDoc => {
                    // console.log(savedDoc);
                    // res.send(savedDoc)
                        // }).catch(err => {
                                // console.log(err);
                                // return res.send('Unable to splice the array');
                            // })
// 
                res.send(doc);

            })
            .catch(err => {
                console.log(err);
                res.send('Unable to query for the group');
            });
            
   }, 

   retrieveGroupData(req, res){
        const body = req.body;
        const groupID = req.params.gid;
        Group.findById(groupID)
                .populate('messages')
                .populate('users', '_id nick')
                .then(group => {
                    if(!group){
                        return res.send('Group not found');
                    }
                    /*else if(group.users
                                    .map(user => JSON.stringify(user._id))
                                    .indexOf(body.userID) === -1) {
                        return res.send('User not in the group. Unable to access the information');
                    }*/
                    else {
                        console.log('*' * 20);
                        console.log(group);
                        console.log('*' * 20);
                        return res.send(group);
                    }
                })
                .catch(err => console.log(err)); 
        
   },

   sendChat(req, res){
        const body = req.body;
        const groupID = req.params.gid;
        if(!basicUtils.hasProperties(body, ['content'])){
            return res.send('Insufficient parameters present in the request');
        }
        Group.findById(groupID)
                .then(group => {
                    if(!group){
                        return res.send('Group not found');
                    }
                    if(group.users.indexOf(body.userID) === -1){
                        return res.send('User not in the group. Unable to send the message');
                    }
                    let message = new Message({
                        sender : body.userID, 
                        timeSent : Date.now(),
                        content : body.content
                    });
                    message.save()
                            .then( doc => {
                                Group.findByIdAndUpdate(groupID, {
                                    $push: {
                                        messages : mongoose.Types.ObjectId(doc._id)
                                    }
                                }).then( () => res.send('Message successful'))
                                    .catch(err => console.log(err));
                                //res.send('Message has been successfully registered');
                            })
                            .catch(err => {
                                res.send('Unable to register the message sucesfully');
                            });
                });
   }
};