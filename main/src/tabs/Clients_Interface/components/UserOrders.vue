<template>
    <div class="card" v-if="userOrders && sessions">
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
</template>

<script>
import { ref, onMounted, computed } from "vue";
import { useStore } from 'vuex';
import { date } from "../../Admin_Portal/use/date";
import { currency } from "../../Admin_Portal/use/currency";

export default{
    

     setup(){
         const store = useStore()
         const userEmail = ref()
         const userId = ref()
         const userOrders = ref()
         const sessions = ref()


         onMounted(async()=>{
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


          return{
              userOrders:userOrders.value,
              sessions:sessions.value,
              userId:userId.value,
              currency,
              date

          }
     }
}
        
</script>

<style>

</style>