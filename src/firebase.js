import firebase from 'firebase/app';
import 'firebase/auth';

const firebaseConfig = {
  apiKey: "AIzaSyAt32FsAROI-1_0oaoZk7oXOPvjbWKG3x4",
  authDomain: "free-consal-works.firebaseapp.com",
  projectId: "free-consal-works",
  storageBucket: "free-consal-works.appspot.com",
  messagingSenderId: "254544105034",
  appId: "1:254544105034:web:45ff6700085891b21960b3"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
//firebase.initializeApp(firebaseConfig);

export const auth = firebase.auth();