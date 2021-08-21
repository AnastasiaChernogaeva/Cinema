<template> 
  <app-loader v-if="loading"/>
    <div class="container" v-else>
     
         <div class="card">
        <h1 class="card-title">
          <span>{{subtitleWeNeed}}</span> 
               <button class="btn primary" @click="modal = true">Добавить</button>
        </h1>
        <keep-alive>
             <component :is="shareName+'-filter'" v-model="filter"></component>
         </keep-alive>
          <slot/>
         
            </div>
         
         
           
          
        
      <teleport to="body">
        <app-modal v-if="modal" @close="modal = false" >
               <!-- <slot name="insidecontent"/> -->
            <keep-alive>
             <component :is="'adding-'+shareName" @click.stop @added="modal = false"></component>
           </keep-alive>
        </app-modal>
      </teleport>
     </div>
 </template>

<script> 
import FilmsFilter from '../components/FilterForms/FilmsFilter.vue'


import { useStore } from 'vuex';
import { onMounted, onUpdated} from "vue";

        import {ref, computed,watch} from "vue";
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
      FilmsFilter,
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
             computed(() =>load())
        )

        onUpdated(
             computed(() =>load())
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

      const filter = ref({})
   
       watch(filter, val=> console.log(val.value))
       

        return{
            modal, shareName, subtitleWeNeed, loading, filter
            //films,cinemas,sessions,addServices,
        }

     }
 }
</script>
