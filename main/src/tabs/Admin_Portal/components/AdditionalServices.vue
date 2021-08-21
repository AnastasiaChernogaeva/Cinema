<template>
  <h4 v-if="additionalServices.length === 0" class="text-center">Дополнительных услуг пока нет</h4>
   <div v-else >
    <table  class="table">
      <thead>
        <tr>
          <th>#</th>
          <th>Название</th>
          <th>Цена</th>
          <!-- <th>Действие</th> -->
        </tr>
      </thead>
      <tbody>
        <tr v-for="(service,idx) in additionalServices" :key="idx" @click="lookCloser(service, idx)" >
          <router-link v-slot="{navigate}" custom :to="{name:'service', params:{idas:service.id}}">
          <td>{{idx + 1}}</td>
          <td @click="navigate">{{service.addServices}}</td>
          <td>{{currency(service.addServicesPrice)}}</td>
          </router-link>
          <!-- <td> -->
            <!-- <router-link v-slot="{navigate}" custom :to="{name:'service', params:{id:idx}}">
              <button class="btn primary">Открыть</button>
            </router-link> -->
      
          <!-- </td> -->
        </tr>
      </tbody>
    </table>
    <hr/>
    <small>Нажмите на услугу для получения дополнительной информации</small>
</div>
</template>

<script>
import {useRouter} from 'vue-router'
import {currency} from '../use/currency'

export default {
  props:['additionalServices'],
  setup(){
    const router = useRouter()
    // const lookCloser = (elem,id)=>{
    //   router.push(`/admin/services/${id}`)
    // }
    return{
      currency,
      // lookCloser,
    }
  }
}
</script>

<style>

</style>