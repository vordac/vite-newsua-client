import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyBsI431_19_YLKrmyfGiMBmrfLKe0FUy3A",
  authDomain: "uanews-66080.firebaseapp.com",
  projectId: "uanews-66080",
  storageBucket: "uanews-66080.appspot.com",
  messagingSenderId: "399316288732",
  appId: "1:399316288732:web:7623485cf0d73236b86019"
};

export const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);