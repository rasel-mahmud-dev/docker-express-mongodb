import {useEffect, useState} from 'react'
import './App.css'
import axios from "axios";
import Posts from "./components/Posts";

import {RouterProvider} from "react-router-dom"
import routes from "./routes";

function App() {
	
	
	
	return (
		<div className="App">
			
			
			{<RouterProvider router={routes} /> }
		
		
		</div>
	)
}





export default App
