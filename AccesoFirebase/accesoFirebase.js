// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth"; 
import { initializeAuth, getReactNativePersistence } from 'firebase/auth';
import AsyncStorage from '@react-native-async-storage/async-storage';

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAyN3HZHOjx2HYfuKJwFFFZgJW6S2e_LnE",
  authDomain: "metasalud-34471.firebaseapp.com",
  projectId: "metasalud-34471",
  storageBucket: "metasalud-34471.appspot.com",
  messagingSenderId: "571271059705",
  appId: "1:571271059705:web:0786ac79f295c839f1ea28"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = initializeAuth(app, {
  persistence: getReactNativePersistence(AsyncStorage)
});


export { app, auth };