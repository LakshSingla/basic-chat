const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const User = require('../models/User');

module.exports = {
    register(req, res){
        const body = req.body;
        console.log(body);
        try{
            if( !body.hasOwnProperty('nick') || !body.hasOwnProperty('password')){
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
};