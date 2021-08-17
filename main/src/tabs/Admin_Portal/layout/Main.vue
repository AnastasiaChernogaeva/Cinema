<template>

    <div class="with-nav">
        <the-nav-bar></the-nav-bar>
        <!-- <main-page></main-page> -->
        
        <router-view></router-view>
    </div>
  
  
</template>

<script>
import TheNavBar from "../TheNavBar.vue";
import MainPage from "../pages/MainPage.vue";
export default {
        components:{
                TheNavBar,
                MainPage,

        }
}
</script>

<style>

</style>