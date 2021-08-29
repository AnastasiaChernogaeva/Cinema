<template> 
<div class="card">
    <the-nav-bar></the-nav-bar>
    <span>Main</span>
    <all-active-movies :films="films" ></all-active-movies>

   
    <!-- <button class="btn primary" @click="modal = true">
        Войти
    </button> -->
    <!-- <teleport to="body">
        <app-modal v-if="modal" @close="modal = false">
            <forgotten-password/>
        </app-modal>
    </teleport> -->
    </div>
</template>

<script>
import { useStore } from 'vuex';
import { onMounted, onUpdated, ref, computed,watch} from "vue";
// import AppModal from "../ui/AppModal.vue";
// import ForgottenPassword from "../components/ForgottenPassword.vue";
import TheNavBar from '../../Clients_Interface/ui/TheNavBar.vue';
import AllActiveMovies from '../../Clients_Interface/components/AllActiveMovies.vue';

export default {
    components:{
        // AppModal, ForgottenPassword,
        TheNavBar,
        AllActiveMovies,
    },
    setup(){
      const store = useStore()


       onMounted( async()=>{
        // await store.dispatch('gettingInfo/loadAll',['films','cinemas','services','sessions'])
                await store.dispatch('gettingInfo/loadAll',['films','cinemas','sessions'])

      })
    //   onUpdated( async()=>{
    //     await store.dispatch('gettingInfo/loadAll',['films','cinemas','services','sessions'])
    //   })
      const films = computed(()=> store.getters['gettingInfo/films']
      .filter(film=>{
          if(Date.parse(film.finishTime)>Date.parse(new Date()))
          return film

      }))
      const cinemas = computed(()=> store.getters['gettingInfo/cinemas'])
      const sessions = computed(()=> store.getters['gettingInfo/sessions'])
    //   const services = computed(()=> store.getters['gettingInfo/services'])

        return{
            films, cinemas, sessions, 
            // services,
        }
    }
}
</script>

<style>

</style>