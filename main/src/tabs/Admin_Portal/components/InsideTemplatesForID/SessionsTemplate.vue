<template>
   <app-loader v-if="loading"/>
  <div class="card" v-else-if="session">
      <div class="breadcrumbs">
          <router-link to="/admin/sessions">Вернуться к списку сеансов</router-link>
      </div>
       <h3 class="card-title">
           <span>LOVE is in the AIR </span>
          <span>{{session}}</span> 
          
      </h3>
         <table  class=" sessionT">
      <thead>
        <tr>
          <th>Фильм:</th>
          <th>Город:</th>
          <th>Кинотеатр:</th>
          <th>Время:</th>
          
          <th>Зал:</th>
          <th>Места:</th>
          <th>Дополнительные услуги:</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <!--  @click="navigate"<router-link v-slot="{navigate}" custom :to="{name:'session', params:{ids:session.id}}"> -->
          <td>{{session.sessionFilmName}}</td>
          <td>{{session.cityName}}</td>
          <td>{{session.chosenCinemaName}}</td>
          <td>{{session.startSessionTime}}</td>
          
          <!-- <td>{{session.cityName}}</td>
          <td>{{session.cityName}}</td> -->
          <!-- </router-link> -->
        </tr>
      </tbody>
    </table>
      
      <hr/>
      <!-- <button class="btn primary" @click="update">Изменить</button> -->
      <button class="btn danger" @click="remove">Удалить</button>

  </div>
    <h3 class="text-center text-white" v-else>
      Сеанса с таким ID = {{$route.params.idf}} нет.
  </h3>
</template>

<script>
// import {computed} from 'vue'
import {ref, onMounted} from 'vue'
import {useRoute} from 'vue-router'
import { useStore } from "vuex";
// import {date} from '../../use/date'
import  AppLoader from '../../ui/AppLoader.vue'

export default {
      components:{
        AppLoader,
    },
    setup(){
        const route = useRoute()
        const store = useStore()
        const loading = ref(false)
        const session = ref({})
        // const keyS = route.path.split('/')[route.path.split('/').length-1]
        // const films =  computed(()=> store.getters['requests/films'].filter(elem =>elem.id === keyS))
        // const film = films.value[0]


        onMounted(async()=>{
            loading.value = true
            session.value = await store.dispatch('requests/loadByID',{
                rType:'sessions',
                id:route.params.ids,
            },)
            loading.value = false

        })

        const remove = ()=>{

        }

        const update = ()=>{
            
        }
        
        return{
            loading,
            // date,
            session,
            remove,
            update
        }
    }
}
</script>

<style scoped>
    .sessionT{
        color:red;
    }
    th {
    display: table;
}
</style>