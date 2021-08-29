<template>
<div>
<div class="container">
    <the-nav-bar></the-nav-bar>
       <div class="card portal">
        <small class="admin">Клиентская страница</small>
        </div>
     
</div> 
<router-view></router-view>
</div>
</template>

<script>
import TheNavBar from "../Clients_Interface/ui/TheNavBar.vue"

export default {
      components:{
        TheNavBar,
    },

}
</script>

<style>

</style>