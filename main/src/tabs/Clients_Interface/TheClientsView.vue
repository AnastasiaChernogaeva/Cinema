<template>
<div>
<div class="container">
    <the-nav-bar @timeToSearchFilmSession="search"></the-nav-bar>
       <div class="card portal">
        <small class="admin">Клиентская страница</small>
        </div>
     
</div> 
<router-view :search="text"></router-view>
</div>
</template>

<script>
import { ref } from "vue";
import TheNavBar from "../Clients_Interface/ui/TheNavBar.vue"

export default {
      components:{
        TheNavBar,
    },
    setup(){
        const text = ref()
        const search = (value)=>{
            text.value = value
        }
        return{
            search,
            text
        }
    }

}
</script>

<style>

</style>