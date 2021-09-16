<template>
<div>
    <span>Main</span>
    <!-- <app-loader v-if="loading"></app-loader> -->
    <div class="card" v-if="userOrders.length!==0 && sessions">
       <h2 >  Мои заказы </h2>
      <table class="table">
      <thead>
        <tr>
          <th>#</th>
          <th>Дата покупки</th>
          <th>Инфо о сеансе</th>
          <th>Дата сеанса</th>
          <th>Количество билетов</th>
          <th>К оплате</th>
        </tr>
      </thead>
      <tbody>
                <tr v-for="(order,idx) in userOrders" :key="idx">
          <td>{{ idx + 1}}</td>
          <td>{{date(order.dateToBuy)}}</td>  
          <td>{{sessions.find(session=>session.id===order.sessionId)!=undefined?`Название фильма - ${sessions.find(session=>session.id===order.sessionId).sessionFilmName }.
          

           Время - ${sessions.find(session=>session.id===order.sessionId).startSessionTime}`:order.sessionId}}</td>
          <td>
              {{date(order.date)}}
           </td>
            <td>
              {{order.places.map(row=>{
                  return row.length
              }).reduce((accumulator, a)=>{return accumulator+a},0)}}
           </td>       
           <td>
              {{currency(order.sum)}}
            </td>
        </tr>

      </tbody>
    </table>
    </div>
    <div v-else class="card container noOrders">
        <h3>У вас нет заказов!<br>
          <small><router-link to="/cinemaMain">Вернуться на главную</router-link></small>
        </h3>
          
    </div>
  </div>
</template>

<script>
import { ref, onMounted, computed, watch } from "vue";
import { useStore } from 'vuex';
import { date } from "../../Admin_Portal/use/date";
import { currency } from "../../Admin_Portal/use/currency";
import AppLoader from "../../Admin_Portal/ui/AppLoader.vue";

export default{
    components:{
      AppLoader,
    },

     setup(){
         const store = useStore()
         const userEmail = ref()
         const userId = ref()
         const userOrders = ref()
         const sessions = ref()
         const loading = ref(false)


         onMounted(async()=>{
           loading.value=true
             userEmail.value = store.getters['authClient/activeUserEmail']
             let clientToken = store.getters['authClient/token']
             if(userEmail.value && clientToken){
              return await store.dispatch('gettingInfo/loadAll',['orders','sessions', 'users'] )

             }
             
         })
            userId.value  = computed(()=>store.getters['gettingInfo/users']
            .find(user=>user.email === userEmail.value)
            )  

            userOrders.value = computed(()=>store.getters['gettingInfo/orders']
            .filter(order=>{
              if(userId.value.value && order.uid === userId.value.value.id){
                return order
              }
              }
              )
            )

            sessions.value = computed(()=> store.getters['gettingInfo/sessions'])

            watch(()=>[userOrders.value,sessions.value, userId.value], ()=>{return loading.value=false})


          return{
              userOrders:userOrders.value,
              sessions:sessions.value,
              userId:userId.value,
              currency,
              date,
              loading

          }
     }
}
        
</script>

<style scoped>
  .noOrders{
    text-align: center;
    margin-bottom: 15%;
  }
  @media all and (min-width:350px) and (max-width:650px) {
    div table.table thead tr th {
    padding: 0.05rem .01rem;
    font-size: 10px;
    }
    div table.table td {
    padding: .05rem 0.001rem;
    font-size: 12px;
  }
  }
    @media all  and (max-width:349px) {
    h2.title{
          font-size: 1.05rem;
    }
    div table.table thead tr th {
    padding: 0.05rem .001rem;
    font-size: 8px;
    }
    div table.table td {
    padding: .05rem 0.001rem;
    font-size: 8px;
  }
  }
</style>