const mongoose = require('mongoose');
const { Schema } = mongoose;


// Create Schema
const UserSchema = new Schema({
	googleId: {
		type: String,
		required: true
	}
})


// Create Model Instance
const User = mongoose.model('user', UserSchema);


// Export Model
module.exports = User;