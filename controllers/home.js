module.exports = (req, res, next) => {
	res.redirect(`/?loggedIn&userId=${req.user.id}`);
}