import  {createRouter, createWebHistory,} from "vue-router"
import TheAdmin from "./tabs/Admin_Portal/components/TheAdmin";
import TheClientsView from "./tabs/Clients_Interface/components/TheClientsView";
import NotFound from "./components_for_total/TheNotFound";




createRouter({
    history: createWebHistory(),
    routes:[
        {path:"/admin", component:TheAdmin, },
        {path:"/cinema", component:TheClientsView, alias:'/',},
        {path:"/:notFound(.*)", component:NotFound,},


    ],
})