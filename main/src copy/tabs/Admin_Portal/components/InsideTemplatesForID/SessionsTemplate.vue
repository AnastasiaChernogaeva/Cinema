<template>
   <app-loader v-if="loading"/>
  <div class="card" v-else-if="session">
      <div class="breadcrumbs">
          <router-link to="/admin/sessions">Вернуться к списку сеансов</router-link>
      </div>
       <h3 class="card-title">
         Сеанс №{{id}}
      </h3>
       <ul  class=" sessionT">
          <li><b>Фильм:</b>&nbsp;{{session.sessionFilmName}}</li>
          <li><b>Город:</b>&nbsp;{{session.cityName}}</li>
          <li><b>Кинотеатр:</b>&nbsp;{{session.chosenCinemaName}}</li>
          <li><b>Время:</b>&nbsp;{{session.startSessionTime}}</li>
          <li><b>Зал:</b>&nbsp;{{session.hallnumber}}</li>
          <li><b>Места:&nbsp;</b><span v-if="session.pricesCPl">{{session.pricesCPl?`Места для двоих - ${session.pricesCPl}BYN;`:null}}&nbsp;</span>
            <span v-if="session.pricesSPl">{{session.pricesSPl?`Обычные места - ${session.pricesSPl}BYN;`:null}}&nbsp;</span>
            <span v-if="session.pricesVPl">{{session.pricesVPl?`VIP места - ${session.pricesVPl}BYN;`:null}}&nbsp;</span>
</li>
          <li><b>Дополнительные услуги:</b>&nbsp;
            <span v-if="session.chosenAddServices && session.chosenAddServices.length>0"> <span v-for="(oneservice, idx) of session.chosenAddServices" v-bind:key="idx">{{oneservice}}</span></span>
          <span v-else>Нет</span>
          </li>
       </ul>
      
      <hr/>
      <!-- <button class="btn primary" @click="update">Изменить</button> -->
      <button class="btn danger" @click="remove">Удалить</button>

  </div>
    <h3 class="text-center text-white" v-else>
      Сеанса с таким ID = {{$route.params.ids}} нет.
  </h3>
</template>

<script>
import {ref, onMounted} from 'vue'
import {useRoute, useRouter} from 'vue-router'
import { useStore } from "vuex";
import  AppLoader from '../../ui/AppLoader.vue'

export default {
      components:{
        AppLoader,
    },
    setup(){
        const route = useRoute()
        const router = useRouter()
        const store = useStore()
        const loading = ref(false)
        const session = ref({})


        onMounted(async()=>{
            loading.value = true
            session.value = await store.dispatch('requests/loadByID',{
                rType:'sessions',
                id:route.params.ids,
            },)
            loading.value = false

        })

        const remove =async()=>{
            await store.dispatch('requests/remove',{
                rType:'sessions',
                id:route.params.ids,
            },)
            router.push('/admin/sessions')
        }

        return{
            loading,
            // date,
            session,
            remove,
            id:route.params.ids,
        }
    }
}
</script>

<style scoped>
    .sessionT{
      list-style-type: none;    }
</style>