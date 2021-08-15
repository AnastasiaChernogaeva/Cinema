import { createStore } from "vuex";
import AdminModule from "./modules/TheAdminModule";
import ClientsModule from "./modules/TheClientsModule";

const store = createStore({

    modules:{
        AdminModule,ClientsModule,
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