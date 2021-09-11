<template> 
<div>
    <all-active-movies name="Top"></all-active-movies>
    <all-sessions :search="search"></all-sessions>
    <div class=" container footer">
        <div class="card-title">
        <p>
            <ul>
                <li>
                   <h3> Для вас
                       <hr>
                   </h3>
                </li>
            <li>
                <router-link to="/cinemaMain">Главная</router-link>
            </li>
            <li v-if="auth===false">
                <router-link to="/cinemaMain/signupUser">Зарегистрироваться</router-link>
            </li>
            <li v-if="auth===false">
                <router-link to="/cinemaMain/loginUser">Войти</router-link>
            </li>
            <li v-if="auth===true">
                <router-link to="/cinemaMain/uorders">Мои заказы</router-link>
            </li>
             <li v-if="auth===true">
                <a href="#" @click.prevent="logout">Выйти</a>
            </li>
            <li>
                <a href="#Top"><em>Вверх!</em></a>
            </li>
            </ul>
        </p>
        <p>
            <ul>
                <li>
                   <h3> О нас
                       <hr>
                   </h3>
                </li>
            <li>
                 Республика Беларусь, г.Минск, ул.Чюрлениса, 9
            </li>
            <li >
                sergeychernogaev1979@gmail.com
            </li>
            <li >
               +375-(33)-685-39-37
            </li>
            <li >
                &#169;&nbsp;Компания "MovieTime"
                
            </li>
            </ul>
        </p>
        </div>
    </div>
    </div>
</template>

<script>
import { useStore } from 'vuex';
import { onMounted, onUpdated, ref, computed,watch} from "vue";
import AllActiveMovies from '../../Clients_Interface/components/AllActiveMovies.vue';
import AllSessions from '../../Clients_Interface/components/Inside/AllSessions.vue';
import { useRouter } from 'vue-router';

export default {
    props:['search'],
    components:{
        AllActiveMovies,
        AllSessions,
    },
     setup(_, {emit}){
        const router = useRouter
        // const route = useRoute()
        const store = useStore()
        const auth = computed(()=>store.getters['authClient/isAuthenticated'])
 



        return{
            auth,
            logout:() =>{
                store.commit('authClient/logout')
                router.push('/cinemaMain/loginUser')
            },
        }
    }

}
</script>

<style scoped>
.footer{
    border-top:white 3px dotted;
    color:white;
    padding-left:4%;
    padding-right:4%;
    vertical-align: top;

}
ul{
    list-style-type: none;
}
ul li a{
     color:white;

}
ul li h3{
    font-size: 22px;
    text-align:center;
}
/* *{

    transition-duration: 5s;
} */

</style>