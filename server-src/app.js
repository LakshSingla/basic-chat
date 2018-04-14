//IMPORTING NPM PACKAGES
const express = require('express');
const mongoose = require('mongoose');
const morgan = require('morgan');
const bodyParser = require('body-parser');

//IMPORTING USER FILES
const config = require('./config');
const authRouters = require('./routes/user-authentication');

//CONFIGURING FOR THE SERVER
const app = express();

mongoose.connect(`${config.DB_URI}/${config.DB_NAME}`);

//REQUIRED MIDDLEWARE
app.use(bodyParser.json());

app.use('/', authRouters);

// app.get('/', (req, res) => res.send('Got a GET request at /'));

// app.post('/register', (req, res) => {
//     console.log(req);
//     res.send('Got a request');
// });

//LISTENING ON A PORT
app.listen(config.PORT, () => console.log(`App listening on PORT ${config.PORT}, URL: http://localhost:${config.PORT}`));