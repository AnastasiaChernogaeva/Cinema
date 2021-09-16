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
            <li id="search">
                <a href="#" @click.prevent="search" v-if="!show">Поиск</a> 
                <teleport to="body" v-else >
                <app-modal @close="show = false">  
                <div class="form-control search">
                     <input type="text" placeholder="Введите название фильма" v-model="searchText" @click.stop autofocus @keypress.enter.stop="searchEngine">
                     <button class="btn primary" @click="searchEngine"><img src="../icons/2x/search.png" alt="search"></button>
                    </div>
                    </app-modal>
                </teleport>
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
import { computed, ref} from "vue";
import AppModal from '../ui/AppModal.vue'

export default {
    components:{
        AppModal,
    },
    emits:['timeToSearchFilmSession'],
     setup(_, {emit}){
        const store = useStore()
        const auth = computed(()=>store.getters['authClient/isAuthenticated'])
 


        const searchText = ref()
        const show = ref(false)

        const search = ()=>{
            show.value = true
            searchText.value = ''
        }

        const searchEngine = ()=>{
            // console.log('searchText', searchText.value);
            emit('timeToSearchFilmSession', searchText.value)
            show.value = false
        }

          

        return{
            auth,
            show,
            searchText,
            search,
            searchEngine
        }
    }

}
</script>

<style scoped>
#search{
    display:none;
}
@media all and (max-width:700px){
   li#search{
    display:flex;
} 
}
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
/* @media all and (max-width: 900px){
    div.footer>div.card-title.container{
         flex-direction: column;
    }
    div.footer>div.card-title.container p{
        width:100%;
        font-size: 14px;
    } 
} */
@media all and (max-width: 900px){
    div.footer>div.card-title.container{
         flex-direction: column;
    }
    div.footer>div.card-title.container p{
        width:100%;
        font-size: 14px;
        position: relative;
        left: -25px;
    } 
}
@media all and (max-width: 450px){
    ul li h3{
        font-size: 16px;
    }
}

.form-control.search input {
    font-size: 19px;
}
.search{
    text-align: center;
    position: relative;
    display: inline-flex;
}
.search button.btn {
    /* width: 2%; */
    /* height: 3%; */
    border-radius: 35%;
    margin-left: 2%;
    padding: revert;
}
.btn img {
    height: 27px;
    width: 27px;
    text-align: center;
}




</style>