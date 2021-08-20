<template>
    <div class="container">
    <app-loader v-if="loading"></app-loader>
   <app-page v-else :subtitle="subtitleWeNeed" >
            <div class="card">
              <router-view :films="films" :additionalServices="addServices" :cinemas="cinemas" :sessions="sessions"></router-view> 
            </div>
        <!-- <template #insidecontent>
             <component :is="'adding-'+shareName" @click.stop></component>
        </template> -->
   </app-page> 
  </div>
</template>

 <script> 

import { useStore } from 'vuex';
import { useRoute } from "vue-router";
import { ref, computed, onMounted} from "vue";
import {subtitles} from '../utils/titles'
import AppPage from "../ui/AppPage.vue";
import AppLoader from "../ui/AppLoader.vue";
// import AddingServices from "../components/AddingForms/AddingServices"
// import AddingSessions from "../components/AddingForms/AddingSessions"
// import AddingCinemas from "../components/AddingForms/AddingCinemas"
// import AddingFilms from "../components/AddingForms/AddingFilms"

export default {
  components:{
      AppPage,
      AppLoader,
      // AddingServices,
      // AddingFilms,
      // AddingCinemas,
      // AddingSessions,
  },
  setup(){

      const store = useStore()
      const route = useRoute()
      // const SUBTITLES_MAP = {
      //     films:'Фильмы',
      //     cinemas:'Кинотеатры',
      //     sessions:'Сеансы',
      //     services:'Дополнительные услуги',
      //     adding:'Добавить',

      // }

      // const shareName = computed(()=> route.path.split('/')[route.path.split('/').length-1])

      const loading = ref(false)

      onMounted(async()=>{
        loading.value = true
        await store.dispatch('requests/load')
        loading.value = false
      })
      
      const subtitleWeNeed = computed(()=> {
           const englishName = route.path.split('/')[route.path.split('/').length-1]
           return subtitles(englishName)
          }) 

      const films = computed(()=> store.getters['requests/films'])
      const cinemas = computed(()=> store.getters['requests/cinemas'])
      const sessions = computed(()=> store.getters['requests/sessions'])
      const addServices = computed(()=> store.getters['requests/addServices'])


      

      return{
        subtitleWeNeed,
        films,cinemas,sessions,addServices,
        loading,
        // shareName,
      }

  },
}
 </script>
