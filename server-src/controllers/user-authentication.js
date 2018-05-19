const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const User = require('../models/User');
const config = require('../config');
const basicUtils = require('../utils/basicUtils');
const jwtUtils = require('../utils/jwtUtils');

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
            return res.send({
                code : 'reg1',
                message : 'Not sufficient data passed in the request'
            });
        }
        const newUser = new User({
            nick : body.nick , 
            password : body.password
        });
        newUser.save()
            .then( doc => {
                console.log(doc);
                res.send({
                    code : 'reg0',
                    message : 'User registered successfully', 
                    data : { nick }
                });
            })
            .catch( err => {
                try{
                    if(err.errmsg.indexOf('E11000') !== -1){
                        return res.send({
                            code : 'reg2',
                            message : 'User already exists, please try a different name'
                        });
                    };
                }catch(e){}
                res.send({
                    code : 'reg-1',
                    message : 'Unknown error encountered',
                    data : {}
                }); 
                console.log(err);
            }); 
    }, 
    login(req, res){
        const body = req.body;
        if(!basicUtils.hasProperties(body, ['nick', 'password'])) {
            res.send({
                code : 'log3',
                message : 'Insufficient parameters passed in the request',
                data : {}
            });
        }
        User.findOne({
            nick: body.nick
        }, 'password').then(doc =>{
            if(!doc){
                //User doesnot exist
                res.send({
                    code : 'log1', 
                    message : 'User doesnot exist in the given database. Please register first', 
                    data : {}
                });
            }
            else {
                bcrypt.compare(body.password, doc.password).then( hashResult => {
                    if(hashResult){
                        // res.send('Good boy, sent the correct password');
                        jwtUtils.genJWT({
                            id: doc._id.toString(),
                        }, config.JWT_EXP).then(
                            token => {
                                res.status(200).send({
                                    code : "log0", 
                                    message : 'User login successful',
                                    data : {
                                        token,
                                        issuedAt : Date.now()
                                    }
                                });
                            }
                        ).catch( err => {
                            //Error in generating the JWT
                            res.send({
                                code : 'log-1', 
                                message : 'Unknown error encountered', 
                                data : {}
                            });
                            console.log(err);
                        });
                        // resObj = {
                        //     responseCode : "log0", 
                        //     responseBody : {
                        //         userToken: jwtUtils.genJWT({id : doc._id.toString()}, "24h"), 
                        //         issuedAt : Date.now()
                        //     }
                        // };
                        // res.status(200).send({
                        //     responseCode : "log0", 
                        //     responseBody : {
                        //         userToken: jwtUtils.genJWT({id : doc._id.toString()}, "24h"), 
                        //         issuedAt : Date.now()
                        //     }
                        // });
                        // console.log(resObj);
                        // res.status(200).send(resObj);
                    } 
                    else {
                        res.send({
                            code : 'log2',
                            message : 'Incorrect password sent, please send the correct password',
                            data : {}
                        });
                    }
                }).catch( err => {
                    console.log(err);
                    res.send({
                        code : 'log4', 
                        message : 'Unable to hash the password', 
                        data : {}
                    });
                })
            }
        })
        // .catch(err => {
        //     console.log(err);
        // });
    }
};