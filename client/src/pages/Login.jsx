import React, {useContext} from 'react';
import axios from "axios";
import {AppContext} from "../store/AppContext";
import {useNavigate} from "react-router-dom";

const Login = () => {
	
	const [state, setState] = useContext(AppContext)
	
	const navigate = useNavigate()
	
	async function handleLogin(e) {
		e.preventDefault();
		let email = e.target.email.value
		let password = e.target.password.value
		
		let {status, data} = await axios.post("http://localhost:2003/api/auth/login", {email, password})
		if (status === 201) {
			localStorage.setItem("app_token", data.token)
			setState(prev=>({
				...prev,
				auth: data
			}))
			
			navigate("/")
			
		}
	}
	
	return (
		<div className="max-w-md mx-auto p-4 border border-gray-600/50 rounded-xl bg-base-100 my-20">
			<h4 className="font-semibold text-xl mb-3">Login</h4>
			<form onSubmit={handleLogin}>
				<input name="email" className="mt-2 w-full input input-primary"
				       placeholder="You Email"/>
				<input name="password" className="mt-2 w-full input input-primary"
				       placeholder="You Password"/>
				<button type="submit" className="mt-2 btn btn-primary w-full mt-4">Login</button>
			</form>
		</div>
	);
};

export default Login;