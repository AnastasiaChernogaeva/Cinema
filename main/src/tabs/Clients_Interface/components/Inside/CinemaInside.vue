<template>
   <app-loader v-if="loading"/>
  <div class="card container" v-else-if="cinema">
           <div class="breadcrumbs">
          <router-link to="/cinemaMain">Вернуться на главную</router-link>
      </div>
          <h3 class="card-title">
          <span>{{cinema.cinemaName}}</span> 
          
      </h3>
      <p>г.{{cinema.city}}</p>
      <div v-if="cinema.hallamounts>0">
        <hall v-for=" el of cinema.hallamounts " :key="el" :info="info={'val':{...cinema.val[`id${el}`]}, id:el}" ></hall>
      </div>
      <!-- <div v-if="sessions.length!=0">
       <h2>Сеансы:</h2>

     <h3>
             <b>{{film.filmName}}</b><br>
          <span v-if="film.startTime"><small>Даты показа: {{date(film.startTime)}} - {{date(film.finishTime)}}</small></span>
           
      </h3>

     <div class="session container" v-for="session of sessions" :key="session.id">
              <ul>
                  <li><b>город:</b>&nbsp;{{session.cityName}}</li>
                  <li><b>кинотеатр:</b>&nbsp;<router-link to="" class="insideIfo">{{session.chosenCinemaName}}</router-link></li>
                  <li><b>время показа:</b>&nbsp;{{session.startSessionTime}}</li>
              </ul>
              
     </div>
      </div>

     <div v-else>
         <p>К сожалению, нет сеансов на фильм "{{film.filmName}}"</p>
          <router-link to="/cinemaMain"> Посмереть все сеансы</router-link>

         
     </div> -->
    
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
import Hall from '../../../Admin_Portal/hall/Hall.vue';


export default {
      components:{
        AppLoader,
            Hall,

    },
    setup(){
        const route = useRoute()
        const router = useRouter()
        const store = useStore()
        const loading = ref(false)
        // const film = ref({})
        // const sessions = ref({})
              const cinema = ref({})


        onMounted(async()=>{
            loading.value = true
            cinema.value = await store.dispatch('gettingInfo/loadByID',{
                rType:'cinemas',
                id:route.params.idc,
            },)
             document.title = `Кинотеатр "${cinema.value.cinemaName}" `

            loading.value = false
            // console.log(cinema);

        })



        // onMounted(async()=>{
        //     loading.value = true
        //     film.value = await store.dispatch('gettingInfo/loadByID',{
        //         rType:'films',
        //         id:route.params.idf,
        //     },)
        

        //    await store.dispatch('gettingInfo/load',{
        //         rType:'sessions',
        //     },)
        //     // sessions.value = sessions.value.filter(session=>session.sessionFilmName
        //     // ===film.fimName)
        //     loading.value = false
        //     // console.log(film);

        // })

      const sessions = computed(()=> store.getters['gettingInfo/sessions']
      .filter(session=>{
        console.log(film.value.filmName);
        if(session.sessionFilmName===film.value.filmName){
        console.log(session);
        return session
        }
        }))


        return{
            loading,
            cinema,

        }
    }
}
</script>

<style scoped>
    .insideIfo{
        color: #2c3e50;
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


</style>