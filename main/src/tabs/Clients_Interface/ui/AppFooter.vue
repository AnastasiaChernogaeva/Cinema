<template> 
    <div class=" footer">
        <div class="card-title container">
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
</template>

<script>
import { useStore } from 'vuex';
import { computed} from "vue";

export default {
     setup(){
        const store = useStore()
        const auth = computed(()=>store.getters['authClient/isAuthenticated'])
 



        return{
            auth,
        }
    }

}
</script>

<style scoped>
.footer{
    border-top:white 3px solid;
    color:white;
    padding-left:4%;
    padding-right:4%;
    vertical-align: top;
    height:15%;
    position: relative; 
    bottom: 0;
    left: 0;
    right: 0; 
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
@media all and (max-width: 800px){
     div.footer>div.card-title.container{
         flex-direction: column;
     }
   div.footer>div.card-title.container p{
    width:100%;
} 
}

</style>