const Post = require("../models/Post");

exports.getAllPosts = async function (req, res, next) {
	try {
		const posts = await Post.find({})
		res.status(200).send({posts: posts})
	} catch (ex) {
		next(ex)
	}
}
exports.getPostDetail = async function (req, res, next) {
	
	const {postId} = req.params
	
	try {
		const post = await Post.findOne({_id: postId})
		res.status(200).send({post: post})
	} catch (ex) {
		next(ex)
	}
}

exports.createPost = async function (req, res, next) {
	const {
		title,
		description,
		userId
	} = req.body
	
	
	try {
		
		let newPost = new Post({
			userId: userId,
			title,
			description,
		})
		
		newPost = await newPost.save()
		if (newPost) {
			res.status(201).send(newPost)
		}
		
	} catch (ex) {
		next(ex)
	}
}

