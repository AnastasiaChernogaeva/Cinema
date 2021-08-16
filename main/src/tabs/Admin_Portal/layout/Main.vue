<template>

    <div class="with-nav">
        <the-nav-bar></the-nav-bar>
        <router-view/>
    </div>
  
  
</template>

<script>
import TheNavBar from "../TheNavBar.vue";
export default {
        components:{
                TheNavBar,

        }
}
</script>

<style>

</style>