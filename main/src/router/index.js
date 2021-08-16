import  {createRouter, createWebHistory,} from "vue-router";
import { useStore } from "vuex";
import TheNotFound from "../components_for_total/TheNotFound";

//админская часть
const TheAdmin = () => import ('../tabs/Admin_Portal/TheAdmin');
const LoginAdmin = () => import ('../tabs/Admin_Portal/layout/Login');
const MainAdmin = () => import ('../tabs/Admin_Portal/layout/Main');
const ForgottenPassword = () => import ('../tabs/Admin_Portal/components/ForgottenPassword');
const Auth = () => import ('../tabs/Admin_Portal/pages/Auth');
const AddingNew = () => import ('../tabs/Admin_Portal/components/Adding');
const AllInfo = () => import ('../tabs/Admin_Portal/components/All_Info');

//клиентская часть
const TheClientsView = () => import ('../tabs/Clients_Interface/components/TheClientsView');
const Main = () => import ('../tabs/Clients_Interface/components/pages/Main');



const router = createRouter({
    history: createWebHistory(),
    routes:[
        {   path:"/admin",
            component:TheAdmin, 
            alias:'',
            children:[
              

                {   path:"main_admin", 
                    component:MainAdmin, 
                    children:[
                        { 
                            path:"adding", 
                            component:AddingNew,
                        },
                        {
                            path:"allInfo",
                            component:AllInfo,
                        },
                    ],
                    meta:{
                        layout:'main-admin',
                    },
                },

                {   
                    path:"login",
                    component:LoginAdmin, 
                    children:[
                        {
                            path:"/auth", 
                            component:Auth, 
                            alias:'',
                        },
                        {
                            path:"/forgottenPassword", component:ForgottenPassword,
                        },
                    ],
                    meta:{
                        layout:'login',
                    },
                },

            ],
        },

        {   path:"/cinema",
            component:TheClientsView, 
            alias:'/', 
            children:[
                {   path:"main", 
                    component:Main, 
                    alias:'/',
                },
            ],
        },

        { path:"/:notFound(.*)", component:TheNotFound,},


    ],
    linkActiveClass:'active',
    linkExactActiveClass:'active',
});

// router.beforeEach((to, from, next)=>{
//     // const store = useStore()
//     if(to.matched.some(record => record.meta.layout==='mainAd')){
//         if(!this.$store.auth){
//             next('/admin/login')
//         }else{
//             next()
//         }
//     }
//     else{
//         next()
//     }
// })

export default router;