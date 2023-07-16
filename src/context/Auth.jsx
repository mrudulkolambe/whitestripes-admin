import { useEffect } from "react";
import { auth } from "../configurations/firebase_config";
import { onAuthStateChanged, signOut } from "firebase/auth";
import { useNavigate } from "react-router-dom";

const { createContext, useContext, useState } = require("react");

const AuthContext = createContext();

const AuthContextProvider = ({ children }) => {
	const [user, setUser] = useState();
	const navigate = useNavigate();
	useEffect(() => {
		onAuthStateChanged(auth, (user) => {
			if (user) {
				setUser(user)
			} else {
				setUser()
				navigate('/')
			}
		});
	}, []);

	const logoutUser = () => {
		signOut(auth).then(() => {
			setUser()
			navigate('/')
		}).catch((error) => {
			alert(error.message)
		});
	}

	return <AuthContext.Provider value={{ user, setUser, logoutUser }}>
		{children}
	</AuthContext.Provider>
}

const UseAuth = () => {
	return useContext(AuthContext)
}

export { UseAuth, AuthContextProvider };