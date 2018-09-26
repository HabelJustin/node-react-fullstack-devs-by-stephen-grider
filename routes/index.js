const express = require('express');
const router = express.Router();
const passport = require('passport');
const homeController = require('../controllers/home');



// Passport Strategys
const googleAuthenticate = passport.authenticate('google', { scope: ['profile', 'email'] })
const googleAuthenticated = passport.authenticate('google', { failureRedirect: '/?error=authentication-failed', session: true })


	// @GET 	'/'
	// @Desc 	Serve Home Page
	router.get('/', (req, res) => {
		res.send('Home')
	})

	
	// @GET 	'/auth/google'
	// @Desc 	 Start Google Authentication
	router.get('/auth/google', googleAuthenticate)


	// @GET 	'/auth/google/callback'
	// @Desc 	Google Authenticated Callback
	router.get('/auth/google/callback', googleAuthenticated, homeController)


	// @GET 	'/api/resources'
	// @Desc 	Request Some Information
	router.get('/resources', (req,res) => {
		req.user ? res.json(req.user):res.json({success:false, msg: 'Please Login'})
	})


	// @GET 	'/auth/logout'
	// @Desc 	Logging Out User From App
	router.get('/auth/logout', (req, res) => {
		req.logout();
		res.redirect('/?loggedOut');
	})

module.exports = router;















