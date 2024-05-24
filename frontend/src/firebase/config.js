// src/firebase/config.js
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

import firebase from "firebase/compat/app";
import "firebase/compat/auth";
import "firebase/compat/firestore";

const firebaseConfig = {
    apiKey: "AIzaSyAnze21uH8TUIqmG2kNPcjXPZZjgYQam9o",
    authDomain: "sustainability-dev-edb4a.firebaseapp.com",
    projectId: "sustainability-dev-edb4a",
    storageBucket: "sustainability-dev-edb4a.appspot.com",
    messagingSenderId: "262638248198",
    appId: "1:262638248198:web:3e13e54b62b7ba593e3e87",
    measurementId: "G-05NDKDTSGF"
  };

// Initialize Firebase
firebase.initializeApp(firebaseConfig);
const app = initializeApp(firebaseConfig);
const authentication = getAuth(app);

export { firebase, authentication };
