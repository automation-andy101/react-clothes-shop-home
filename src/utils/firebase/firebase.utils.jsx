import { initializeApp } from 'firebase/app';
import { getAuth, signInWithRedirect, signInWithPopup, GoogleAuthProvider } from 'firebase/auth';
import { getFirestore, doc, getDoc, setDoc} from 'firebase/firestore';


const firebaseConfig = {
    apiKey: "AIzaSyBwXFdp37f6gVDGXMWyLwmVXEzXkMkaLRE",
    authDomain: "crwn-clothing-db-e9197.firebaseapp.com",
    projectId: "crwn-clothing-db-e9197",
    storageBucket: "crwn-clothing-db-e9197.appspot.com",
    messagingSenderId: "562267540587",
    appId: "1:562267540587:web:7aa0ee31db904e1e61b52e"
};
  
const firebaseApp = initializeApp(firebaseConfig);

const googleProvider = new GoogleAuthProvider();
googleProvider.setCustomParameters({
    prompt: 'select_account'
});

export const auth = getAuth();
export const signInWithGooglePopup = () => signInWithPopup(auth, googleProvider);
export const signInWithGoogleRedirect = () => signInWithRedirect(auth, googleProvider);

export const db = getFirestore();

export const createUserDocumentFromAuth = async (userAuth) => {
    const userDocRef = doc(db, 'users', userAuth.uid);
    console.log(userDocRef);

    const userSnapshot = await getDoc(userDocRef);
    console.log(userSnapshot);
    console.log(userSnapshot.exists());

    if (!userSnapshot.exists()) {
        const { displayName, email } = userAuth;
        const createdAt = new Date();

        try {
            await setDoc(userDocRef, {
                displayName,
                email,
                createdAt
            });
        } catch {
            console.log('Error creating teh user', console.error.message);
        }
    }

    return userDocRef;
}

