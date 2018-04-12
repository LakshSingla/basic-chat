//IMPORTING NPM PACKAGES
const express = require('express');
const mongoose = require('mongoose');
const morgan = require('morgan');
const bodyParser = require('body-parser');

//IMPORTING USER FILES
const config = require('./config');

//CONFIGURING FOR THE SERVER
const app = express();

app.get('/', (req, res) => res.send('Got a GET request at /'));

//LISTENING ON A PORT
app.listen(config.PORT, () => console.log(`App listening on PORT ${config.PORT}, URL: http://localhost:${config.PORT}`));
