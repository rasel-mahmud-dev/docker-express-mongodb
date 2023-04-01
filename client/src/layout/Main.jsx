import React, {useContext, useEffect} from 'react';
import {Outlet} from "react-router-dom"
import {AppContext} from "../store/AppContext";
import axios from "axios";

const Main = () => {
	
	const [state, setState] = useContext(AppContext)
	
	useEffect(()=>{
		let token = localStorage.getItem("app_token") || ""
		axios.get("http://localhost:2003/api/auth/verify", {
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
			
			
			
			
			<Outlet />
			
		</div>
	);
};

export default Main;