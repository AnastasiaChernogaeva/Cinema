<template>
    <nav class="navbar">
        <h3>Movie Time</h3>
        <ul class="navbar-menu">
            <li>
                <router-link to="#">Поиск</router-link>
            </li>
            <!-- <li>
                <router-link to="/main">Мои заказы</router-link>
            </li> -->
             <li>
                <a href="#" @click.prevent="logout">Выйти</a>
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
                // store.commit('authAdmin/logout')
                router.push('/main/loginUser')
            }
        }
    }
}
</script>

<style>

</style>