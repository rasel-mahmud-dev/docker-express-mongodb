import React, {useContext, useEffect} from 'react';
import {Outlet} from "react-router-dom"
import {AppContext} from "../store/AppContext";
import axios from "axios";
import Header from "../components/Header";
import api from "../apis/axios";

const Main = () => {
	
	const [state, setState] = useContext(AppContext)
	
	useEffect(()=>{
		let token = localStorage.getItem("app_token") || ""
		api.get("http://localhost:2003/api/users/verify", {
			headers: {
				"authorization": token
			}
		}).then(({data, status})=>{
	
			if(status === 201){
				setState(prev=>({
					...prev,
					auth: data
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