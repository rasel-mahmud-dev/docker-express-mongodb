import React, {useContext, useEffect} from 'react';
import {Outlet} from "react-router-dom"
import {AppContext} from "../store/AppContext";
import axios from "axios";
import Header from "../components/Header";
import api from "../apis/axios";

const Main = () => {
	
	const [state, setState] = useContext(AppContext)
	
	useEffect(()=>{

		api.get("/api/users/verify").then(({data, status})=>{
			if(status === 201){
				setState(prev=>({
					...prev,
					auth: data
				}))
			}
		}).catch(ex=>{
			console.log(ex)
		})


		api.get("/api/carts/count").then(({data, status})=>{
			if(status === 200){
				setState(prev=>({
					...prev,
					totalCarts: data.count
				}))
			}
		}).catch(ex=>{
			console.log(ex)
		})



	}, [])
	
	
	return (
		<div>

			<Header />
			
			
			<Outlet />
			
		</div>
	);
};

export default Main;