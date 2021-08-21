<template>
  <div class="card">
       <h3 class="card-title">
           <!-- <span>LOVE is in the AIR </span> -->
          <span>{{res.addServices}}</span> 
          <span>{{currency(res.addServicesPrice)}}</span> 
      </h3>
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
        const service =  computed(()=> store.getters['requests/addServices'].filter(elem =>elem.id === keyS))
        const res = service.value[0]

        
        return{
            currency,
            res,
        }
    }
}
</script>

<style>

</style>