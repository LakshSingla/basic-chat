const jwt = require('jsonwebtoken');

const config = require('../config');

module.exports = {
    genJWT(data = {}, exp = config.JWT_EXP){
        return new Promise((resolve, reject) => {
            jwt.sign(data, config.JWT_SECRET, {
                expiresIn : exp
            }, ( err, token) => {
                if(err) return reject(err);
                else return resolve(token);
            });
        });
    },

    decodeJWT(token){
        return new Promise( (resolve, reject) => {
            jwt.verify(token, config.JWT_SECRET, (err, decoded) => {
                if(err) return reject(err);
                else return resolve(decoded);
            });
        });
    }
}