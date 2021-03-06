import { createApp, } from 'vue'
// import {Storage} from '@google-cloud/storage'
import store from './store/index';
import  router from "./router/index";
import App from './App.vue'
import './general.css'

// import firebase from 'firebase/app'
// import 'firebase/database';
// import 'firebase/storage'
// import firebase from 'firebase/compat/app';
// import 'firebase/compat/auth';
// import 'firebase/compat/firestore';

// import storage from 'firebase/storage'
import firebase from 'firebase/app'
// import 'firebase/auth'
// import 'firebase/database'
import 'firebase/storage'




const firebaseConfig = {
    apiKey: "AIzaSyD7dWwQcB0EA9irJBYRWMAP4cQsGpsH_Vc",
    authDomain: "cinema-vue-project.firebaseapp.com",
    databaseURL: "https://cinema-vue-project-default-rtdb.firebaseio.com",
    projectId: "cinema-vue-project",
    storageBucket: "cinema-vue-project.appspot.com",
    messagingSenderId: "578123914941",
    appId: "1:578123914941:web:a438171e4709b786de21d4"
  };

  firebase.initializeApp(firebaseConfig)
  // console.log(firebase);
// console.log(firebase.storage());




// Get a reference to the storage service, which is used to create references in your storage bucket


// Initialize Firebase
// const app = initializeApp(firebaseConfig);


createApp(App)
    .use(router)
    .use(store)
    .mount('#app')
