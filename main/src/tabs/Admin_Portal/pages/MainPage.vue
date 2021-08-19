<template>
   <app-page :subtitle="subtitleWeNeed">
            <!-- <router-view :films="[]"></router-view>  -->
            <div class="card">
              <router-view :films="[]" :additionalServices="[]" :cinemas="[]" :sessions="[]"></router-view> 
            </div>
        <template #insidecontent>
             <component :is="'adding-'+shareName" @click.stop></component>
        </template>
   </app-page> 
  
</template>

 <script> 

import { useRoute } from "vue-router";
import { computed,} from "vue";
import AppPage from "../ui/AppPage.vue";
import AddingServices from "../components/AddingForms/AddingServices"
import AddingSessions from "../components/AddingForms/AddingSessions"
import AddingCinemas from "../components/AddingForms/AddingCinemas"
import AddingFilms from "../components/AddingForms/AddingFilms"

export default {
  components:{
      AppPage,
      AddingServices,
      AddingFilms,
      AddingCinemas,
      AddingSessions,
  },
  setup(){


      const route = useRoute()
      const SUBTITLES_MAP = {
          films:'Фильмы',
          cinemas:'Кинотеатры',
          sessions:'Сеансы',
          services:'Дополнительные услуги',
          adding:'Добавить',

      }

      const shareName = computed(()=> route.path.split('/')[route.path.split('/').length-1])
      
      const subtitleWeNeed = computed(()=> {
           const englishName = route.path.split('/')[route.path.split('/').length-1]
           return (englishName!=='admin'|| '')?SUBTITLES_MAP[englishName]:'Фильмы'
          }) 

      return{
        subtitleWeNeed,
        shareName,
      }

  },
}
 </script>
