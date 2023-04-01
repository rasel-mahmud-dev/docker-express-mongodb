import React, {useEffect, useState} from 'react';
import axios from "axios";
import {Link, useParams} from "react-router-dom";


const PostDetail = () => {
	const {postId} = useParams()
	
	const [auth, setAuth] = useState({
		"_id": "641d8088f8f8ad5a370429a2",
		"firstName": "Rasel ",
		"lastName": "Mahmud ",
		"email": "rasel@gmail.com",
		"password": "123",
		"avatar": "https://res.cloudinary.com/rasel/image/upload/v1679941585/app/core-avatar-hd.jpg"
	})
	
	const [comments, setComments] = useState([])
	const [totalComment, setTotalComment] = useState(0)
	
	
	const [postDetail, setPostDetail] = useState(null)
	
	useEffect(() => {
		fetchPost(postId)
		
		fetchComments(postId)
		
	}, [postId])
	
	
	async function fetchPost(postId) {
		try {
			let {status, data} = await axios.get("http://localhost:2000/api/posts/" + postId)
			if (status === 200) {
				setPostDetail(data.post)
			}
		} catch (ex) {
		
		}
	}
	
	async function fetchComments(postId) {
		try {
			let {status, data} = await axios.get("http://localhost:2001/api/comments/" + postId)
			if (status === 200) {
				setComments(data.comments)
				setTotalComment(data.count)
			}
		} catch (ex) {
		
		}
	}
	
	async function handleAddComment(e) {
		e.preventDefault()
		
		const content = e.target.content.value
		
		let {data, status} = await axios.post("http://localhost:2001/api/comments", {content, postId})
		
		if (status === 201) {
			e.target.content.value = ""
			setTotalComment(prev=>prev + 1)
			setComments((prev)=>([
				...prev,
				data.comment
			]))
		}
	}
	
	return postDetail && (
		<div className="max-w-3xl mx-auto">
			
			<div className="mb-2">
				<Link to="/">Back To all Posts</Link>
			</div>
			
			<div className="flex items-center justify-between">
				<div className="flex gap-x-4">
					<div>
						<div className="w-10 rounded-full ring ring-primary ring-offset-base-100 rounded-full">
							<img className="rounded-full"
							     src="https://res.cloudinary.com/rasel/image/upload/v1679941585/app/core-avatar-hd.jpg"/>
						</div>
					</div>
					<div>
						<h4 className="font-semibold">Rasel Mahmud</h4>
						<p className="text-sm text-gray-500">{new Date().toDateString()}</p>
					</div>
				</div>
				
				<button className="btn btn-primary">Follow</button>
				
			</div>
			
			<h2 className="text-4xl mt-4 font-semibold">{postDetail.title}</h2>
			
			<div className="mt-4">
				<img className="w-full"
				     src="https://www.spec-india.com/wp-content/uploads/2022/04/Java-Microservices.jpg" alt=""/>
			</div>
			
			<div className="mt-10">
				<p className="text-gray-400 whitespace-pre-line">{postDetail.description}</p>
			</div>
			
			
			<div className="mt-10">
				<h4 className="text-2xl">Comments ({totalComment})</h4>
				
				<div className="my-4">
					{comments.map(comment => (
						<div className="border border-gray-600 rounded-lg my-4 p-2">
							
							<div className="flex gap-x-4">
								<div>
									<div
										className="w-6 rounded-full ring ring-primary ring-offset-base-100 rounded-full">
										<img className="rounded-full"
										     src="https://res.cloudinary.com/rasel/image/upload/v1679941585/app/core-avatar-hd.jpg"/>
									</div>
								</div>
								<div>
									<h4 className="text-sm font-semibold">Rasel Mahmud</h4>
									<p className="text-xs text-gray-500">{new Date().toDateString()}</p>
								</div>
							</div>
							
							<div className="mt-2">
								<p className="text-sm text-gray-400">{comment.content.substring(0, 180)}</p>
								{comment.content.length > 180 && <a className="font-medium text-sm cursor-pointer">Read more...</a>}
							</div>
						</div>
					))}
				</div>
				
				
				<form onSubmit={handleAddComment}>
					<textarea rows={4} name="content" className="mt-2 w-full textarea textarea-primary"
					          placeholder="You comment"></textarea>
					<button type="submit" className="mt-2 btn btn-primary">Post</button>
				</form>
			</div>
		
		
		</div>
	);
};

export default PostDetail;