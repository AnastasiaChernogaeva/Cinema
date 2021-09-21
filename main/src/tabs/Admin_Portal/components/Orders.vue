<template>

  <h4 v-if="orders.length === 0" class="text-center">Заказов пока нет</h4>
    <div v-else >
      <table class="table">
      <thead>
        <tr>
          <th>#</th>
          <th>Инфо о покупателе</th>
          <th>Инфо о сеансе</th>
          <th>Дата сеанса</th>
          <th>Дата покупки</th>
          <th>Выручка</th>
          <!-- <th>Количество билетов</th> -->
        </tr>
      </thead>
      <tbody>
        <tr v-for="(order,idx) in orders" :key="idx">
<!-- <router-link v-slot="{navigate}" custom :to="{name:'order', params:{ido:order.id}}"> -->
          <td>{{ idx + 1}}</td>
          <!-- <td @click="navigate">{{film.filmName}}</td> -->
          <td>{{users.find(user=>user.id===order.uid)!=undefined?`${users.find(user=>user.id===order.uid).name} ${users.find(user=>user.id===order.uid).surname}`:order.uid}}</td>
          <td>{{sessions.find(session=>session.id===order.sessionId)!=undefined?`Название фильма - ${sessions.find(session=>session.id===order.sessionId).sessionFilmName }.
          

           Время - ${sessions.find(session=>session.id===order.sessionId).startSessionTime}`:order.sessionId}}</td>
          <td>
              {{date(order.date)}}
           </td>
                     <td>
              {{date(order.dateToBuy)}}
           </td>           
           <td>
              {{currency(order.sum)}}
            </td>
       <!-- </router-link> -->
        </tr>
      </tbody>
    </table>
    <hr/>
    <span>Всего:&nbsp;{{currency(total)}}</span>
    </div>
</template>

<script>
import { ref, watch, onMounted, computed,  } from "vue";
import {date,} from '../use/date'
import { currency  } from "../use/currency";
import AppStatus from "../ui/AppStatus.vue";
import { useStore } from 'vuex';

export default {
  props:['orders', 'sessions'],
  components:{
    AppStatus,
  },
  setup(props){

    const store = useStore()
    const total = ref(0)

    onMounted(
      async() => await store.dispatch('requests/loadAll',['sessions', 'users'] )
    )

      const sessions = computed(()=> store.getters['requests/sessions'])
      const users = computed(()=> store.getters['requests/users'])

              watch(()=>props.orders, (newValue, oldValue) => {
                if(newValue!==oldValue){
                  let arrOrdersKey = Object.keys(props.orders)
                    for (let index = 0; index < arrOrdersKey.length; index++) {
                      // total.value.push(newValue[index].sum)
                      total.value+=newValue[index].sum

                      
                    }
                    // console.log(total.value);
                } else{
                }})

                  let arrOrdersKey = Object.keys(props.orders)
                    for (let index = 0; index < arrOrdersKey.length; index++) {
                      total.value+=props.orders[index].sum
                      
                    }
  

    return{
      total,
      users,
      sessions,
      date,
      currency
    }
  }
}
</script>

<style>

</style>