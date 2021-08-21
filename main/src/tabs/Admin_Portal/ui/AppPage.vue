<template>
    <div class="container">
         <div class="card">
        <h1 class="card-title">
          <span>{{subtitleWeNeed}}</span> 
               <button class="btn primary" @click="modal = true">Добавить</button>
        </h1>
            </div>
         <app-loader v-if="loading"/>
         <slot v-else/>
        

        <app-modal v-if="modal" @close="modal = false" >
               <!-- <slot name="insidecontent"/> -->
            <keep-alive>
             <component :is="'adding-'+shareName" @click.stop @added="modal = false"></component>
           </keep-alive>
        </app-modal>
  
     </div>
 </template>

<script> 
import { useStore } from 'vuex';
import { onMounted, onUpdated} from "vue";

        import {ref, computed} from "vue";
        import { useRoute } from "vue-router";
        import {subtitles} from '../utils/titles'

        import AppModal from "../ui/AppModal.vue"

        import AddingServices from "../components/AddingForms/AddingServices"
        import AddingSessions from "../components/AddingForms/AddingSessions"
        import AddingCinemas from "../components/AddingForms/AddingCinemas"
        import AddingFilms from "../components/AddingForms/AddingFilms"
        import AppLoader from "../ui/AppLoader.vue";


 export default {
     components:{
      AppLoader,
      AppModal,
      AddingServices,
      AddingFilms,
      AddingCinemas,
      AddingSessions,
     },
     setup(){

      const store = useStore()
      const route = useRoute()

      const lastPartofURL = computed (()=>route.path.split('/')[route.path.split('/').length-1])

      const loading = ref(false)

    
      const load = async()=>{
        loading.value = true
        await store.dispatch('requests/load',{rType:lastPartofURL.value})
        loading.value = false
      }

        onMounted(
             load()
        )


      

           const subtitleWeNeed = computed(()=> {
                document.title = `${subtitles(lastPartofURL.value)} | Админский портал`
                load()
           return subtitles(lastPartofURL.value)
          }) 
         
        const modal = ref(false)

     
      const shareName = computed(()=> {
         if( lastPartofURL.value!=='admin'){
         return lastPartofURL.value
         }
         else{
              return 'films'
         }
      })
   


        return{
            modal, shareName, subtitleWeNeed, loading,
            //films,cinemas,sessions,addServices,
        }

     }
 }
</script>
