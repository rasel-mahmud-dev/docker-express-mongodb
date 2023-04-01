const mongoose = require("mongoose")


const Post = mongoose.model("Post", new mongoose.Schema({
	title: {
		type: String,
		required: true
	},
	description: {
		type: String,
	},
	userId: {
		type: String,
		index: true
	},
	
}, {timestamps: true}))


// let customTimeRepeat = {
//  turnOn: false
// 	repeatIteration: 3,
// 	repeatPeriod: 'week' // 'day' // 'month',
// 	repeatDays: [3, 5]
// }


module.exports = Post