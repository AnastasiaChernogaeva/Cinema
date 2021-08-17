import { createStore, createLogger } from "vuex";
import adminModule from "./modules/Admin/TheAdminModule";
import clientsModule from "./modules/Client/TheClientsModule";
import authAdmin from "./modules/Admin/auth.module";

const plugins = []

if(process.env.NODE_ENV === 'development'){
    plugins.push(createLogger())
}


const store = createStore({

    modules:{
        adminModule:adminModule,
        clientsModule:clientsModule,
        authAdmin:authAdmin,
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