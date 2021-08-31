import { createStore, createLogger } from "vuex";

import adminModule from "./modules/Admin/TheAdminModule";
import authAdmin from "./modules/Admin/auth.module";
import requests from "./modules/Admin/request.module";

import clientsModule from "./modules/Client/TheClientsModule";
import gettingInfo from "./modules/Client/gettingInfo";
import authAdmin from "./modules/Admin/auth.module";
import authForClients from "./modules/Client/authForClients";




const plugins = []

if(process.env.NODE_ENV === 'development'){
    plugins.push(createLogger())
}


const store = createStore({

    modules:{
        admin:adminModule,
        authAdmin:authAdmin,
        requests,
        
        clients:clientsModule,
        gettingInfo,
        authClient:authForClients,
    },


})

export default store;