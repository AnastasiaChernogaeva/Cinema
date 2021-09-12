<template>
  <div class="card container" v-if="sessions.length!=0" id="sessionsInfo">

      <div class="button-filter">
        <div  v-for="(city, idx) of cities" :key = "idx">
            <button :class="['btn',{'primary':chosen===city}]" @click="findCity(city)">
                {{city}}
            </button>
        </div>
    </div>
    <hr>
      <!-- <div class="button-filter">
        <div  v-for="(genre, idx) of genres" :key = "idx">
            <button :class="['btn',{'primary':chosenGenre===genre}]" @click="findGenre(genre)">
                {{genre}}
            </button>
        </div>
    </div> -->
       <div class="input-filter form-control">
        <input type="text" v-model="genre" placeholder="Введите жанр" @change="genreSearch">
    </div>
    <hr>
     <h1>Сеансы&nbsp;{{searchWord?`по поиску "${searchWord}"`:null}}:</h1>



     <div class="session container" v-for="(session, idx) of searchFilms?searchFilms:sessions" :key="idx">
         <h3>{{session.sessionFilmName}}</h3>
              <ul>
                  <li><b>город:</b>&nbsp;{{session.cityName}}</li>
                  <li>
                         <router-link class="insideIfo" v-slot="{navigate}" custom :to="{name:'ccinema', params:{idc:foundNeededId(session.chosenCinemaName)}}">
                      <b>кинотеатр:</b>&nbsp;<span @click="navigate">{{session.chosenCinemaName}}</span></router-link></li>
                  <li><router-link class="insideIfo" v-slot="{navigate}" custom :to="{name:'csession', params:{ids:session.id}}"><b>время показа:</b>&nbsp;<span @click="navigate">{{session.startSessionTime}}</span></router-link></li>
              </ul>
              
     </div>
     <a href="#" @click="comeBackToAllSessions" v-if="searchFilms"> Показать все сеансы </a>
  </div> 
</template>

<script>
import {onMounted, ref, computed, watch} from "vue"
import { useStore } from 'vuex'
import AppLoader from '../../../Admin_Portal/ui/AppLoader.vue'

export default {
    props:['search'],
    // emit:['isLoaded'],
    components:{
         AppLoader,
    },
    setup(props){

                const store = useStore()
                const loading = ref(false)
                const searchWord = ref()
                const chosen = ref()
                const genre = ref()
                // const chosenGenre = ref()

                



                onMounted( async()=>{
                            loading.value = true 
                            await store.dispatch('gettingInfo/loadAll',['cinemas','films','sessions'])
                            loading.value = false

                        },  
                
                )

                const foundNeededId = (word)=>{
                    if(cinemas.value){
                        let cinema = cinemas.value.find(cinema=>{if( cinema.cinemaName===word) return cinema})
                        if(cinema)
                        return cinema.id
                        else
                        return
                    }
                }



                const cities = ref([])
                // const genres = ref([])

                const sessions = computed(()=> store.getters['gettingInfo/sessions'])
                const cinemas = computed(()=> store.getters['gettingInfo/cinemas'])
                const films = computed(()=> store.getters['gettingInfo/films'])

                watch(()=>sessions.value,()=>{
                        if(sessions.value){
                            cities.value = [... new Set( sessions.value.map(session=> session.cityName))]
                        }

                }) 
                // watch(()=>films.value,()=>{
                //         if(films.value){
                //             genres.value = [... new Set( films.value.map(film=> {
                //                  if(film.genre.includes(',')&&film.genre.includes('/'))
                //                 return film.genre.split(',').map(genre=>genre.split('/')).flat()
                //                 if(film.genre.includes(','))
                //                 return film.genre.split(',')
                //                 else if(film.genre.includes('/'))
                //                 return film.genre.split('/')
                //                 else if(film.genre!=='-')
                //                     return film.genre
                //                 })
                //                 .flat())]
                //         }
                //         console.log(new Set(genres.value));

                // }) 
                // const genreFilms = ref()
                const genreSearch=()=>{
                    if(films.value&&genre.value){
                       let filmsGenreWeNeed = films.value.filter(film=> {
                            if(film.genre.toLowerCase().includes(genre.value.toLowerCase()))
                            return film
                        }).map(film=>film.filmName.toLowerCase())

                        sessions.value && (searchFilms.value = sessions.value.filter(session=>{
                            if(filmsGenreWeNeed.includes(session.sessionFilmName.toLowerCase()))
                            return session
                        }))
                        console.log(searchFilms.value);
                    }
                    else{
                        searchFilms.value = sessions.value
                    }
                }

                const searchFilms = ref()

                watch(()=>props.search,()=>{
                    searchWord.value = props.search
                    if(searchWord.value&&chosen.value ){
                        searchFilms.value = sessions.value.filter(session=>{if(session.sessionFilmName.toLowerCase().includes(searchWord.value.toLowerCase() ))return session})
                        searchFilms.value =  searchFilms.value.filter(session=>{
                                        if(session.cityName===chosen.value){
                                            return session
                                        }
                                    })
                    }
                    else if(searchWord.value&&!chosen.value ){
                         searchFilms.value = sessions.value.filter(session=>{if(session.sessionFilmName.toLowerCase().includes(searchWord.value.toLowerCase() ))return session})
                    }
                    else{
                    searchFilms.value = sessions.value.filter(session=>{if(session.sessionFilmName.toLowerCase().includes(searchWord.value.toLowerCase() ))return session})

                    }
                        cities.value = [... new Set( sessions.value.map(session=> session.cityName))]
                    document.getElementById('sessionsInfo').scrollIntoView()
                })

               
                // const findGenre = (ev)=>{
                //         chosenGenre.value = ev
                       
                //         if(searchWord.value&&chosen.value ){
                //             searchFilms.value =  sessions.value.filter(session=>{if(session.sessionFilmName.includes(searchWord.value ))return session})
                //             searchFilms.value = searchFilms.value.filter(session=>{
                //                         if(session.cityName===chosen.value){
                //                             return session
                //                         }
                //                     })
                //         }else if(searchWord.value ){
                //             searchFilms.value =  sessions.value.filter(session=>{if(session.sessionFilmName.includes(searchWord.value ))return session})
                //             searchFilms.value = searchFilms.value.filter(session=>{
                //                         if(session.cityName===chosen.value){
                //                             return session
                //                         }
                //                     })
                //         }else if(chosen.value ){
                //             searchFilms.value = searchFilms.value.filter(session=>{
                //                         if(session.cityName===chosen.value){
                //                             return session
                //                         }
                //                     })
                //         }
                //             let filmsGenres= films.value.filter(film=>{
                //                         if(film.genre===ev){
                //                             return film
                //                         }
                //                     })
                //             for (let i=0; i<filmsGenres.length; i++){
                //                 searchFilms.value = searchFilms.value.filter(session=>{
                //                     if(session.sessionFilmName===filmsGenres[i].filmName){
                //                         return session
                //                     }
                //                 })
                //             }
                        
                //     }


                const findCity = (ev)=>{
                        chosen.value = ev
                       
                        if(searchWord.value ){
                            searchFilms.value =  sessions.value.filter(session=>{if(session.sessionFilmName.includes(searchWord.value ))return session})
                            searchFilms.value = searchFilms.value.filter(session=>{
                                        if(session.cityName===ev){
                                            return session
                                        }
                                    })
                        }else{
                            searchFilms.value = sessions.value.filter(session=>{
                                        if(session.cityName===ev){
                                            return session
                                        }
                                    })
                        }
                    }

      
                const comeBackToAllSessions = () =>{
                    searchFilms.value = null
                    searchWord.value = null
                    chosen.value = null
                }

        return{
            loading,
            sessions,
            cinemas,
            films,
            searchFilms,
            searchWord,
            comeBackToAllSessions,
            foundNeededId,
            findCity,
            chosen,
            cities,
            genreSearch,
            genre
        }
        
    }}
</script>

<style scoped>
hr{
    position: relative;
    left:-10%;
}
.button-filter{
    margin-top: 2%;
    /* width: 100%; */
    width: 90%;
    display: inline-flex;
    justify-content: flex-end;
}
div.input-filter.form-control{
    margin-top: 2%;
    width: 100%;
    display: flex;
    justify-content: center;
    position: relative;
    left:-10%;
}
.session{
    display:flex;
    justify-content: flex-start;
}
.session h3{
    width: 50%;
}

.search{
    border: 2px solid black;
}
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