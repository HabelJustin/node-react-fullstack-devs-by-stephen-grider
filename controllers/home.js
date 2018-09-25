module.exports = (req, res, next) => {
	const { user } = req;

	res.send('LoggedIn');
}