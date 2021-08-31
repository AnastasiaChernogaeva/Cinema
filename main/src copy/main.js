import { createApp, } from 'vue'
import store from './store/index';
import  router from "./router/index";
import App from './App.vue'
import './general.css'


createApp(App)
    .use(router)
    .use(store)
    .mount('#app')