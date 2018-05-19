//x-chat-token
const jwtUtils = require('../utils/jwtUtils');

module.exports = (req, res, next) => { 
    const token = req.header('x-chat-token');
    if(!token) {
        console.log('Header not found');
        res.status(402).send({
            code : 'jwtnone', 
            message : 'JWT not sent along with the request to the protected route',
            data : {}
        });
        return;
    }

    jwtUtils.decodeJWT(token)
            .then( decoded => {
                // console.log(decoded);
                req.body.userID = decoded.id;
                // res.send('Token recieved successfully');
                return next();
            })
            .catch( err => {
                console.log(err);
                if(err.name === 'TokenExpiredError') {
                    res.send({
                        code : 'jwtexp',
                        message : 'JWT sent is expired. Please login again to generate a new token',
                        data : {}
                    });
                }
                if(err.name === 'JsonWebTokenError' && 
                   err.message === 'invalid signature'){
                    res.send({
                        code : 'jwterr',
                        message : 'Unable to parse the given JWT',
                        data : {}
                    });
                }
            });
}