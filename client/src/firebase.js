import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDgqSSyFfvmmiAsd1P78c5V0pDCPR0QNr8",
  authDomain: "displaypin-2bd61.firebaseapp.com",
  projectId: "displaypin-2bd61",
  storageBucket: "displaypin-2bd61.appspot.com",
  messagingSenderId: "557502087754",
  appId: "1:557502087754:web:d8c4cdbcf7b65320c01cb3",
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
export const auth = getAuth(app);
export default app;
export { db };
