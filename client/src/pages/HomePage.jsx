import React, {useContext, useEffect, useState} from 'react';
import Posts from "../components/Posts";
import axios from "axios";
import Header from "../components/Header";
import {AppContext} from "../store/AppContext";

const HomePage = () => {
	
	const [count, setCount] = useState(0)
	
	const [posts, setPosts] = useState([])
	
	const [{auth}] = useContext(AppContext)
	

	
	async function addPostHandler(e) {
		e.preventDefault()
		
		const title = e.target.title.value
		const description = e.target.description.value
		if(!auth) return alert("Please Login first");
		let {status, data} = await axios.post("http://localhost:2000/api/posts", {title, description, userId: auth._id})
		console.log(data, status)
	}
	
	useEffect(()=>{
		fetchPosts()
	}, [])
	
	
	async function fetchPosts(){
		try{
			let {status, data} = await axios.get("http://localhost:2000/api/posts")
			if(status === 200){
				setPosts(data.posts)
			}
		} catch (ex){
		
		}
	}
	
	
	return (
		<div>
			<Header />
			
			
			<div className="flex justify-between mt-10">
				<h4 className="font-medium text-lg text-white text-center ">All Posts</h4>
				<label htmlFor="my-modal-4" className="btn">Add Post</label>
			
			</div>
			
			{/* Put this part before </body> tag */}
			<input type="checkbox" id="my-modal-4" className="modal-toggle" />
			<label htmlFor="my-modal-4" className="modal cursor-pointer">
				<label className="modal-box relative" htmlFor="">
					<div className="rounded-xl">
						
						<h4 className="font-medium text-lg text-white text-center ">Add Post</h4>
						
						<form onSubmit={addPostHandler} className="mt-5">
							<input name="title" type="text" placeholder="Title"
							       className="input w-full input-bordered input-primary w-full"/>
							<textarea rows={6} name="description" className="mt-2 w-full textarea textarea-primary" placeholder="Description"></textarea>
							<button type="submit" className="btn btn-primary w-full mt-4">Add</button>
						
						</form>
					</div>
				
				
				
				</label>
			</label>
			
			
			
			<Posts posts={posts} />
		</div>
	);
};

export default HomePage;