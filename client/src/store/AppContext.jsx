import {createContext, useState} from "react";

export const AppContext = createContext({})

const AppProvider = (props) => {
	
	const [state, setState] = useState({
		posts: [],
		auth: null
	})
	
	return (
		<div>
			<AppContext.Provider value={[state, setState]}>
				{props.children}
			</AppContext.Provider>
		</div>
	)
}

export default AppProvider