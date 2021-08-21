<template>
    <div class="container">
         <div class="card">
        <h1 class="card-title">
          <span>{{subtitleWeNeed}}</span> 
               <button class="btn primary" @click="modal = true">Добавить</button>
        </h1>
         </div>
         <slot/>
        

        <app-modal v-if="modal" @close="modal = false" >
               <!-- <slot name="insidecontent"/> -->
            <keep-alive>
             <component :is="'adding-'+shareName" @click.stop @added="modal = false"></component>
           </keep-alive>
        </app-modal>

     </div>
 </template>

<script> 
        import {ref, computed} from "vue";
        import { useRoute } from "vue-router";
        import {subtitles} from '../utils/titles'

        import AppModal from "../ui/AppModal.vue"

        import AddingServices from "../components/AddingForms/AddingServices"
        import AddingSessions from "../components/AddingForms/AddingSessions"
        import AddingCinemas from "../components/AddingForms/AddingCinemas"
        import AddingFilms from "../components/AddingForms/AddingFilms"
import LoginVue from '../layout/Login.vue';

 export default {
     components:{
      AppModal,
      AddingServices,
      AddingFilms,
      AddingCinemas,
      AddingSessions,
     },
     setup(){
     
      const route = useRoute()

           const subtitleWeNeed = computed(()=> {
                const englishName = route.path.split('/')[route.path.split('/').length-1]
                document.title = `${subtitles(englishName)} | Админский портал`
           return subtitles(englishName)
          }) 
         
        const modal = ref(false)

     
      const shareName = computed(()=> {
         if( route.path.split('/')[route.path.split('/').length-1] !=='admin'){
         return route.path.split('/')[route.path.split('/').length-1]
         }
         else{
              return 'films'
         }
      })

   


        return{
            modal, shareName, subtitleWeNeed,
            //films,cinemas,sessions,addServices,
        }

     }
 }
</script>
