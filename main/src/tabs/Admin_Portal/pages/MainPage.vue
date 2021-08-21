<template>
    <div class="container">
    <app-loader v-if="loading"></app-loader>
   <app-page v-else >
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
import { ref, computed, onMounted} from "vue";
import AppPage from "../ui/AppPage.vue";
import AppLoader from "../ui/AppLoader.vue";
export default {
  components:{
      AppPage,
      AppLoader,
  },
  setup(){

      const store = useStore()

      const loading = ref(false)

      onMounted(async()=>{
        loading.value = true
        await store.dispatch('requests/load')
        loading.value = false
      })
      


      const films = computed(()=> store.getters['requests/films'])
      const cinemas = computed(()=> store.getters['requests/cinemas'])
      const sessions = computed(()=> store.getters['requests/sessions'])
      const addServices = computed(()=> store.getters['requests/addServices'])


      

      return{
        films,cinemas,sessions,addServices,
        loading,
      }

  },
}
 </script>
