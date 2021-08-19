<template>
   <app-page :subtitle="subtitleWeNeed">
         <router-view :films="[]"></router-view> 
        
   </app-page> 
  
</template>

 <script> 
import { useRoute } from "vue-router";
import { computed,} from "vue";
import AppPage from "../ui/AppPage.vue";

export default {
  components:{
      AppPage,
  },
  setup(){


      const route = useRoute()
      const SUBTITLES_MAP = {
          films:'Фильмы',
          cinemas:'Кинотеатры',
          sessions:'Сеансы',
          add_services:'Дополнительные услуги',
          adding:'Добавить',

      }
      
      const subtitleWeNeed = computed(()=> {
          let englishName = route.path.split('/')[route.path.split('/').length-1]
           return (englishName!=='admin'|| '')?SUBTITLES_MAP[englishName]:'Фильмы'
          }) 

      return{
        subtitleWeNeed,
      }

  },
}
 </script>
