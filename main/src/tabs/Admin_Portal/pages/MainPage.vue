<template>
    <app-page :subtitle="subtitleWeNeed">
        
        <!-- <table>
            <thead>

            </thead>
        </table> -->
    </app-page>
    <!-- <div class="card">{{subtitleWeNeed}}</div> -->
</template>

<script>
import AppPage from "../ui/AppPage.vue";
import { useRoute } from "vue-router";
import { computed } from "vue";
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

//    console.log(route.path.split('/')[route.path.split('/').length-1]);

      return{
        //   giveSubtitle:computed(()=> route.path.split('/')[route.path.split('/').length-1]) ,
        subtitleWeNeed,
      }

  },
}
</script>

<style>

</style>