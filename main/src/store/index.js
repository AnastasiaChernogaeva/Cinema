import { createStore, createLogger } from "vuex";
import adminModule from "./modules/Admin/TheAdminModule";
import clientsModule from "./modules/Client/TheClientsModule";
import authAdmin from "./modules/Admin/auth.module";

// const plugins = []

// if(ProcessingInstruction.env.NODE_ENV === 'development'){
//     plugins.push(createLogger())
// }


const store = createStore({

    modules:{
        adminModule,
        clientsModule,
        authAdmin,
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