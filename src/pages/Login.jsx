import React, { useState } from 'react'
import {signInWithEmailAndPassword} from 'firebase/auth';
import { UseAuth } from '../context/Auth';
import { auth } from '../configurations/firebase_config';
import { useNavigate } from 'react-router-dom';

const Login = () => {

	const {user, setUser} = UseAuth();
	const navigate = useNavigate()

	const initialState = {
		email: "",
		password: ""
	}

	const [formState, setFormState] = useState(initialState);

	const handleChange = (e) => {
		setFormState({
			...formState,
			[e.target.id]: e.target.value
		})
	}

	const handleSubmit = (e) => {
		signInWithEmailAndPassword(auth, formState.email, formState.password)
			.then((userCredential) => {
				const user = userCredential.user;
				setUser(user);
				navigate('/view/blogs')
			})
			.catch((error) => {
				setUser(undefined)
				alert(error.message)
			});
	}
	return (
		<>
			<section className="bg-gray-50 dark:bg-gray-900">
				<div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
					<a href="#" className="flex items-center mb-6 text-2xl font-semibold text-gray-900 dark:text-white">
						{/* <img className="h-24 bg-black" src="/logo.png" alt="logo" /> */}
					</a>
					<div className="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
						<div className="p-6 space-y-4 md:space-y-6 sm:p-8">
							<h1 className="text-center text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
								Login
							</h1>
							<form className="space-y-4 md:space-y-6">
								<div>
									<label htmlFor="email" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Your email</label>
									<input value={formState.email} onChange={handleChange} type="email" name="email" id="email" className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="name@company.com" required="" />
								</div>
								<div>
									<label htmlFor="password" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Password</label>
									<input value={formState.password} onChange={handleChange} type="password" name="password" id="password" placeholder="••••••••" className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" required="" />
								</div>
								<button type="button" onClick={handleSubmit} className="w-full text-white bg-primary-600 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800">Login</button>
								<p className="hidden text-sm font-light text-gray-500 dark:text-gray-400">
									Already have an account? <a href="#" className="font-medium text-primary-600 hover:underline dark:text-primary-500">Login here</a>
								</p>
							</form>
						</div>
					</div>
				</div>
			</section>
		</>
	)
}

export default Login
