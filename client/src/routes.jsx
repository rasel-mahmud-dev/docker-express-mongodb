import Main from "./layout/Main";

import {createBrowserRouter} from "react-router-dom"
import HomePage from "./pages/HomePage";
import ProductDetail from "./pages/ProductDetail";
import Login from "./pages/Login";
import Order from "./pages/Order";
import Carts from "./pages/Carts";

const routes = createBrowserRouter([
	{
		path: "/",
		element: <Main/>,
		children: [
			{
				
				path: "",
				element: <HomePage/>,
				
			},
			{
				
				path: "p/:slug",
				element: <ProductDetail/>,
				
			},	{

				path: "orders",
				element: <Order/>,

			},{

				path: "carts",
				element: <Carts/>,

			},
			{
				
				path: "login",
				element: <Login/>,
				
			}
		
		]
	}
])

export default routes