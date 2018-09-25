const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const User = require('../models/User');
const { googleClientID, googleClientSecret } = require('../config/keys');

// Serializing User
passport.serializeUser((user, done) => {
	done(null, user.id);
});

// Deserializing User
passport.deserializeUser((id, done) => {
	// Search user on database
	User.findById(id).then(user => done(null, user))
	.catch(err => console.log('Deserialize Error: ',err));
});


// Setup GoogleStrategy
const googleAuthOptions = {
	clientID: googleClientID,
	clientSecret: googleClientSecret,
	callbackURL: '/auth/google/callback'
}
const googleAuth = new GoogleStrategy(googleAuthOptions, (accessToken, refreshToken, profile, done) => {
	
	const { id } = profile;

	User.findOne({ googleId: id })
		.then((user) => {

			// If user do not exist
			// create new record to database
			if(!user) {
				new User({ googleId: id }).save().then(user => done(null, user))
				.catch(err => console.log('Saving user fail...',err));
			}

			// If user does exist
			// skip creating record to databse 
			if(user){
				console.log('User already exist');
				done(null, user);
			}

		}).catch(err => console.log('Mongo queries fail...',err));

});


passport.use(googleAuth);