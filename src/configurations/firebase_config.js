import { initializeApp } from "firebase/app";
import { getAuth } from 'firebase/auth';
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";


const firebaseConfig = {
  apiKey: "AIzaSyBQ7c_kXG44Nh7CrpMYOUNzQlhiqwVm9RM",
  authDomain: "whitestripes-bda3d.firebaseapp.com",
  projectId: "whitestripes-bda3d",
  storageBucket: "whitestripes-bda3d.appspot.com",
  messagingSenderId: "358224549796",
  appId: "1:358224549796:web:b0368b64bf1f1fde9e1331"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const storage = getStorage(app);
export const db = getFirestore(app);