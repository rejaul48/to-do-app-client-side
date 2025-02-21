// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAsmYCZ2NP_Fce2757JiikZdIEp00ko8Rw",
  authDomain: "to-do-48.firebaseapp.com",
  projectId: "to-do-48",
  storageBucket: "to-do-48.firebasestorage.app",
  messagingSenderId: "559040676707",
  appId: "1:559040676707:web:cd2eac910da5c4ac0a8956"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export default app