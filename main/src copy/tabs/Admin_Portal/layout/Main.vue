<template>

   <div class="with-nav">
        <the-nav-bar></the-nav-bar> 
        <err-message></err-message>
        <router-view></router-view> 
  </div>
  
  
</template>

<script> 

import TheNavBar from "../TheNavBar.vue";
import ErrMessage from "../ui/ErrMessage.vue";
export default {
        components:{
                TheNavBar, 
                ErrMessage,
        },
}
</script>