import { createStore, createLogger } from "vuex";
import adminModule from "./modules/Admin/TheAdminModule";
import clientsModule from "./modules/Client/TheClientsModule";
import authAdmin from "./modules/Admin/auth.module";
import requests from "./modules/Admin/request.module";

const plugins = []

if(process.env.NODE_ENV === 'development'){
    plugins.push(createLogger())
}


const store = createStore({

    modules:{
        admin:adminModule,
        clients:clientsModule,
        authAdmin:authAdmin,
        requests
    },

    // state(){
    //     return{
    //         isStarted:false,
    //     }
    // },
    // mutations:{
    //     ideas(state){
    //         state.isStarted=true
    //     }

    // },
    // getters:{
    //     val(state){
    //         return state.isStarted
    //     }
    // },

})

export default store;