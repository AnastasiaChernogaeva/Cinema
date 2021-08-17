<template>
        
    <div class="container">
        <err-message ></err-message>
        <router-view></router-view>
    </div>
    
</template>

<script>
import ErrMessage from "../ErrMessage.vue";
export default {
    components:{
        ErrMessage,
    },

}
</script>

<style>

</style>