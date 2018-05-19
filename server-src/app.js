//IMPORTING NPM PACKAGES
const express = require('express');
const mongoose = require('mongoose');
const morgan = require('morgan');
const bodyParser = require('body-parser');
const cors = require('cors');

//IMPORTING USER FILES
const config = require('./config');
const authRouters = require('./routes/user-authentication');
const groupRouters = require('./routes/group-routers');
const groupRoutersUnprotected = require('./routes/group-routers-unprotected'); 
const protectedRoutes = require('./controllers/route-protection');

//CONFIGURING FOR THE SERVER
const app = express();

mongoose.connect(`${config.DB_URI}/${config.DB_NAME}`)
        .then( () => {
            console.log(`Connected to DB ${config.DB_URI}/${config.DB_NAME}`);
        })
        .catch(err => {
            console.log(err);
        });

//REQUIRED MIDDLEWARE
app.use(cors());
app.use(bodyParser.json());
app.use(morgan('dev'));

app.use('/', authRouters);

app.use('/groups', groupRoutersUnprotected);

app.use(protectedRoutes);

app.use('/group', groupRouters);


// app.get('/', (req, res) => res.send('Got a GET request at /'));

// app.post('/register', (req, res) => {
//     console.log(req);
//     res.send('Got a request');
// });

//LISTENING ON A PORT
app.listen(config.PORT, () => console.log(`App listening on PORT ${config.PORT}, URL: http://localhost:${config.PORT}`));