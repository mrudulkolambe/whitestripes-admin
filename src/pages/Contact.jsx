import React, { useEffect, useState } from 'react'
import Navbar from '../Components/Navbar'
import { BsTrash } from 'react-icons/bs'
import { UseContact } from '../context/Contact'
import { db } from '../configurations/firebase_config'
import { deleteDoc, doc } from 'firebase/firestore'

const Contact = () => {
	const { contacts } = UseContact();
	const [searchContacts, setSearchContacts] = useState([])

	const handleSearch = (e) => {
		if (e.target.value.length === 0) {
			setSearchContacts(contacts);
		} else {
			setSearchContacts(contacts?.filter((data) => {
				return data.name.toLowerCase().includes(e.target.value.toLowerCase()) || data.phoneno.includes(e.target.value) || data.email.toLowerCase().includes(e.target.value.toLowerCase())
			}))
		}
	}

	useEffect(() => {
		setSearchContacts(contacts);
	}, [contacts]);

	const handleDelete = async (id) => {
		await deleteDoc(doc(db, "Responses", id));
	}
	return (
		<>
			<Navbar />
			<section className='p-10 custom-width min-h-screen dark:bg-gray-800 dark:border-gray-700'>
				<h1 className='font-bold text-3xl'>Contact</h1>
				<div className="mx-auto max-w-screen-xl px-4 lg:px-12">
					<div className=" dark:bg-gray-800 relative sm:rounded-lg overflow-hidden">
						<div className="flex flex-col md:flex-row items-center justify-between space-y-3 md:space-y-0 md:space-x-4 py-4">
							<div className="w-full md:w-1/2">
								<form className="flex items-center">
									<label for="simple-search" className="sr-only">Search</label>
									<div className="relative w-full">
										<div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
											<svg aria-hidden="true" className="w-5 h-5 text-gray-500 dark:text-gray-400" fill="currentColor" viewbox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
												<path fill-rule="evenodd" d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z" clip-rule="evenodd" />
											</svg>
										</div>
										<input onChange={handleSearch} type="text" id="simple-search" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full pl-10 p-2 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500" placeholder="Search" required="" />
									</div>
								</form>
							</div>
						</div>
						<div className="shadow-xl">
							<table className="border-gray-400 rounded-lg overflow-hidden w-full text-sm text-left text-gray-500 dark:text-gray-400">
								<thead className="rounded -t-lg text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
									<tr>
										<th scope="col" colSpan={1} className="px-4 py-3">Full name</th>
										<th scope="col" colSpan={1} className="px-4 py-3">Email</th>
										<th scope="col" colSpan={1} className="px-4 py-3">Phone Number</th>
										<th scope="col" colSpan={5} className="px-4 py-3">Message</th>
										<th scope="col" colSpan={1} className="px-4 py-3">Delete</th>
									</tr>
								</thead>
								<tbody>
									{
										searchContacts.map((data) => {
											return <tr key={data.id} className="bg-gray-200 border-b dark:border-gray-700">
												<th colSpan={1} scope="row" className="px-4 py-3 font-medium text-gray-900 whitespace-nowrap dark:text-white">{data.name}</th>
												<td colSpan={1} className="px-4 py-3">{data.email}</td>
												<td colSpan={1} className="px-4 py-3">{data.phoneno}</td>
												<td colSpan={5} className="px-4 py-3">{data.message}</td>
												<td colSpan={1} className="px-4 py-3 text-red-500  cursor-pointer"><BsTrash onClick={() => { handleDelete(data.id) }} /></td>
											</tr>
										})

									}
								</tbody>
							</table>
						</div>
					</div>
				</div>
			</section>
		</>
	)
}

export default Contact
