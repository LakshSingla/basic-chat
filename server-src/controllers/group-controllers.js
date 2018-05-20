const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const User = require('../models/User');
const Group = require('../models/Group');
const Message = require('../models/Message');
const basicUtils = require('../utils/basicUtils');

module.exports = {
    myGroups(req, res){
        const body = req.body;
        User.findById(body.userID)
            .populate('memberOfGroups')
            .then(userDoc => {
            //    console.log(userDoc);
                if(!userDoc){
                    return res.send({
                        code : 'gpm1', 
                        message : 'Given user doesnot exist in the database', 
                        data: {}
                    });
                }
                return res.send({
                    code : 'gpm0', 
                    message : 'User groups successfully queried', 
                    data : ( () => {
                        groupsMutable = JSON.parse(JSON.stringify(userDoc.memberOfGroups));
                        groupsMutable.forEach(doc => {
                            delete doc.createdAt; 
                            delete doc.createdBy; 
                            delete doc.users; 
                            delete doc.messages; 
                            delete doc.password; 
                            delete doc.createdBy;
                            delete doc.__v;
                        }); 
                        return groupsMutable;
                        // return 1;
                    })()
                });
            })
            .catch(err => {
                console.log(err);
                return res.send({
                    code : 'gpm-1', 
                    message : 'Unable to query the user database, unknown error encountered', 
                    data : {}
                });
            });
    },

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
                    return User.findByIdAndUpdate(body.userID, {
                        $push : {
                            memberOfGroups : doc._id
                        }
                    }, {new : true});
                })
                .then(userDoc => res.status(200).send({
                    code : 'gpn0', 
                    message : 'New group created successfully', 
                    data : { name: body.name, groupID : userDoc.memberOfGroups[userDoc.memberOfGroups.length - 1]}
                }))
                .catch(err => {
                    try{
                        if(err.errmsg.indexOf('E11000') !== -1){
                            return res.send({
                                code : 'gpn1', 
                                message : 'Group name already exists, please use a new name', 
                                data : {}
                            });
                        }
                    }catch(e){}
                    console.log(err);
                    res.send({
                        code : 'gpn-1', 
                        message : 'Unknown error encountered while creating the group', 
                        data : {}
                    });
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
                            // console.log(err);
                            return 'User already present in the group';
                          }
                        //   doc.users.push(mongoose.Types.ObjectId(body.userID));
                          return doc.save();
                      })
                      .then(groupDoc => {
                          if(typeof 'groupDoc' === 'string') return res.send('User already present in the group');

                          return User.findByIdAndUpdate(body.UserID, {
                              $push : { 
                                  memberOfGroups : groupID
                              }
                          }, {new : true})
                      })
                      .then(userDoc => {
                        res.status(200).send(userDoc);
                      }).catch(err => {
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
            $pull : {
                users : mongoose.Types.ObjectId(body.userID)
            }
        }, {new : true})
            .then(doc => {
                if(!doc) {
                    return res.send('Given group not found');
                }
                // try{
                    // if(basicUtils.pushUnique(doc.users, mongoose.Types.ObjectId(body.userID)) || true){
                        // return res.send('User already not present in the group');
                    // }
                // }catch(err) {
                    // console.log(err);
                    // doc.users.splice(doc.users.map(
                        // val => JSON.stringify(val)
                    // )
                    // .indexOf(body.userID), 1);
                    // res.send(doc);
                // }
                // console.log(doc);
                // console.log(body.userID);
                // const indexOfUser = doc.users.map(val => {
                    // console.log('***************');
                    // console.log(val);
                    // return JSON.stringify(val)
                // }).indexOf(body.userID);
                // console.log(indexOfUser);
                // if(indexOfUser === -1 ) {
                    // return res.send('User already doesnot exist in the group');
                // }
// 
                // console.log('Before splicing');
                // console.log(doc);
// 
                // doc.users.splice(indexOfUser, 1);
// 
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
                // res.send(doc);
                return User.findByIdAndUpdate(body.UserID, {
                    $pull : {
                        memberOfGroups : GroupID
                    }
                }, { new : true})
            })
            .then(userDoc => {
                res.status(200).send('User removed successfully');
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
                        console.log(group);
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
                                    .catch(err => res.send('Unable to save the message successfully'));
                                //res.send('Message has been successfully registered');
                            })
                            .catch(err => {
                                res.send('Unable to register the message sucesfully');
                            });
                });
   }
};