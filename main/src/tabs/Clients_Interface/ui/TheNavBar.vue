<template>
    <nav class="navbar">
        <h3>Movie Time</h3>
        <ul class="navbar-menu">
            <li v-if="showSearch">
                <router-link to="/#">Поиск</router-link>
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
import { computed } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useStore } from 'vuex'
export default {
    setup(){
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

        // console.log(showSearch.value);

        return{
            showSearch,
            auth,
            logout:() =>{
                store.commit('authClient/logout')
                router.push('/cinemaMain/loginUser')
            }
        }
    }
}
</script>

<style>

</style>