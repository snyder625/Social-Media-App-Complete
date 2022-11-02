// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCykoh3oIpZzkJfbXL2GfhOcrfx72XUbus",
  authDomain: "socialmediaapp-1107e.firebaseapp.com",
  projectId: "socialmediaapp-1107e",
  storageBucket: "socialmediaapp-1107e.appspot.com",
  messagingSenderId: "469631482147",
  appId: "1:469631482147:web:a0ef00af7f67b7f9ddb496",
  measurementId: "G-E85RD4FNQW"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

export default app;