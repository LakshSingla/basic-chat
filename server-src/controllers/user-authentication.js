const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const User = require('../models/User');
const config = require('../config');
const basicUtils = require('../utils/basicUtils.js');

module.exports = {
    register(req, res){
        const body = req.body;
        // console.log(body);
        try{
            if(!basicUtils.hasProperties(body, ['nick', 'password'])){
                throw new Error('Insufficient Parameters passed');
            }
        }catch(e){
            //Error handling when the request contains insufficient paramaters
            console.log(e);
            return res.send("Insufficient parameters to make the request");
        }
        const newUser = new User({
            nick : body.nick , 
            password : body.password
        });
        newUser.save()
            .then( doc => {
                console.log(doc);
                res.send(doc);
            })
            .catch( err => {
                console.log(err);
            }); 
    }, 
    login(req, res){
        const body = req.body;
        if(!basicUtils.hasProperties(body, ['nick', 'password']))
        User.findOne({
            nick: body.nick
        }, 'password').then(doc =>{
            if(!doc){
                //User doesnot exist
            }
            else {
                bcrypt.compare(body.password, doc.password).then( hashResult => {
                    if(hashResult){
                        // res.send('Good boy, sent the correct password');
                                                
                    } 
                    else {
                        // res.send('Gimme the correct password you shitfuck');
                    }
                }).catch( err => console.log(err))
            }
        })
        // .catch(err => {
        //     console.log(err);
        // });
    }
};