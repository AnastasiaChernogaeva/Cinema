<template>
    <nav class="navbar">
        <h3>Movie Time</h3>
        <ul class="navbar-menu">
            <li>
                <router-link to="/admin/orders">Заказы</router-link>
            </li>
            <li>
                <router-link to="/admin/films">Фильмы</router-link>
            </li>
            <li>
                <router-link to="/admin/cinemas">Кинотеатры</router-link>
            </li>
            <li>
                <router-link to="/admin/sessions">Сеансы</router-link>
            </li>
            <li>
                <router-link to="/admin/services">Дополнительные услуги</router-link>
            </li>
             <!-- <li>
                <router-link to="/admin/adding">Добавить</router-link>
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
                store.commit('authAdmin/logout')
                router.push('/admin/login')
            }
        }
    }
}
</script>

<style scoped>


@media all and (max-width:1200px){
    div.with-nav nav.navbar{
        flex-direction: column;
    }

    .navbar h3{
        line-height: 1.05;
    }
    ul.navbar-menu{
        flex-direction: row;
    }

    .navbar-menu li{
        font-size: 13px;
        margin-right: 2rem;
    }

}

</style>