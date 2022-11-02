import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';

// Optionally import the services that you want to use
//import {...} from "firebase/auth";
//import {...} from "firebase/database";
//import {...} from "firebase/firestore";
//import {...} from "firebase/functions";
//import {...} from "firebase/storage";

// Initialize Firebase
const firebaseConfig = {
    apiKey: "AIzaSyCRxx1mOUL0iz2SAjK37PAYESf04qQD12k",
    authDomain: "balance-d3db6.firebaseapp.com",
    projectId: "balance-d3db6",
    storageBucket: "balance-d3db6.appspot.com",
    messagingSenderId: "584558764987",
    appId: "1:584558764987:web:ed92ccad77a9ae60ac5a9e"
};

const app = initializeApp(firebaseConfig);
export const appAuth = getAuth(app);
// For more information on how to access Firebase in your project,
// see the Firebase documentation: https://firebase.google.com/docs/web/setup#access-firebase