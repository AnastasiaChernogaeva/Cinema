<template>
  <app-loader v-if="loading"/>
  <div class="card" v-else-if="service">
      <div class="breadcrumbs">
          <router-link to="/admin/services">Вернуться к списку услуг</router-link>
      </div>
       <h3 class="card-title">
           <!-- <span>LOVE is in the AIR </span> -->
          <span>{{service.addServices}}</span> 
          <span>{{currency(service.addServicesPrice)}}</span> 
      </h3>
      <hr/>
      <!-- <button class="btn primary" @click="update">Изменить</button> -->
      <button class="btn danger" @click="remove">Удалить</button>

  </div>
  <h3 class="text-center text-white" v-else>
      Услуги с таким ID = {{$route.params.idas}} нет.
  </h3>
</template>

<script>
import {computed,ref, onMounted} from 'vue'
import {useRoute, useRouter} from 'vue-router'
import { useStore } from "vuex";
import {currency} from '../../use/currency'
import  AppLoader from '../../ui/AppLoader.vue'

export default {
    components:{
        AppLoader,
    },
    setup(){
        const route = useRoute()
        const router = useRouter()
        const loading = ref(false)
        const store = useStore()
        const service = ref({})

        onMounted(async()=>{
            loading.value = true
            service.value = await store.dispatch('requests/loadByID',{
                rType:'services',
                id:route.params.idas,
            },)
            loading.value = false

        })
        // const keyS = route.path.split('/')[route.path.split('/').length-1]
        // const services =  computed(()=> store.getters['requests/services'].filter(elem =>elem.id === keyS))
        // const service = services.value[0]


        const remove = async()=>{
            await store.dispatch('requests/remove',{
                rType:'services',
                id:route.params.idas,
            },)
            router.push('/admin/services')
        }

        const update = ()=>{
            
        }
        
        return{
            currency,
            loading,
            service,
            remove,
            update
        }
    }
}
</script>

<style scoped>
    
@media all and (max-width:1010px){
   div.card {
    padding-top:8rem;
}
}
</style>