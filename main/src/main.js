import { createApp, } from 'vue'
import {Storage} from '@google-cloud/storage'
import store from './store/index';
import  router from "./router/index";
import App from './App.vue'
import './general.css'


createApp(App)
    .use(router)
    .use(store)
    .use(Storage)
    .mount('#app')
