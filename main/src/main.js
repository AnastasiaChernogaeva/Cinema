import { createApp, } from 'vue'
import store from './store/index';
import  router from "./router/index";
import App from './App.vue'
import './general.css'
// import firebase from '../node_modules/@firebase/database';

// const firebaseConfig = {
//     apiKey: "AIzaSyD7dWwQcB0EA9irJBYRWMAP4cQsGpsH_Vc",
//     authDomain: "cinema-vue-project.firebaseapp.com",
//     databaseURL: "https://cinema-vue-project-default-rtdb.firebaseio.com",
//     projectId: "cinema-vue-project",
//     storageBucket: "cinema-vue-project.appspot.com",
//     messagingSenderId: "578123914941",
//     appId: "1:578123914941:web:a438171e4709b786de21d4"
//   };
//   firebase.initializeApp(firebaseConfig);
  


createApp(App)
    .use(router)
    .use(store)
    .mount('#app')
