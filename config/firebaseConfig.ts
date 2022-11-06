import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import {getDatabase} from "firebase/database";

// Optionally import the services that you want to use
//import {...} from "firebase/auth";
//import {...} from "firebase/firestore";
//import {...} from "firebase/functions";

// Initialize Firebase
const firebaseConfig = {
    apiKey: "AIzaSyBsEDy-Gs2nHdNRha-oMO3TNuLWUY8kevs",
    authDomain: "balance-felpoca.firebaseapp.com",
    databaseURL: "https://balance-felpoca-default-rtdb.firebaseio.com",
    projectId: "balance-felpoca",
    storageBucket: "balance-felpoca.appspot.com",
    messagingSenderId: "236524620652",
    appId: "1:236524620652:web:7b1a106bdc8f41533bc149"
};

const app = initializeApp(firebaseConfig);
export const appAuth = getAuth(app);
export const appDB = getDatabase(app);
// For more information on how to access Firebase in your project,
// see the Firebase documentation: https://firebase.google.com/docs/web/setup#access-firebase