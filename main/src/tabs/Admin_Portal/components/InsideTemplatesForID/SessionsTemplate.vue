<template>
   <app-loader v-if="loading"/>
  <div class="card" v-else-if="session">
       <h3 class="card-title">
           <span>LOVE is in the AIR </span>
          <span>{{session}}</span> 
          
      </h3>
      
      <hr/>
      <button class="btn primary">Изменить</button>
      <button class="btn danger">Удалить</button>

  </div>
    <h3 class="text-center text-white" v-else>
      Сеанса с таким ID = {{$route.params.idf}} нет.
  </h3>
</template>

<script>
// import {computed} from 'vue'
import {ref, onMounted} from 'vue'
import {useRoute} from 'vue-router'
import { useStore } from "vuex";
// import {date} from '../../use/date'
import  AppLoader from '../../ui/AppLoader.vue'

export default {
      components:{
        AppLoader,
    },
    setup(){
        const route = useRoute()
        const store = useStore()
        const loading = ref(false)
        const session = ref({})
        // const keyS = route.path.split('/')[route.path.split('/').length-1]
        // const films =  computed(()=> store.getters['requests/films'].filter(elem =>elem.id === keyS))
        // const film = films.value[0]


        onMounted(async()=>{
            loading.value = true
            session.value = await store.dispatch('requests/loadByID',{
                rType:'sessions',
                id:route.params.ids,
            },)
            loading.value = false

        })
        
        return{
            loading,
            // date,
            session,
        }
    }
}
</script>

<style>

</style>