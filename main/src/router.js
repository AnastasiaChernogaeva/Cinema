import  {createRouter, createWebHistory,} from "vue-router";
import TheNotFound from "./components_for_total/TheNotFound";

//админская часть
const TheAdmin = () => import ('./tabs/Admin_Portal/components/TheAdmin');
const LoginAdmin = () => import ('./tabs/Admin_Portal/components/pages/Login');
const AddingNew = () => import ('./tabs/Admin_Portal/components/pages/Adding');
const AllInfo = () => import ('./tabs/Admin_Portal/components/pages/All_Info');

//клиентская часть
const TheClientsView = () => import ('./tabs/Clients_Interface/components/TheClientsView');
const Main = () => import ('./tabs/Clients_Interface/components/pages/Main');



const router = createRouter({
    history: createWebHistory(),
    routes:[
        {path:"/admin", component:TheAdmin, children:[
            {path:"login", component:LoginAdmin},
            {path:"adding", component:AddingNew},
            {path:"allInfo", component:AllInfo},



        ]},

        {path:"/cinema", component:TheClientsView, alias:'/', children:[
            {path:"main", component:Main, alias:'/',},
        ],},
        {path:"/:notFound(.*)", component:TheNotFound,},


    ],
    linkActiveClass:'active',
    linkExactActiveClass:'active',
});

export default router;