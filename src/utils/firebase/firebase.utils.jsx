import { initializeApp } from 'firebase/app';
import { getAuth, signInWithRedirect, signInWithPopup, GoogleAuthProvider } from 'firebase/auth'

const firebaseConfig = {
    apiKey: "AIzaSyBwXFdp37f6gVDGXMWyLwmVXEzXkMkaLRE",
    authDomain: "crwn-clothing-db-e9197.firebaseapp.com",
    projectId: "crwn-clothing-db-e9197",
    storageBucket: "crwn-clothing-db-e9197.appspot.com",
    messagingSenderId: "562267540587",
    appId: "1:562267540587:web:7aa0ee31db904e1e61b52e"
};
  
const firebaseApp = initializeApp(firebaseConfig);

const provider = new GoogleAuthProvider();
provider.setCustomParameters({
    prompt: 'select_account'
});

export const auth = getAuth();
export const signInWithGooglePopup = () => signInWithGooglePopup(auth, provider);


