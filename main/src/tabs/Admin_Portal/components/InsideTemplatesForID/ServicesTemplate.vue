<template>
  <div class="card">
       <h1 class="card-title">
          <span>{{service.addServices}}</span> 
          <span>{{currency(service.addServicesPrice)}}</span> 
      </h1>
      <hr/>
      <button class="btn primary">Изменить</button>
      <button class="btn danger">Удалить</button>

  </div>
</template>

<script>
import {computed} from 'vue'
import {useRoute} from 'vue-router'
import { useStore } from "vuex";
import {currency} from '../../use/currency'

export default {
    setup(){
        const route = useRoute()
        const store = useStore()
        const keyS = route.path.split('/')[route.path.split('/').length-1]
        console.log(keyS)
        const service = computed(()=> store.getters['requests/addServices'].keyS)
        return{
            currency,
            service,
        }
    }
}
</script>

<style>

</style>