import { initializeApp } from 'firebase/app';
import {
  getAuth,
  signInWithPopup,
  GoogleAuthProvider,
} from 'firebase/auth';

const firebaseConfig  = {
    apiKey: "AIzaSyAnze21uH8TUIqmG2kNPcjXPZZjgYQam9o",
    authDomain: "sustainability-dev-edb4a.firebaseapp.com",
    projectId: "sustainability-dev-edb4a",
    storageBucket: "sustainability-dev-edb4a.appspot.com",
    messagingSenderId: "262638248198",
    appId: "1:262638248198:web:3e13e54b62b7ba593e3e87",
    measurementId: "G-05NDKDTSGF"
};

const firebaseApp = initializeApp(firebaseConfig);

const googleProvider = new GoogleAuthProvider();

googleProvider.setCustomParameters({
  prompt: 'select_account',
});

const auth = getAuth();

export const signInWithGooglePopup = () =>
  signInWithPopup(auth, googleProvider);