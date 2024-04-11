import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
import { getStorage } from 'firebase/storage';
import { getAuth } from 'firebase/auth';


const firebaseConfig = {
  apiKey: "AIzaSyCixlZ8xSP9xfcqglcjJWW8YsVsHqmrKO0",
  authDomain: "mycmtapp.firebaseapp.com",
  databaseURL: "https://mycmtapp.firebaseio.com",
  projectId: "mycmtapp",
  storageBucket: "mycmtapp.appspot.com",
  messagingSenderId: "675300453637",
  appId: "1:675300453637:web:612e570da20a18c5fb5b6c"
};

const app = initializeApp(firebaseConfig);

const db = getFirestore(app);
const storage = getStorage(app);
const Auth = getAuth(app);

export {db, storage, Auth};