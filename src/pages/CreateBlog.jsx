import React, { useState } from 'react'
import Navbar from '../Components/Navbar'
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import { getDownloadURL, ref, uploadBytesResumable } from 'firebase/storage';
import { db, storage } from '../configurations/firebase_config';
import { BiLink } from 'react-icons/bi';
import { useNavigate, useParams } from 'react-router-dom';
import { useEffect } from 'react';
import { addDoc, collection, doc, getDoc, updateDoc } from 'firebase/firestore';

const CreateBlog = () => {
	const initialState = {
		title: "",
		description: "",
		author: "",
	}
	const { id } = useParams()

	const [img, setImg] = useState('')
	const [otherImage, setOtherImage] = useState('')
	const [formState, setFormState] = useState(initialState);
	const [content, setContent] = useState("");
	const navigate = useNavigate()

	const handleChange = (e) => {
		setFormState({
			...formState,
			[e.target.id]: e.target.value
		})
	}

	useEffect(() => {
		getBlog()
	}, [id]);

	const getBlog = async () => {
		if (id) {
			const docRef = doc(db, "blogs", id);
			const docSnap = await getDoc(docRef);
			if (docSnap.exists()) {
				setImg(docSnap.data().img)
				setOtherImage(docSnap.data().otherImage)
				setFormState(docSnap.data())
				setContent(docSnap.data().content)
			} else {
				alert("No such document!");
			}
		}
	}

	const manageBlog = async () => {
		if (id) {
			const docRef = await updateDoc(doc(db, "blogs", id), {
				...formState,
				img,
				otherImage,
				content
			})
				.then(() => {
					alert('Blog Updated');
					setContent('')
					setImg('')
					setOtherImage('')
					navigate("/view/blogs")
				}).catch((err) => {
					alert(err.message)
				})
		} else {
			const date = new Date();
			const dateString = `${date.getDate()}-${date.getMonth() + 1}-${date.getFullYear()}`
			const docRef = await addDoc(collection(db, "blogs"), {
				...formState,
				img,
				otherImage,
				content,
				date: dateString
			})
				.then(() => {
					alert('Blog Added');
					setContent('')
					setImg('')
					setOtherImage('')
					setFormState(initialState)
				}).catch((err) => {
					alert(err.message)
				})
		}
	}

	const uploadFiles = (file, stateSetter, path) => {
		const storageRef = ref(storage, path);
		const uploadTask = uploadBytesResumable(storageRef, file);
		uploadTask.on('state_changed',
			(snapshot) => {
				const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
				switch (snapshot.state) {
					case 'paused':
						break;
					case 'running':
						break;
				}
			},
			(error) => {
				alert(error.message)
			},
			() => {
				getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
					stateSetter(downloadURL)
				});
			}
		);
	}
	return (
		<>
			<Navbar />
			<section className='p-10 custom-width min-h-screen dark:bg-gray-800 dark:border-gray-700'>
				<h1 className='font-bold text-3xl'>{id ? "Update" : "Create"} Blog</h1>
				<div className='py-8'>
					<section className="dark:bg-gray-900">
						<div className="p-4">
							<div>
								<div className="grid gap-4">
									<div className="sm:col-span-2">
										<label for="name" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Title</label>
										<input type="text" value={formState.title} onChange={handleChange} name="name" id="title" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500" placeholder="Type Blog Title" required="" />
									</div>
									<div className="sm:col-span-2">
										<label for="description" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Description</label>
										<textarea value={formState.description} onChange={handleChange} id="description" rows="4" className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-primary-500 focus:border-primary-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500" placeholder="Write description here"></textarea>
									</div>
									<div className="sm:col-span-2">
										<label for="name" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Author</label>
										<input type="text" value={formState.author} onChange={handleChange} name="name" id="author" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500" placeholder="Author name" required="" />
									</div>
									<div className="w-full">
										<label for="brand" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Main Image</label>
										<div className='flex gap-3 items-center'>
											<input onChange={(e) => { uploadFiles(e.target.files[0], setImg, `blog/${formState.author}/${formState.title}-main-img.jpg`) }} type="file" accept='image/*' name="brand" id="brand" className={img.length > 0 ? "bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500 w-[90%]" : "bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"} required="" />
											{img.length > 0 && <a href={img} target='_blank' className='text-blue-500'><BiLink /></a>}
										</div>
									</div>
									<div className="w-full">
										<label for="brand" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Other Image</label>
										<div className='flex gap-3 items-center'>
											<input onChange={(e) => { uploadFiles(e.target.files[0], setOtherImage, `blog/other/${formState.author}/${formState.title}-main-img.jpg`) }} type="file" accept='image/*' name="brand" id="brand" className={otherImage.length > 0 ? "bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500 w-[90%]" : "bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"} required="" />
											{otherImage.length > 0 && <a href={otherImage} target='_blank' className='text-blue-500'><BiLink /></a>}
										</div>
									</div>
									<div className="sm:col-span-2">
										<label for="name" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Content</label>
										<ReactQuill placeholder='Type content here' className='h-[300px] col-span-2 w-full' theme="snow" value={content} onChange={setContent} />
									</div>
								</div>
								<button onClick={manageBlog} type="button" className=" inline-flex items-center px-5 py-2.5 mt-[3.5rem] text-sm font-medium text-center text-white bg-primary-700 rounded-lg focus:ring-4 focus:ring-primary-200 dark:focus:ring-primary-900 hover:bg-primary-800">
									Submit
								</button>
							</div>
						</div>
					</section>
				</div>
			</section>
		</>
	)
}

export default CreateBlog
