import {useEffect, useState} from 'react'
import './App.css'
import axios from "axios";
import Product from "./components/Products";
import 'react-toastify/dist/ReactToastify.css';

import {RouterProvider} from "react-router-dom"
import routes from "./routes";
import {ToastContainer} from "react-toastify";

function App() {
	
	
	
	return (
		<div className="App">
			
			
			{<RouterProvider router={routes} /> }
			<ToastContainer />
		
		</div>
	)
}





export default App
