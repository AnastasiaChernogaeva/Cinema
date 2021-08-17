<template>
        
    <div class="container">
        <app-message/>
        <router-view></router-view>
    </div>
    
</template>

<script>
import AppMessage from "../components/AppMessage.vue";
export default {
    components:{
        AppMessage,
    },

}
</script>

<style>

</style>