import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";



/* const firebaseConfig = {

  apiKey: process.env.REACT_APP_FIREBASE_APIKEY,

  authDomain: process.env.REACT_APP_FIREBASE_AUTHDOMAIN,

  projectId: process.env.REACT_APP_FIREBASE_PROJECTID,

  storageBucket: process.env.REACT_APP_FIREBASE_STORAGEBUCKET,

  messagingSenderId: process.env.REACT_APP_FIREBASE_MESSAGINGSENDERID,

  appId: process.env.REACT_APP_FIREBASE_APPID

}; */

const firebaseConfig = {

  apiKey: "AIzaSyC6rPWTMAbZ_AvZYWRMqrGeynBqMeZhAEg",

  authDomain: "burgerqueen-3.firebaseapp.com",

  projectId: "burgerqueen-3",

  storageBucket: "burgerqueen-3.appspot.com",

  messagingSenderId: "482328602780",

  appId: "1:482328602780:web:00534814359ba7349e2559"

};


const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export default db;
