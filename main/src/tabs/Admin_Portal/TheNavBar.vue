<template>
    <nav class="navbar">
        <h3>Movie Time</h3>
        <ul class="navbar-menu">
            <li>
                <router-link to="/admin/allInfo">Все фильмы</router-link>
            </li>
             <li>
                <router-link to="/admin/adding">Добавить</router-link>
            </li>
             <!-- <li>
                <router-link to="/login">Выйти</router-link>
            </li> -->
             <li>
                <router-link to="#" @click.prevent="logout">Выйти</router-link>
            </li>
        </ul>
    </nav>
</template>

<script>
import { useRouter } from 'vue-router'
import { useStore } from 'vuex'
export default {
    setup(){
        const router = useRouter()
        const store = useStore()

        return{
            logout:() =>{
                store.commit('authAdmin/logout')
                router.push('/admin/login')
            }
        }
    }
}
</script>

<style>

</style>