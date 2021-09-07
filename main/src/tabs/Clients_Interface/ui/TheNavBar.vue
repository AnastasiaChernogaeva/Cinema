<template>
    <nav class="navbar">
        <h3>Movie Time</h3>
        <ul class="navbar-menu">
            <li v-if="showSearch">
                <a href="#" @click.prevent="search" v-if="!show">Поиск</a> 
                <teleport to="body" v-else >
                <app-modal @close="show = false">  
                <div class="form-control search">
                     <input type="text" placeholder="Введите название фильма" v-model="searchText" @click.stop>
                     <button class="btn primary" @click="searchEngine"><img src="../icons/2x/search.png" alt="search"></button>
                    </div>
                    </app-modal>
                </teleport>
            </li>
            <li v-if="!showSearch">
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
        </ul>
    </nav>
</template>

<script>
import { computed, ref } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useStore } from 'vuex'
import AppModal from '../ui/AppModal.vue'
export default {
    components:{
        AppModal,
    },
    setup(_, {emit}){
        const router = useRouter()
        const route = useRoute()
        const store = useStore()
        const auth = computed(()=>store.getters['authClient/isAuthenticated'])
        const showSearch = computed(()=>{
            let arr = route.path.split('/')
            if(arr[arr.length-1]!=='' && arr[arr.length-1]!=='cinemaMain'){
                return false
            }
            else{
                return true 
            }

        })

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
            showSearch,
            auth,
            logout:() =>{
                store.commit('authClient/logout')
                router.push('/cinemaMain/loginUser')
            },
            show,
            searchText,
            search,
            searchEngine
        }
    }
}
</script>

<style scoped>
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