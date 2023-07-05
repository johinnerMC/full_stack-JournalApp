
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import {getAuth} from 'firebase/auth';
import {getFirestore} from 'firebase/firestore/lite';

const firebaseConfig = {
  apiKey: "AIzaSyDA2w1WO9uj5gnYgClay8SrKcaXNkxwoqE",
  authDomain: "jurnal-app-c480f.firebaseapp.com",
  projectId: "jurnal-app-c480f",
  storageBucket: "jurnal-app-c480f.appspot.com",
  messagingSenderId: "618767489974",
  appId: "1:618767489974:web:4cdb3aa8dc5516bddd7f17",
  measurementId: "G-E0XS7086DN"
};

// Initialize Firebase
const FirebaseApp = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

// funcionalidades de autenticacion
export const FirebaseAuth = getAuth(FirebaseApp);
// configuracion de la base datos
export const FirebaseDB = getFirestore(FirebaseApp);