import React, { useEffect, useState } from 'react'
import Navbar from '../Components/Navbar'
import { getDownloadURL, ref, uploadBytesResumable } from "firebase/storage";
import { db, storage } from '../configurations/firebase_config';
import services from '../configurations/services';
import { BiLink } from 'react-icons/bi'
import { collection, addDoc, updateDoc, doc, getDoc } from "firebase/firestore";
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import { useParams } from 'react-router-dom';


const Services = () => {
	const [servicesOption, setServicesOption] = useState('architectural-designing')
	const [title, setTitle] = useState("")
	const [mainImg, setMainImg] = useState("")
	const [bgImg, setBgImg] = useState("")
	const [img1, setImg1] = useState("")
	const [img2, setImg2] = useState("")
	const [img3, setImg3] = useState("")
	const [img4, setImg4] = useState("")
	const [img5, setImg5] = useState("")
	const [img6, setImg6] = useState("")
	const [value, setValue] = useState('');

	const { id } = useParams();

	useEffect(() => {
		handleFetch()
	}, [id]);

	const handleFetch = async () => {
		if (id) {
			const docRef = doc(db, "services", id);
			const docSnap = await getDoc(docRef);
			if (docSnap.exists()) {
				setTitle(docSnap.data().title)
				setValue(docSnap.data().description)
				setBgImg(docSnap.data().bgImg)
				setMainImg(docSnap.data().mainImg)
				setImg1(docSnap.data().img1)
				setImg2(docSnap.data().img2)
				setImg3(docSnap.data().img3)
				setImg4(docSnap.data().img4)
				setImg5(docSnap.data().img5)
				setImg6(docSnap.data().img6)
			} else {
				alert("No such document!");
			}
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

	const manageData = async () => {
		if (id) {
			const docRef = await updateDoc(doc(db, "services", id), {
				title: title,
				services: services.filter((data) => {
					return data.value === servicesOption
				})[0],
				mainImg,
				bgImg,
				img1,
				img2,
				img3,
				img4,
				img5,
				img6,
				description: value
			})
				.then(() => {
					alert('Service Updated');
					setBgImg('')
					setImg1('')
					setImg2('')
					setImg3('')
					setImg4('')
					setImg5('')
					setImg6('')
					setMainImg('')
					setServicesOption('architectural-designing')
					setTitle('')
					setValue('')
				})
				.catch((err) => {
					alert(err.message)
				})
		} else {
			const docRef = await addDoc(collection(db, "services"), {
				title: title,
				services: services.filter((data) => {
					return data.value === servicesOption
				})[0],
				mainImg,
				bgImg,
				img1,
				img2,
				img3,
				img4,
				img5,
				img6,
				description: value
			})
				.then(() => {
					alert('Service Added');
					setBgImg('')
					setImg1('')
					setImg2('')
					setImg3('')
					setImg4('')
					setImg5('')
					setImg6('')
					setMainImg('')
					setServicesOption('architectural-designing')
					setTitle('')
					setValue('')
				})
				.catch((err) => {
					alert(err.message)
				})
		}
	}
	return (
		<>
			<Navbar />
			<section className='p-10 custom-width min-h-screen dark:bg-gray-800 dark:border-gray-700'>
				<h1 className='font-bold text-3xl'>Services</h1>
				<div className='py-8'>
					<section className="dark:bg-gray-900">
						<div className="p-4">
							{/* <h2 className="mb-4 text-xl font-bold text-gray-900 dark:text-white">Add a new product</h2> */}
							<div>
								<div className="grid gap-4 sm:grid-cols-2 sm:gap-6">
									<div className="sm:col-span-2">
										<label for="category" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Services</label>
										<select value={servicesOption} onChange={(e) => { setServicesOption(e.target.value) }} id="service" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500">
											{
												services.map((option) => {
													return <option value={option.value}>{option.label}</option>
												})
											}
										</select>
									</div>
									<div className="sm:col-span-2">
										<label for="name" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Title</label>
										<input type="text" value={title} onChange={(e) => { setTitle(e.target.value) }} name="name" id="name" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500" placeholder="Type Service Title" required="" />
									</div>
									<div className="w-full">
										<label for="brand" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Main Image</label>
										<div className='flex gap-3 items-center'>
											<input onChange={(e) => { uploadFiles(e.target.files[0], setMainImg, `services/${servicesOption}/${title}-main-img.jpg`) }} type="file" accept='image/*' name="brand" id="brand" className={mainImg.length > 0 ? "bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500 w-[90%]" : "bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"} required="" />
											{mainImg.length > 0 && <a href={mainImg} target='_blank' className='text-blue-500'><BiLink /></a>}
										</div>
									</div>
									<div className="w-full">
										<label for="price" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Background Image</label>
										<div className='flex gap-3 items-center'>
											<input onChange={(e) => { uploadFiles(e.target.files[0], setBgImg, `services/${servicesOption}/${title}-bg-img.jpg`) }} type="file" accept='image/*' name="brand" id="brand" className={bgImg.length > 0 ? "bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500 w-[90%]" : "bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"} required="" />
											{bgImg.length > 0 && <a href={bgImg} target='_blank' className='text-blue-500'><BiLink /></a>}
										</div>
									</div>
									<div className="w-full">
										<label for="price" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Image 1</label>
										<div className='flex gap-3 items-center'>
											<input onChange={(e) => { uploadFiles(e.target.files[0], setImg1, `services/${servicesOption}/${title}-img1-img.jpg`) }} type="file" accept='image/*' name="brand" id="brand" className={img1.length > 0 ? "bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500 w-[90%]" : "bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"} required="" />
											{img1.length > 0 && <a href={img1} target='_blank' className='text-blue-500'><BiLink /></a>}
										</div>
									</div>
									<div className="w-full">
										<label for="price" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Image 2</label>
										<div className='flex gap-3 items-center'>
											<input onChange={(e) => { uploadFiles(e.target.files[0], setImg2, `services/${servicesOption}/${title}-img2-img.jpg`) }} type="file" accept='image/*' name="brand" id="brand" className={img2.length > 0 ? "bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500 w-[90%]" : "bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"} required="" />
											{img2.length > 0 && <a href={img2} target='_blank' className='text-blue-500'><BiLink /></a>}
										</div>
									</div>
									<div className="w-full">
										<label for="price" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Image 3</label>
										<div className='flex gap-3 items-center'>
											<input onChange={(e) => { uploadFiles(e.target.files[0], setImg3, `services/${servicesOption}/${title}-img3-img.jpg`) }} type="file" accept='image/*' name="brand" id="brand" className={img3.length > 0 ? "bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500 w-[90%]" : "bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"} required="" />
											{img3.length > 0 && <a href={img3} target='_blank' className='text-blue-500'><BiLink /></a>}
										</div>
									</div>
									<div className="w-full">
										<label for="price" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Image 4</label>
										<div className='flex gap-3 items-center'>
											<input onChange={(e) => { uploadFiles(e.target.files[0], setImg4, `services/${servicesOption}/${title}-img4-img.jpg`) }} type="file" accept='image/*' name="brand" id="brand" className={img4.length > 0 ? "bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500 w-[90%]" : "bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"} required="" />
											{img4.length > 0 && <a href={img4} target='_blank' className='text-blue-500'><BiLink /></a>}
										</div>
									</div>
									<div className="w-full">
										<label for="price" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Image 5</label>
										<div className='flex gap-3 items-center'>
											<input onChange={(e) => { uploadFiles(e.target.files[0], setImg5, `services/${servicesOption}/${title}-img5-img.jpg`) }} type="file" accept='image/*' name="brand" id="brand" className={img5.length > 0 ? "bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500 w-[90%]" : "bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"} required="" />
											{img5.length > 0 && <a href={img5} target='_blank' className='text-blue-500'><BiLink /></a>}
										</div>
									</div>
									<div className="w-full">
										<label for="price" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Image 6</label>
										<div className='flex gap-3 items-center'>
											<input onChange={(e) => { uploadFiles(e.target.files[0], setImg6, `services/${servicesOption}/${title}-img6-img.jpg`) }} type="file" accept='image/*' name="brand" id="brand" className={img6.length > 0 ? "bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500 w-[90%]" : "bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"} required="" />
											{img6.length > 0 && <a href={img6} target='_blank' className='text-blue-500'><BiLink /></a>}
										</div>
									</div>
									<ReactQuill className='hiddenToolbar h-[300px] col-span-2 w-full' theme="snow" value={value} onChange={setValue} />
								</div>
								<button onClick={manageData} type="button" className=" inline-flex items-center px-5 py-2.5 mt-[1.5rem] text-sm font-medium text-center text-white bg-primary-700 rounded-lg focus:ring-4 focus:ring-primary-200 dark:focus:ring-primary-900 hover:bg-primary-800">
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

export default Services
