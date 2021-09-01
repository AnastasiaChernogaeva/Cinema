<template> 
<div>
    <!-- <span>Main</span> -->
    <!-- <the-nav-bar></the-nav-bar> -->

    <all-active-movies></all-active-movies>
    <all-sessions></all-sessions>

   
    <!-- <button class="btn primary" @click="modal = true">
        Войти
    </button>:films="films" -->
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
import AllActiveMovies from '../../Clients_Interface/components/AllActiveMovies.vue';
import AllSessions from '../../Clients_Interface/components/Inside/AllSessions.vue';
// import TheNavBar from "../ui/TheNavBar.vue"


// import AppLoader from '../../Admin_Portal/ui/AppLoader.vue'

export default {
    components:{
        // AppModal, ForgottenPassword,
        // AppLoader,
        AllActiveMovies,
        AllSessions,
        // TheNavBar,
    },
    // setup(){
    //   const store = useStore()


    //    onMounted( async()=>{
    //     // await store.dispatch('gettingInfo/loadAll',['films','cinemas','services','sessions'])
    //             await store.dispatch('gettingInfo/loadAll',['cinemas','sessions'])

    //   })
    //   onUpdated( async()=>{
    //     await store.dispatch('gettingInfo/loadAll',['films','cinemas','services','sessions'])
    //   })
    //   const films = computed(()=> store.getters['gettingInfo/films']
    //   .filter(film=>{
    //       if(Date.parse(film.finishTime)>Date.parse(new Date()))
    //       return film

    //   }))
    //   const cinemas = computed(()=> store.getters['gettingInfo/cinemas'])
    //   const sessions = computed(()=> store.getters['gettingInfo/sessions'])
    //   const services = computed(()=> store.getters['gettingInfo/services'])

    //     return{
    //         //  cinemas, sessions, 
    //         // services,
    //     }
    // }
}
</script>

<style>

</style>