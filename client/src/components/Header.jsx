import React, {useContext, useState} from 'react';
import {AppContext} from "../store/AppContext";
import {FaSignInAlt} from "react-icons/all";
import {Link, useNavigate} from "react-router-dom";

const Header = () => {
	
	const [{auth}, setState] = useContext(AppContext)
	const navigate = useNavigate()
	
	function handleLogout(e){
		e.preventDefault();
		setState(prev=>({
			...prev,
			auth: null
		}))
		
		navigate("/login")
	}
	
	return (
		<header className="bg-primary/10 flex justify-between items-center  rounded-xl py-2 px-0">
			<h4 className="ml-3 font-semibold">Micro</h4>
			<div>
				{auth ? (
					<div className="dropdown">
					
						<div tabIndex={0} className="w-10 rounded-full ring ring-primary ring-offset-base-100 rounded-full">
							<img className="rounded-full" src={auth.avatar}/>
						</div>
						
						<ul tabIndex={0} className="absolute right-0 dropdown-content menu p-4 shadow bg-base-100 rounded-box w-52">
							
							<div tabIndex={0} className="w-20 mx-auto rounded-full ring ring-primary ring-offset-base-100 rounded-full">
								<img className="rounded-full" src={auth.avatar}/>
							</div>
							
							<div className="text-center mt-2">
								<h2>{auth.email}</h2>
								<h2>{auth.firstName} {auth.lastName}</h2>
							</div>
							
							
							<div className="mt-4">
								<li>
									<Link to="/">Home</Link>
								
								</li>
								<li>
									<Link to="/">Posts</Link>
								</li>
								<li>
									<a onClick={handleLogout}>Logout</a>
								</li>
							</div>
						</ul>
					</div>
					
				) : (
					<div>
						<Link to="/login">
							<div className="flex items-center gap-x-1  px-2 py-2 rounded-md">
								<FaSignInAlt/>
								<span>Login</span>
							</div>
						</Link>
					</div>
				)}
			</div>
		</header>
	
	
	);
};

export default Header;