<template>

  <!-- <keep-alive>
      <component :is="showThePage">

      </component>
  </keep-alive> -->

  <!-- <the-not-found></the-not-found> -->

  <router-view>  </router-view>
      
</template>

<script>
import { ref } from "vue";
import TheNotFound from './components_for_total/TheNotFound.vue'
import TheAdmin from './tabs/Admin_Portal/components/TheAdmin.vue'
import TheClientsView from './tabs/Clients_Interface/components/TheClientsView.vue'


export default {
      // setup(){
      //   const showThePage = ref(null)
      //   showThePage = "/"
      //   return{
      //     showThePage
      //   }
      // },
      components:{
        TheAdmin,
        TheClientsView,
        TheNotFound,
      },
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
