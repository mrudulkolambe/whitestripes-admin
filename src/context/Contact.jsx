import { createContext, useContext, useState, useEffect } from "react";
import { collection, query, onSnapshot } from "firebase/firestore";
import { db } from "../configurations/firebase_config";

const ContactContext = createContext();

const ContactContextProvider = ({ children }) => {
	const [contacts, setContacts] = useState([]);

	useEffect(() => {
		const q = query(collection(db, "Responses"));
		const unsubscribe = onSnapshot(q, (querySnapshot) => {
			const contacts = [];
			querySnapshot.forEach((doc) => {
				contacts.push({...doc.data(), id: doc.id});
			});
			setContacts(contacts);
		});
	}, []);
	return <ContactContext.Provider value={{ contacts, setContacts }}>
		{children}
	</ContactContext.Provider>
}

const UseContact = () => {
	return useContext(ContactContext)
}

export { UseContact, ContactContextProvider };