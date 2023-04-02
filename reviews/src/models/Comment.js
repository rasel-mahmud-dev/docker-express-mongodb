const mongoose = require("mongoose")


const Comment = mongoose.model("Comment", new mongoose.Schema({
	content: {
		type: String,
		required: true
	},
	postId: {
		type: mongoose.Schema.Types.ObjectId,
		ref: "User"
	}
	
}, {timestamps: true}))


module.exports = Comment