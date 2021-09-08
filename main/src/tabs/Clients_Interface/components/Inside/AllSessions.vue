<template>
<!-- <app-loader v-if="loading"></app-loader> -->
  <div class="card " v-if="sessions.length!=0">
    <h1 v-if="search">{{search}}</h1>
     <h1>Сеансы:</h1>

     <div class="session container" v-for="(session, idx) of sessions" :key="idx">
         <h3>{{session.sessionFilmName}}</h3>
              <ul>
                  <!-- <li><b>фильм в показе:</b>&nbsp;{{films.find(film=>film.filmName===session.sessionFilmName).startTime}}-{{films.find(film=>film.filmName===session.sessionFilmName).finishTime}}</li> -->
                  <li><b>город:</b>&nbsp;{{session.cityName}}</li>
                  <li>
                      <!-- <router-link class="insideIfo" v-slot="{navigate}" custom :to="{name:'ccinema', params:{idc:cinemas&&cinemas.find(cinema=>{
                      if(cinema && cinema.cinemaName===session.chosenCinemaName) return cinema}).id}}"> -->
                         <router-link class="insideIfo" v-slot="{navigate}" custom :to="{name:'ccinema', params:{idc:foundNeededId(session.chosenCinemaName)}}">
                      <b>кинотеатр:</b>&nbsp;<span @click="navigate">{{session.chosenCinemaName}}</span></router-link></li>
                  <li><router-link class="insideIfo" v-slot="{navigate}" custom :to="{name:'csession', params:{ids:session.id}}"><b>время показа:</b>&nbsp;<span @click="navigate">{{session.startSessionTime}}</span></router-link></li>
              </ul>
              
     </div>
  </div> 
</template>

<script>
// добавить валидацию + сделать поиск по слову!!!

import {onMounted, ref, computed, watch} from "vue"
import { useStore } from 'vuex'
import AppLoader from '../../../Admin_Portal/ui/AppLoader.vue'

export default {
    props:['search'],
    components:{
         AppLoader,
    },
    setup(props){
        watch(()=>props.search,()=>{
            console.log(props.search);
        })
        const store = useStore()
        const loading = ref(false)
        // const finishDates = ref([])
        // const sessions = ref()
        // const cinemas = ref()
        // const films = ref()



      onMounted( async()=>{
                loading.value = true 
                await store.dispatch('gettingInfo/loadAll',['cinemas','films','sessions'])
                loading.value = false
                // sessions.value = computed(()=> store.getters['gettingInfo/sessions'])
                // cinemas.value = computed(()=> store.getters['gettingInfo/cinemas'])
                // films.value = computed(()=> store.getters['gettingInfo/films']
                //     .filter(film=>{
                //     finishDates.value.push(film.finishTime)
                //     return film.finishTime>Date.now()}))
                //     console.log(cinemas.value.value);
                //     console.log(sessions.value.value);
            },  
      
    )

                const foundNeededId = (word)=>{
                   return cinemas.value.find(cinema=>{
                      if( cinema.cinemaName===word) return cinema}).id
                }




                const sessions = computed(()=> store.getters['gettingInfo/sessions'])
                const cinemas = computed(()=> store.getters['gettingInfo/cinemas'])
                const films = computed(()=> store.getters['gettingInfo/films']
                    .filter(film=>{
                    // finishDates.value.push(film.finishTime)
                    return film.finishTime>Date.now()}))

    //   const dateArr = ref([])
    //   let numberMonth = new Date().getMonth()<10?'0':0
    //   let numberDay = new Date().getDate()<10?'0':0

      

    //   const today = new Date()
    //   const date = numberDay + new Date().getDate() + "-" + numberMonth + (new Date().getMonth()+1) + "-" + new Date().getFullYear() 
    //     console.log(today);

    // if([0, 2, 4, 6, 7, 9, 11].includes(today.getMonth())){
    //     for (let i = 0; i <= 30; i++) {  
    //     dateArr.value.push(today.setDate(today.getDate() + 1));
    //     // console.log(currentDate);
    //  }
    // }
    // else{
    //    for (let i = 0; i <= 30; i++) {  
    //     dateArr.value.push(today.setDate(today.getDate() + 1));
    //     // console.log(currentDate);
    //  }
    // }
    //     // console.log(new Date(dateArr.value[2]).getDay());



    
        

        return{
            loading,
            sessions,
            cinemas,
            films,
            foundNeededId
        }
        
    }}
</script>

<style scoped>
.card{
    padding-left:10%;
}
    li{
        list-style-type: none;   
    }
    .arrow{
        font-size: 20px;
        background:rgba(0, 0, 0, 0.096);
        border:none;
        width:50px;
        height:50px;
        border-radius:50%;
        position:absolute;
        top:40%;
        z-index:70;
        border:1px solid white;
        display:block;
    }
    button.arrow.forward {
       right: 30px;
    }
    button.arrow.back {
       left: 30px;
    }
   .filmBlock{
       /* width:25%;
       height:auto;
       display: inline-block; */
    /* margin-bottom: 8px;
    position: relative;
    display: block; */
    width: 20%;
    height: 300px;
    text-align: center;
    display: inline-flex;
    /* border: chocolate 3px solid; */
    justify-content: space-around;
   }
      
    img{
        width: 200px;
        height: auto;
        z-index:15;

    /* width: 100%;
    height: auto;
    vertical-align: bottom;
    border-radius: 4px; */
   } 
   .infoAbout{
       display: none;
   }
   .filmBlock:hover{
       background:rgba(0, 0, 0, 0.719);
       cursor: pointer;
       z-index:25;
   }
   /* .filmBlock:hover .arrow{
       display:none;
   } */
   .filmBlock:hover .infoAbout{
       display: block;
       width: 200px;
       height: 300px;
       color:white;
       font-size:15px;
       position: absolute;
       background:rgba(0, 0, 0, 0.719);
       z-index:35;
   }

</style>