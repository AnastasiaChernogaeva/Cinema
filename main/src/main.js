import { createApp, } from 'vue'
// import {Storage} from '@google-cloud/storage'
import store from './store/index';
import  router from "./router/index";
import App from './App.vue'
import './general.css'


// Get a reference to the storage service, which is used to create references in your storage bucket


// Initialize Firebase
// const app = initializeApp(firebaseConfig);


createApp(App)
    .use(router)
    .use(store)
    // .use(firebase)
    // .use(Storage)
    .mount('#app')
