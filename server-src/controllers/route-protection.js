//x-chat-token
const jwtUtils = require('../utils/jwtUtils');

module.exports = (req, res, next) => { 
    const token = req.header('x-chat-token');
    if(!token) {
        console.log('Header not found');
        res.status(402).send('Send some token you dumbfuck');
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
                    res.send('You are late to the party motherfucker');
                }
                if(err.name === 'JsonWebTokenError' && 
                   err.message === 'invalid signature'){
                    res.send('Your token is a fake one, call the fucking cops');
                }
            });
}