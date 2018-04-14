module.exports = {
    PORT: process.env.PORT || 3000,
    DB_URI: process.env.DB || 'mongodb://localhost:27017', 
    DB_NAME: process.env.DB_NAME || 'basic-chat',
    SALT_ROUNDS: Number(process.env.SALT_ROUNDS) || 10,
};