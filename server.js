const express = require('express');
const app = express();
const mongoose = require('mongoose');
const morgan = require('morgan');
const passport = require('passport');
const cookieSession = require('cookie-session');
const { mongoURI, cookieKey } = require('./config/keys');



// Connect MongoDB
mongoose
.connect(mongoURI, { useNewUrlParser: true })
.then(() => console.log('MongoDB Connected!'))
.catch(err => console.log('MongoDB Connect Fail',err));


// Setup Middleware
app.use(express.json());
app.use(morgan('tiny')); // middleware logging
app.use(cookieSession({
	maxAge: 30*24*60*60*1000,
	keys: [cookieKey]
}))
app.use(passport.initialize())
app.use(passport.session());
require('./services/passport') // make sure passport file executed (google oauth)



// Handling Routing
require('./routes')(app);



// Listen to Port
app.listen(process.env.PORT || 3030, () => console.log('Listening on port 3030...'));