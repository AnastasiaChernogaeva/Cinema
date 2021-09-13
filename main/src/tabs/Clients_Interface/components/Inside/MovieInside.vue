<template>
   <app-loader v-if="loading"/>
  <div class="card container" v-else-if="film">
           <div class="breadcrumbs">
          <router-link to="/cinemaMain">Вернуться на главную</router-link>
      </div>
          <h3 class="card-title">
          <span>{{film.filmName}}</span> 
          <span v-if="film.startTime"><small>Время показа: {{date(film.startTime)}} - {{date(film.finishTime)}}</small></span>
      </h3>
      <small>Жанр:{{film.genre}}</small>
      <hr/>
      <table>
          <tbody>
              <tr>
                  <td>
                    <img :alt="film.filmName" :src="film.movieposter" class="templateImg" >
                  </td>
                  <td>
                    <h3>Описание</h3>
                            <p class="text"> 
                                {{film.filmDescription}}
                            </p>
                  </td>
              </tr>
          </tbody>
      </table>

      
      <hr/>
      <div class="sessionsTake" v-if="sessions.length!=0">
       <h2>Сеансы:</h2>
<hr>
     <h3>
             <b>{{film.filmName}}</b><br>
          <span v-if="film.startTime"><small>Даты показа: {{date(film.startTime)}} - {{date(film.finishTime)}}</small></span>
           
      </h3>

     <div class="session container" v-for="session of sessions" :key="session.id">
              <ul>
                  <li><b>город:</b>&nbsp;{{session.cityName}}</li>
            
                  <li><router-link class="insideIfo" v-slot="{navigate}" custom :to="{name:'ccinema', params:{idc:cinemas.find(cinema=>cinema.cinemaName===session.chosenCinemaName).id}}"><b>кинотеатр:</b>&nbsp;<span @click="navigate">{{session.chosenCinemaName}}</span></router-link></li>
                  <li><router-link class="insideIfo" v-slot="{navigate}" custom :to="{name:'csession', params:{ids:session.id}}"><b>время показа:</b>&nbsp;<span @click="navigate">{{session.startSessionTime}}</span></router-link></li>
              </ul>
              
     </div>
      </div>
<!-- findCinema(session.chosenCinemaName); -->
     <div v-else>
         <p>К сожалению, нет сеансов на фильм "{{film.filmName}}"</p>
          <router-link to="/cinemaMain"> Посмереть все сеансы</router-link>

         
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
        // const cinema = ref({})



        onMounted(async()=>{
            loading.value = true
            film.value = await store.dispatch('gettingInfo/loadByID',{
                rType:'films',
                id:route.params.idf,
            },)
             document.title = `Фильм "${film.value.filmName}" `
        

           await store.dispatch('gettingInfo/load',{
                rType:'sessions',
            },)
              await store.dispatch('gettingInfo/load',{
                rType:'cinemas',
            },)
             //cinemas.value = cinemas.value.find(session=>session.sessionFilmName===film.fimName)
            loading.value = false
            // console.log(film);

        })

      const sessions = computed(()=> store.getters['gettingInfo/sessions']
      .filter(session=>{
        console.log(film.value.filmName);
        if(session.sessionFilmName===film.value.filmName){
        console.log(session);
        return session
        }
        }))

       const cinemas = computed(()=> store.getters['gettingInfo/cinemas']
     )

        // const findCinema = (name)=>{
        //   cinema.value = cinemas.value.find(cinema=>{
        // if(cinema.cinemaName===name){
        // console.log(cinema.id);
        // return cinema
        // }
        // })

        // }


        return{
            loading,
            film,
            date,
            sessions,
            // findCinema,
            cinemas

        }
    }
}
</script>

<style scoped>
    router-link:hover{
        cursor:pointer;
    }
    .insideIfo{
        color: #2c3e50;
    }
    li span:hover{
        padding:0%;
        border-radius:25%;
        background: #2c3e50;
        color:white;
        cursor:pointer;
    }
    table{
    border-spacing: 10px;
	border-collapse: separate;
	/* width: 400px;
	border: 1px solid red; */
    }
    td {
	/* border: 1px solid red; */
	text-align:justify;
    vertical-align: top;
}
.session {
    clear: both;
    display: flex;
    flex-direction: row;
    font-size: 19px;
    justify-content: stretch;
    position: relative;
    left: 40%;
}
    .session ul{
         list-style-type: none;   
    }
    .text{
        padding:1%;
    }
    hr{
        clear:both;
    }
    .sessionsTake hr{
    position: relative;
    left: -3.5%;
    width: 80%;    }
    h2{
        
    border-bottom: 0px solid #eaecef;

    }
</style>