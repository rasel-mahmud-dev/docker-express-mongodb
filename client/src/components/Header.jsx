import React, {useContext, useState} from 'react';
import {AppContext} from "../store/AppContext";
import {BiBox, BiHome, BiShoppingBag, CiHome, FaFirstOrder, FaSignInAlt, FiShoppingCart} from "react-icons/all";
import {Link, useNavigate} from "react-router-dom";

const Header = () => {
	
	const [{auth, totalCarts}, setState] = useContext(AppContext)
	const navigate = useNavigate()
	
	function handleLogout(e) {
		e.preventDefault();
		setState(prev => ({
			...prev,
			auth: null
		}))
		
		navigate("/login")
	}


	console.log(totalCarts)

	return (
		<div>
			<header className="bg-primary z-1000 fixed top-0 left-0 w-full flex justify-between items-center px-8 py-4">
				<div className="flex items-center gap-x-2">
					<img className="w-10" src="/microservice.png" alt=""/>
					<h4 className="ml-2 font-semibold">
						Micro
					</h4>
				</div>
				
				
				<div className="flex items-center gap-x-4 items-center">
					
					<div className="text-white flex items-center gap-x-8 mr-20">
						<li className="nav_link">
							<Link to="/">
								<BiHome/>
								<span>Home</span>
							</Link>
						
						</li>
						<li className="nav_link">
							<Link to="/">
								<BiBox/>
								<span>Products</span>
							</Link>
						</li>
						<li className="nav_link">
							<Link to="/orders">
								
								<BiShoppingBag/>
								<span>Orders</span>
							</Link>
						</li>
						<li className="nav_link relative">

							{totalCarts > 0 && <div className="badge badge-secondary absolute -top-4 left-2 !text-xs">{totalCarts}</div> }

							<Link to="/carts">
								<FiShoppingCart/>
								<span>Shopping Carts</span>
							</Link>
						</li>
					</div>
					
					{auth ? (
						<div className="dropdown">
							
							<div tabIndex={0}
							     className="w-10 rounded-full ring ring-primary ring-offset-base-100 rounded-full">
								<img className="rounded-full" src={auth.avatar}/>
							</div>
							
							<ul tabIndex={0}
							    className="absolute right-0 dropdown-content menu p-4 shadow bg-base-100 rounded-box w-52">
								
								<div tabIndex={0}
								     className="w-20 mx-auto rounded-full ring ring-primary ring-offset-base-100 rounded-full">
									<img className="rounded-full" src={auth.avatar}/>
								</div>
								
								<div className="text-center mt-2">
									<h2>{auth.email}</h2>
									<h2>{auth.firstName} {auth.lastName}</h2>
								</div>
								
								
								<div className="mt-4 text-white">
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
								<div className="flex text-white items-center gap-x-1  px-2 py-2 rounded-md">
									<FaSignInAlt/>
									<span>Login</span>
								</div>
							</Link>
						</div>
					)}
				</div>
			</header>
			<div className="h-[72px]"></div>
		</div>
	
	
	);
};

export default Header;