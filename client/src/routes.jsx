import Main from "./layout/Main";

import {createBrowserRouter} from "react-router-dom"
import HomePage from "./pages/HomePage";
import PostDetail from "./pages/PostDetail";
import Login from "./pages/Login";

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
				
				path: "posts/:postId",
				element: <PostDetail/>,
				
			},{
				
				path: "login",
				element: <Login/>,
				
			}
		
		]
	}
])

export default routes