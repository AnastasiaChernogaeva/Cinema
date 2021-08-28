<template>

  <h4 v-if="orders.length === 0" class="text-center">Заказов пока нет</h4>
    <div v-else >
      <table class="table">
      <thead>
        <tr>
          <th>#</th>
          <th>ФИО</th>
          <th>Фильм</th>
          <th>Дата</th>
          <th>Время начала сеанса</th>
          <th>Количество билетов</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(order,idx) in orders" :key="idx">
<router-link v-slot="{navigate}" custom :to="{name:'order', params:{ido:order.id}}">
          <td>{{ idx + 1}}</td>
          <td @click="navigate">{{film.filmName}}</td>
          <td>
              <!-- {{date(film.startTime)}} -->
              </td>
          <td>
              <!-- {{date(film.finishTime)}} -->
              </td>
          <td></td>
       </router-link>
        </tr>
      </tbody>
    </table>
    <hr/>
    <small>Для получения подробной информации о фильме нажмите на строку с ним</small>
    </div>
</template>

<script>
import {date} from '../use/date'
import AppStatus from "../ui/AppStatus.vue";

export default {
  props:['orders'],
  components:{
    AppStatus,
  },
  setup(){
    return{
      date
    }
  }
}
</script>

<style>

</style>