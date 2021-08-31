import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCmdclULRaun46ZcBR2J4VRAbPErlhsRsw",
  authDomain: "testauthrole.firebaseapp.com",
  projectId: "testauthrole",
  storageBucket: "testauthrole.appspot.com",
  messagingSenderId: "265934546726",
  appId: "1:265934546726:web:ada75f7492e2a35b8e43e7"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

createApp(App).use(router).mount('#app')
