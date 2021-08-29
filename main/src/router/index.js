import  {createRouter, createWebHistory,} from "vue-router";
import store from "../store";
import TheNotFound from "../components_for_total/TheNotFound";

//админская часть
const TheAdmin = () => import ('../tabs/Admin_Portal/TheAdmin');
const LoginAdmin = () => import ('../tabs/Admin_Portal/layout/Login');
const MainAdmin = () => import ('../tabs/Admin_Portal/layout/Main');
const Auth = () => import ('../tabs/Admin_Portal/pages/Auth');
const MainPage = () => import ('../tabs/Admin_Portal/pages/MainPage');
const AddingNew = () => import ('../tabs/Admin_Portal/components/Adding');
const Films = () => import ('../tabs/Admin_Portal/components/Films');
const Cinemas = () => import ('../tabs/Admin_Portal/components/Cinemas');
const Sessions = () => import ('../tabs/Admin_Portal/components/Sessions');
const AdditionalServices = () => import ('../tabs/Admin_Portal/components/AdditionalServices');
const Orders = () => import ('../tabs/Admin_Portal/components/Orders');


//клиентская часть
const TheClientsView = () => import ('../tabs/Clients_Interface/TheClientsView');
const Main = () => import ('../tabs/Clients_Interface/pages/Main');
const ForgottenPassword = () => import ('../tabs/Clients_Interface/pages/ForgottenPassword');
const SignupUser = () => import ('../tabs/Clients_Interface/pages/SignupUser');
const LoginUser = () => import ('../tabs/Clients_Interface/pages/LoginUser');





const router = createRouter({
    history: createWebHistory(),
    routes:[
        {   path:"/admin",
            component:TheAdmin, 
            children:[
              

                {   path:"",
                    component:MainPage, 
                    children:[
                                {
                                    path:"films",
                                    component:Films,
                                    alias:"",
                                },
                                {
                                    path:"cinemas",
                                    component:Cinemas,
                                },
                                {
                                    path:"sessions",
                                    component:Sessions,
                                },
                                {
                                    path:"services",
                                    component:AdditionalServices,
                                },
                                {
                                    path:"orders",
                                    component:Orders,
                                },
                    ],
                    meta:{
                        layout:'main-admin',
                        authAdmin:true,
                    },
                },
                {   
                    path:"/admin/film:idf?",
                    component:()=>import('../tabs/Admin_Portal/components/InsideTemplatesForID/FilmsTemplate'),
                    name:'film',
                    meta:{
                        layout:'main-admin',
                        authAdmin:true,
                    },
                },
                {   
                    path:"/admin/service:idas?",
                    component:()=>import('../tabs/Admin_Portal/components/InsideTemplatesForID/ServicesTemplate'),
                    name:'service',
                    meta:{
                        layout:'main-admin',
                        authAdmin:true,
                    },
                },
                {   
                    path:"/admin/session:ids?",
                    component:()=>import('../tabs/Admin_Portal/components/InsideTemplatesForID/SessionsTemplate'),
                    name:'session',
                    meta:{
                        layout:'main-admin',
                        authAdmin:true,
                    },
                },
                {   
                    path:"/admin/cinema:idc?",
                    component:()=>import('../tabs/Admin_Portal/components/InsideTemplatesForID/CinemasTemplate'),
                    name:'cinema',
                    meta:{
                        layout:'main-admin',
                        authAdmin:true,
                    },
                },
                {   
                    path:"/admin/order:ido?",
                    component:()=>import('../tabs/Admin_Portal/components/InsideTemplatesForID/OrdersTemplate'),
                    name:'order',
                    meta:{
                        layout:'main-admin',
                        authAdmin:true,
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
                    ],
                    meta:{
                        layout:'login',
                        authAdmin:false,
                    },
                },

            ],
        },

        {   path:"/cinemaMain",
            component:TheClientsView, 
            alias:'', 
            children:[
                {   path:"main", 
                    component:Main, 
                    alias:'',
                },
                {   path:"loginUser", 
                    component:LoginUser, 
                },
                {   path:"signupUser", 
                    component:SignupUser, 
                },
                {
                     path:"forgottenPassword", 
                     component:ForgottenPassword,
                },
                {   
                    path:"/cinema/film:idf?",
                    component:()=>import('../tabs/Clients_Interface/components/Inside/MovieInside.vue'),
                    name:'cfilm',
                    meta:{
                        authAdmin:false,
                    },
                },
                {   
                    path:"/cinema/session:ids?",
                    // component:()=>import('../tabs/Admin_Portal/components/InsideTemplatesForID/SessionsTemplate'),
                    name:'cession',
                    meta:{
                        authAdmin:false,
                    },
                },
                {   
                    path:"/cinema/cinema:idc?",
                    // component:()=>import('../tabs/Admin_Portal/components/InsideTemplatesForID/CinemasTemplate'),
                    name:'ccinema',
                    meta:{
                        authAdmin:false,
                    },
                },
            ],
        },

        { path:"/:notFound(.*)", component:TheNotFound,},
        // { path:"/hall", component:()=>import('../tabs/Admin_Portal/hall/Hall.vue'),},


    ],
    linkActiveClass:'active',
    linkExactActiveClass:'active',
});

router.beforeEach((to, from, next)=>{
    if(/^\/admin/.test(to.path)){
        const requireAuthAdmin = to.meta.authAdmin
        if(requireAuthAdmin && store.getters['authAdmin/isAuthenticated']){
            next()
        }else if(requireAuthAdmin && !store.getters['authAdmin/isAuthenticated'])
        {
            next('/admin/login?message=login')

        } else{
            next()
        }    
    }else{
        next()
    }
    
   
})

export default router;