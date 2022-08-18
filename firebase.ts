// Import the functions you need from the SDKs you need
import { initializeApp, getApp, getApps } from 'firebase/app'
import { getFirestore } from 'firebase/firestore'
import { getAuth } from 'firebase/auth'

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCRmGZoOnwOfPyQl7hfDzkPa5dAtW44W5k",
  authDomain: "netflix-clone-nxt-js.firebaseapp.com",
  projectId: "netflix-clone-nxt-js",
  storageBucket: "netflix-clone-nxt-js.appspot.com",
  messagingSenderId: "307925697903",
  appId: "1:307925697903:web:61e30ab6fc779f3ef9149a"
};

// Initialize Firebase
const app = !getApps().length ? initializeApp(firebaseConfig) : getApp()
const db = getFirestore()
const auth = getAuth()

export default app
export { auth, db }