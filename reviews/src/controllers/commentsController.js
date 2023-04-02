
const Comment = require("../models/Comment");

exports.getComments = async function (req, res, next){

	const {postId} = req.params
	
	try {
		let count = 0
		const comments = await Comment.find({postId: postId})
		count = await Comment.countDocuments({postId: postId})
		res.status(200).send({comments: comments, count: count})
		
	} catch (ex) {
		next(ex)
	}
}

exports.createComments  = async function (req, res, next) {
	const {
		postId,
		content
	} = req.body
	
	try {
		let newComment = new Comment({
			content,
			postId
		})
		
		newComment = await newComment.save()
		if (newComment) {
			res.status(201).json({comment: newComment})
		}
		
	} catch (ex) {
		next(ex)
	}
}
