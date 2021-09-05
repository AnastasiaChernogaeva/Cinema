<template>
<!-- <app-loader v-if="loading"></app-loader> -->
 
      <div v-if="!loading" >
      <!-- <spanclass=>В прокате</spanclass="card"> -->
          <h2 class="title card">Фильмы в прокате:</h2>
      <hr>
      <!-- <div v-if="films.length<=5"> -->
        <div class="filmBlock card" v-for="(film, idx) of fFilms" :key="idx" @mouseenter="clearTimer" @mouseleave="startTimer">
            <router-link v-slot="{navigate}" custom :to="{name:'cfilm', params:{idf:film.id}}">
            <img :src="film.movieposter" :alt="film.filmName" @click="navigate">
            
            <div class="infoAbout" @click="navigate">
                <h3>{{film.filmName}}</h3>
                <hr>
                <p><b>Жанр:</b>{{film.genre}}</p>
                <p><small>Для получения подробной информации нажмите на постер</small></p>
            </div>
             </router-link> 
         </div>

<!--  <div  >-->



   <!-- <div class="filmBlock card" v-for="(film, idx) of films" :key="idx" >
            <router-link v-slot="{navigate}" custom :to="{name:'cfilm', params:{idf:film.id}}">
            <img :src="film.movieposter" :alt="film.filmName" @click="navigate">
            
            <div class="infoAbout" @click="navigate">
                <h3>{{film.filmName}}</h3>
                <hr>
                <p><b>Жанр:</b>{{film.genre}}</p>
                <p><small>Для получения подробной информации нажмите на постер</small></p>
            </div>
             </router-link> 
         </div> -->


     <!-- </div>  fFilms
        <div v-else>
            <button class="arrow forward" @click="maxL++" :disabled="maxL===films.length">&#8250;</button>
            <button class="arrow back" @click="maxL--" :disabled="maxL===5">&#8249;</button>

        <div class="filmBlock" v-for="(film, idx) of filmsAll" :key="idx" >
            <img :src="film.movieposter" :alt="film.filmName">
            
            <div class="infoAbout">
                <h3>{{film.filmName}}</h3>
                <hr>
                <p><b>Жанр:</b>{{film.genre}}</p>
                <p><small>Для получения подробной информации нажмите на постер</small></p>
            </div>
        </div>
      </div> -->
  </div> 
</template>

<script>
import {onMounted, ref, computed, onUpdated} from "vue"
import { useStore } from 'vuex'
// import AppLoader from '../../Admin_Portal/ui/AppLoader.vue'

export default {
    components:{
        //  AppLoader,
    },
    setup(){
        const store = useStore()
        const maxL = ref(5)
        const filmsAll = ref([])
        const loading = ref(true)

      onMounted( async()=>{
                loading.value = true
                
                await store.dispatch('gettingInfo/loadAll',['films','cinemas','sessions'])
                // loading.value = false

      }, 
    //   ()=>{
    //         if(films.length<=5){
    //         filmsAll.value=films
    //     }
    //     else if(films.length>5){
    //         if (maxL===5){
    //             filmsAll.value=films.filter((film,id)=>{
    //                     return id<5
    //             })
                
    //         console.log(filmsAll.value);
    //          }
    //          else{
    //              filmsAll.value=filmsAll.value.shift().push(films[maxL])
                 
    //         console.log('changemaxL',filmsAll.value);
    //           }
    //     }
    //    }
      )
    //   const films = computed(()=> store.getters['gettingInfo/films']
    //   .filter(film=>{
    //       if(Date.parse(film.finishTime)>Date.parse(new Date()))
    //       return film

    //   })

    //   )
      const fFilms = ref([])
    //   console.log(films.value);
    const films = computed(()=> {
                    loading.value=true
                    return store.getters['gettingInfo/films']
                    .filter(film=>{
                        if(Date.parse(film.finishTime)>Date.parse(new Date()))
                        return film

                    })})
        // console.log('Получаем фильмы',films.value);
        let count = ref(0)
        const timer = ref()

        function timerFilms(){
            if(films.value.length>6){
        timer.value = setInterval(()=>{  
                if(count.value===0 &&fFilms.value.length!=0){
                    fFilms.value=[]
                }
               if(fFilms.value.length===0){
                  count.value++
                  fFilms.value=films.value.filter((film, id)=>{if(id<6) return film})
              }
              else if(fFilms.value.length!=0){
                  count.value=0
                  fFilms.value=films.value.filter((film, id)=>{if(id>=6) return film})
                  if(fFilms.value.length!==6){
                      let amountToAdd= 6 - fFilms.value.length;
                    //   console.log('amountToAdd',amountToAdd);
                      for( let i=0; i<amountToAdd; i++){
                        //   console.log('film',films.value[i]);
                           fFilms.value.push(films.value[i])
                      }

                    //  console.log('Добавили фильмы,котрых не хватает.',fFilms.value);
                  }
                  

              }
              loading.value=false
          }  ,3000)
          }
          else{
              fFilms.value = films.value
          }
        }

        setTimeout(timerFilms, 500)

        const clearTimer = ()=>{
            clearInterval(timer.value)
        }

        const startTimer = ()=>{
            timerFilms();
        }
 
                
         
     
    //     const func = ()=>{
    //         if(films.length<=5){
    //         filmsAll.value=films
    //     }
    //     else if(films.length>5){
    //         if (maxL===5){
    //             filmsAll.value=films.filter((film,id)=>{
    //                     return id<5
    //             })
                
    //         console.log(filmsAll.value);
    //          }
    //          else{
    //              filmsAll.value=filmsAll.value.shift().push(films[maxL])
                 
    //         console.log('changemaxL',filmsAll.value);
    //           }
    //     }
    //    }
    //    func()
       
        



       
        return{
            loading,
            maxL,
            // films,
            filmsAll,
            fFilms,
            clearTimer,
            startTimer

        }
        
    }

}
</script>

<style scoped>
    .title{
        /* background: #fff; */
        align-items: center;
        text-align: center;
        display:block;
        height: 4rem;
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
    margin-left: 7%;
    margin-right: 6%;
    margin-top: 1%;
    margin-bottom: 1%;

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
       height: 270px;
       color:white;
       font-size:15px;
       position: absolute;
       background:rgba(0, 0, 0, 0.719);
       z-index:35;
   }

</style>