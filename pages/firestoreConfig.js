
// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore } from "firebase/firestore";
const  firebaseConfig = {
  apiKey: "AIzaSyAslvKIwGKp9m4YFbC-NZRbmmDXwBOfJmA",
  authDomain: "confrencewebsite.firebaseapp.com",
  projectId: "confrencewebsite",
  storageBucket: "confrencewebsite.appspot.com",
  messagingSenderId: "511860114926",
  appId: "1:511860114926:web:45651c7ac1c8040406baff",
  measurementId: "G-0J6GTCSWX4",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
// const analytics = getAnalytics(app);
const db = getFirestore(app);
export { db };


const PinPagje = () => {
  return (
    <div>
      {/* Your component logic here */}
      <p>Pin: </p>
    </div>
  );
};

export default PinPagje;