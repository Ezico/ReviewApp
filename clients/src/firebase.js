import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";
import { getAuth } from "firebase/auth";

// production
// const firebaseConfig = {
//   apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
//   authDomain: "wiftz-podcasts.firebaseapp.com",
//   projectId: "wiftz-podcasts",
//   storageBucket: "wiftz-podcasts.appspot.com",
//   messagingSenderId: "42188632923",
//   appId: "1:42188632923:web:fe111d1054c5850054e07e",
// };

// stagging
const firebaseConfig = {
  apiKey: "AIzaSyDbUrmg7O_fizeIAD1zSLNzX6FC-N3MlrI",
  authDomain: "proreview-ce79b.firebaseapp.com",
  projectId: "proreview-ce79b",
  storageBucket: "proreview-ce79b.appspot.com",
  messagingSenderId: "512800341589",
  appId: "1:512800341589:web:e0d85be11996e987775edc",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);
const storage = getStorage(app);
export { auth, db, storage };
