import { createContext, useContext, useState, useEffect } from "react";
import { collection, query, onSnapshot } from "firebase/firestore";
import { db } from "../configurations/firebase_config";

const ServiceContext = createContext();

const ServiceContextProvider = ({ children }) => {
	const [services, setServices] = useState([]);

	useEffect(() => {
		const q = query(collection(db, "services"));
		const unsubscribe = onSnapshot(q, (querySnapshot) => {
			const services = [];
			querySnapshot.forEach((doc) => {
				services.push({...doc.data(), id: doc.id});
			});
			setServices(services);
		});
	}, []);
	return <ServiceContext.Provider value={{ services, setServices }}>
		{children}
	</ServiceContext.Provider>
}

const UseServices = () => {
	return useContext(ServiceContext)
}

export { UseServices, ServiceContextProvider };