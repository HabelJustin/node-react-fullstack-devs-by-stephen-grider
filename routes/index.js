const express = require('express');
const router = express.Router();
const passport = require('passport');
const homeController = require('../controllers/home');



// Passport Strategys
const googleAuthenticate = passport.authenticate('google', { scope: ['profile', 'email'] })
const googleAuthenticated = passport.authenticate('google', { failureRedirect: '/?error=authentication-failed' })


module.exports = (app) => {

	// @GET 	'/'
	// @Desc 	Serve Home Page
	app.get('/', (req, res) => {
		res.send('Home')
	})

	
	// @GET 	'/auth/google'
	// @Desc 	 Start Google Authentication
	app.get('/auth/google', googleAuthenticate)


	// @GET 	'/auth/google/callback'
	// @Desc 	Google Authenticated Callback
	app.get('/auth/google/callback', googleAuthenticated, homeController)


	// @GET 	'/api/resources'
	// @Desc 	Request Some Information
	app.get('/api/resources', (req,res) => {
		req.user ? res.send(req.user):res.send('Please Login')
	})


	// @GET 	'/auth/logout'
	// @Desc 	Logging Out User From App
	app.get('/auth/logout', (req, res) => {
		req.logout();
		res.redirect('/api/resources');
	})

}















