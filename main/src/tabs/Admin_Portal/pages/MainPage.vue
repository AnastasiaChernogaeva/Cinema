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
     <router-view :films="films" :additionalServices="services" :cinemas="cinemas" :sessions="sessions"></router-view> 
     </div>
        <teleport to="body"> 
        <app-modal v-if="modal" @close="modal = false" >
          <keep-alive>
             <component :is="'adding-'+shareName" @click.stop @added="modal = false"></component>
          </keep-alive>
        </app-modal>
       </teleport>      
  </div>
</template>

 <script> 


import { useStore } from 'vuex';
import { onMounted, onUpdated, ref, computed,watch} from "vue";
import { useRoute } from "vue-router";

import {subtitles} from '../utils/titles'
import AppModal from "../ui/AppModal.vue"

import AddingServices from "../components/AddingForms/AddingServices"
import AddingSessions from "../components/AddingForms/AddingSessions"
import AddingCinemas from "../components/AddingForms/AddingCinemas"
import AddingFilms from "../components/AddingForms/AddingFilms"
import AppLoader from "../ui/AppLoader.vue";

import FilmsFilter from '../components/FilterForms/FilmsFilter.vue'
import ServicesFilter from '../components/FilterForms/ServicesFilter.vue'
import CinemasFilter from '../components/FilterForms/CinemasFilter.vue'


export default {
  components:{
      AppLoader,
      AppModal,
      AddingServices,
      AddingFilms,
      AddingCinemas,
      AddingSessions,
      FilmsFilter,
      ServicesFilter,
      CinemasFilter  
  },
  setup(){

      const store = useStore()
      const route = useRoute()

      const loading = ref(false)
      const modal = ref(false)
      const filter = ref({})

      const lastPartofURL = computed (()=>route.path.split('/')[route.path.split('/').length-1])




      const subtitleWeNeed = computed(()=> {
        document.title = `${subtitles(lastPartofURL.value)} | Админский портал`
        load()
        return subtitles(lastPartofURL.value)
      }) 

     const shareName = computed(()=> {
       if( lastPartofURL.value!=='admin'){
         return lastPartofURL.value
         }
         else{
           return 'films'
         }
      })
      const load = async()=>{
        loading.value = true
        await store.dispatch('requests/load',{rType:shareName.value})
        loading.value = false
      }

      const films = computed(()=> store.getters['requests/films']
        .filter(film =>{
          if(filter.value.name){
            return film.filmName.toLowerCase().includes(filter.value.name.toLowerCase())
          }
          else return film
        })
        .filter(film =>{
          if(filter.value.status){
            const status = Date.parse(film.finishTime)>Date.parse(new Date())?"on":"off"
           return filter.value.status === status
          }
          else return film
        })
        // .filter(film =>{
        //   if(filter.value.genre){
        //     return film.genre.toLowerCase().includes(filter.value.genre.toLowerCase())
        //   }
        //   else return film
        // }

        // )
      )
      const cinemas = computed(()=> store.getters['requests/cinemas']        
      .filter(cinema =>{
          if(filter.value.cinemaName){
            return cinema.cinemaName.toLowerCase().includes(filter.value.cinemaName.toLowerCase())
          }
          else  return cinema
        })
        .filter(cinema =>{
          if(filter.value.city){
            return cinema.city.toLowerCase().includes(filter.value.city.toLowerCase())
          }
          else  return cinema
        })
      )
      const sessions = computed(()=> store.getters['requests/sessions'])
      const services = computed(()=> store.getters['requests/services']
        .filter(service =>{
          if(filter.value.aServices){
            return service.addServices.toLowerCase().includes(filter.value.aServices.toLowerCase())
          }
          else  return service
        })
        // .filter(service =>{
        //   if(filter.value.priceServices){
        //     return service.addServicesPrice.includes(filter.value.priceServices)
        //   }
        //   else return service
        // })
      )

        onMounted(async() => await store.dispatch('requests/load' ) )
        onUpdated( 
          computed(() =>{
            filter.value = {}
            async() => await store.dispatch('requests/load' ) 
          }
          )
        )

    //watch(filter, values => console.log(values))
      

      return{
        films,cinemas,sessions,services,
        modal, shareName, subtitleWeNeed, loading, filter

      }

  },
}
 </script>
