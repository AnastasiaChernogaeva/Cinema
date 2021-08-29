<template>
   <app-loader v-if="loading"/>
  <div class="card" v-else-if="film">
           <div class="breadcrumbs">
          <router-link to="/cinemaMain">Вернуться на главную</router-link>
      </div>
          <h3 class="card-title">
          <span>{{film.filmName}}</span> 
          <span v-if="film.startTime"><small>Время показа: {{date(film.startTime)}} - {{date(film.finishTime)}}</small></span>
      </h3>
      <small>Жанр:{{film.genre}}</small>
      <hr/>
      <div>
          <img :alt="film.filmName" :src="film.movieposter" class="templateImg" >
          <h3>Описание
          </h3>
          <p>
              {{film.filmDescription}}
          </p>
      </div>
      
      <hr/>
       
     <div v-for="session of sessions" :key="session.id">
       <h3 class="card-title">
          <span>{{session.sessionFilmName}}</span> 
          <span v-if="film.startTime"><small>Даты показа: {{date(film.startTime)}} - {{date(film.finishTime)}}</small></span>
          <span>Время показа:{{session.startSessionTime}}</span>
          <span>Город:{{session.cityName}}</span>
          <span>Кинотеатр:{{session.chosenCinemaName}}</span>


      </h3>
          <p>
          </p>
     </div>

  </div>
    <h3 class="text-center text-white" v-else>
      Кинотеатра с таким ID = {{$route.params.idf}} нет.
  </h3>
</template>

<script>
import {ref, onMounted, computed} from 'vue'
import {useRoute, useRouter} from 'vue-router'
import { useStore } from "vuex";
import {date} from '../../../Admin_Portal/use/date'
import  AppLoader from '../../../Admin_Portal/ui/AppLoader.vue'

export default {
      components:{
        AppLoader,
    },
    setup(){
        const route = useRoute()
        const router = useRouter()
        const store = useStore()
        const loading = ref(false)
        const film = ref({})
        // const sessions = ref({})



        onMounted(async()=>{
            loading.value = true
            film.value = await store.dispatch('gettingInfo/loadByID',{
                rType:'films',
                id:route.params.idf,
            },)
           await store.dispatch('gettingInfo/load',{
                rType:'sessions',
            },)
            // sessions.value = sessions.value.filter(session=>session.sessionFilmName
            // ===film.fimName)
            loading.value = false
            // console.log(film);

        })

      const sessions = computed(()=> store.getters['gettingInfo/sessions']
      .filter(session=>{
        console.log(film.fimName);
        if(session.sessionFilmName===film.fimName){
        console.log(session);
        return session
        }
        }))


        return{
            loading,
            film,
            date,
            sessions,

        }
    }
}
</script>

<style scoped>
    /* .wrapper-Canvas {
    width: 500px;
    height: 250px;
    background: lightblue;
} */
</style>