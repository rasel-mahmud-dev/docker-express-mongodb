import React, {useContext, useEffect, useState} from 'react';
import Product from "../components/Products";
import axios from "axios";
import Header from "../components/Header";
import {AppContext} from "../store/AppContext";
import api from "../apis/axios";

const HomePage = () => {
	
	const [count, setCount] = useState(0)
	

	const [{auth, products}, setState] = useContext(AppContext)
	

	
	async function addPostHandler(e) {
		e.preventDefault()
		
		const title = e.target.title.value
		const description = e.target.description.value
		if(!auth) return alert("Please Login first");
		let {status, data} = await axios.post("http://localhost:2000/api/products", {title, description, userId: auth._id})
		console.log(data, status)
	}
	
	useEffect(()=>{
		if(products.length === 0){
			fetchPosts()
		}
	}, [])
	
	
	async function fetchPosts(){
		try{
			let {status, data} = await api.get("/api/products")
			if(status === 200){
				setState(prev=>({
					...prev,
					products: data.products
				}))
			}
		} catch (ex){
		
		}
	}
	
	
	return (
		<div className="container">

			
			
			<div className="flex justify-between mt-10">
				<h4 className="font-semibold text-2xl text-gray-700 text-center ">Products</h4>
				{/*<label htmlFor="my-modal-4" className="btn">Add Product</label>*/}
			
			</div>
			
			{/* Put this part before </body> tag */}
			<input type="checkbox" id="my-modal-4" className="modal-toggle" />
			<label htmlFor="my-modal-4" className="modal cursor-pointer">
				<label className="modal-box relative" htmlFor="">
					<div className="rounded-xl">
						
						{/*<h4 className="font-medium text-lg text-white text-center ">Add Product</h4>*/}
						
						<form onSubmit={addPostHandler} className="mt-5">
							<input name="title" type="text" placeholder="Title"
							       className="input w-full input-bordered input-primary w-full"/>
							<textarea rows={6} name="description" className="mt-2 w-full textarea textarea-primary" placeholder="Description"></textarea>
							<button type="submit" className="btn btn-primary w-full mt-4">Add</button>
						
						</form>
					</div>
				
				
				
				</label>
			</label>

			<Product products={products} />
		</div>
	);
};

export default HomePage;