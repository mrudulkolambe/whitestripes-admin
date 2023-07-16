import { createContext, useContext, useState, useEffect } from "react";
import { collection, query, onSnapshot } from "firebase/firestore";
import { db } from "../configurations/firebase_config";

const BlogsContext = createContext();

const BlogsContextProvider = ({ children }) => {
	const [blogs, setBlogs] = useState([]);

	useEffect(() => {
		const q = query(collection(db, "blogs"));
		const unsubscribe = onSnapshot(q, (querySnapshot) => {
			const blogs = [];
			querySnapshot.forEach((doc) => {
				blogs.push({...doc.data(), id: doc.id});
			});
			setBlogs(blogs);
		});
	}, []);
	return <BlogsContext.Provider value={{ blogs, setBlogs }}>
		{children}
	</BlogsContext.Provider>
}

const UseBlogs = () => {
	return useContext(BlogsContext)
}

export { UseBlogs, BlogsContextProvider };