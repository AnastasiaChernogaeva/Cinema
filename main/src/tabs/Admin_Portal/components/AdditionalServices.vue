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
        <tr v-for="(service,idx) in additionalServices" :key="idx">
          <td>{{idx + 1}}</td>
          <td>{{service.addServices}}</td>
          <td>{{currency(service.addServicesPrice)}}</td>
          <!-- <td> -->
            <!-- <router-link v-slot="{navigate}" custom :to="{name:'service', params:{id:idx}}">
              <button class="btn primary" @click="navigate">Открыть</button>
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
import {currency} from '../use/currency'

export default {
  props:['additionalServices'],
  setup(){
    return{
      currency
    }
  }
}
</script>

<style>

</style>