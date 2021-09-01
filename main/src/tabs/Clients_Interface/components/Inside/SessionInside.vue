<template>
   <app-loader v-if="loading"/>
  <div class="card container" v-else-if="session">
        <div class="breadcrumbs">
          <router-link to="/cinemaMain">Вернуться на главную</router-link>
      </div>
       <h3 class="card-title">
         Сеанс №{{id}}
      </h3>
       <ul  class=" sessionT">
          <li><b>Фильм:</b>&nbsp;{{session.sessionFilmName}}</li>
          <li><b>Город:</b>&nbsp;{{session.cityName}}</li>
          <li><b>Кинотеатр:</b>&nbsp;{{session.chosenCinemaName}}</li>
          <li><b>Время:</b>&nbsp;{{session.startSessionTime}}</li>
          <!-- <li><b>Зал:</b>&nbsp;{{session.hallnumber}}</li>
          <li><b>Места:&nbsp;</b><span v-if="session.pricesCPl">{{session.pricesCPl?`Места для двоих - ${session.pricesCPl}BYN;`:null}}&nbsp;</span>
            <span v-if="session.pricesSPl">{{session.pricesSPl?`Обычные места - ${session.pricesSPl}BYN;`:null}}&nbsp;</span>
            <span v-if="session.pricesVPl">{{session.pricesVPl?`VIP места - ${session.pricesVPl}BYN;`:null}}&nbsp;</span>
</li> -->
          <li><b>Дополнительные услуги:</b>&nbsp;
            <span v-if="session.chosenAddServices && session.chosenAddServices.length>0"> <span v-for="(oneservice, idx) of session.chosenAddServices" v-bind:key="idx">{{oneservice}};&nbsp;</span></span>
          <span v-else>Нет</span>
          </li>

          <li></li>
         
       </ul>

      <p><label><b> Выберите дату:</b>&nbsp;<input type="date" @blur="checkDates"  v-model="dateChosen"></label></p>
       <small v-if="error" :key="keyToChange">Фильм в прокате с {{film.startTime}} по {{film.finishTime}} </small>

      <hr/>
      <button class="btn" @click="findOut" v-if="!info">Выбрать места</button>
      <hall class="hall" v-if="info" :info="info={'val':{...info}, id:session.hallnumber,}"  
      @choosePlace="bookPlace"></hall>
      <div v-if="info && bookTickets">
      <div :class="[{'bookTicket':bookTickets}, ]" v-if="bookTickets.length!=0">
          <h2>Забронировать билеты</h2>
          <div v-for="(bookTicket, idx) of bookTickets" :key="idx">
              <div v-for="(rowPlaces, id) of bookTicket" :key="id">
                  <div>
                      <h3><b>{{session.sessionFilmName}}</b></h3>
                      <!-- <h4><b>Дата:</b>{{date(dateChosen)}}</h4> -->
                      <h4><b>Время:</b>{{session.startSessionTime}}</h4>
                    <p><b>Ряд:</b>&nbsp;{{rowPlaces.row}}</p>
                    <p><b>Место:</b>&nbsp;{{rowPlaces.place}}</p>


                  </div>
                    
                    <div v-if="rowPlaces.type=='couplePl'">
                        <h3>Место для двоих</h3>
                        <p><b>Цена за билет:</b>&nbsp;{{currency(session.pricesCPl)}}</p>
                    </div>
                    <div v-if="rowPlaces.type=='vipPl'">
                        <h3>VIP место</h3>
                        <p><b>Цена за билет:</b>&nbsp;{{currency(session.pricesVPl)}}</p>
                    </div>
                    <div v-if="rowPlaces.type=='simplePl'">
                        <h3>Обычное место</h3>
                        <p><b>Цена за билет:</b>&nbsp;{{currency(session.pricesSPl)}}</p>

                    </div>
                    
                    <hr>

              </div>
            
        </div>
        <p>Оплата производится при получении билетов</p>
        
        <div v-if="isBooked">
            <p>К оплате {{currency(sum)}}</p>

        </div>
        <button class="btn danger" @click="buyTickets" v-else>Забронировать билеты</button>
        <br>
        <div v-if="authErrorMessage" >
            <p>
                Пожалуйста, <router-link to="/cinemaMain/loginUser">ввойдите в аккаунт</router-link> или <router-link to="/cinemaMain/signupUser">зарегистрируйстесь</router-link> для дальнейшей брони билетов!

            </p>
        </div>
    </div>
      </div>


  </div>
    <h3 class="text-center text-white" v-else>
      Сеанса с таким ID = {{$route.params.ids}} нет.
  </h3>
</template>

<script>
import {ref, onMounted, computed, reactive} from 'vue'
import {useRoute, useRouter} from 'vue-router'
import { useStore } from "vuex";
import {currency, date} from "../../../Admin_Portal/use/currency"
import  AppLoader from '../../../Admin_Portal/ui/AppLoader.vue'
import Hall from '../../../Admin_Portal/hall/Hall.vue'

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
        const session = ref({})
        const cinema = ref([])
        const info = ref()
        const bookTickets = ref([])
        const error = ref(false)
        const dateChosen = ref()
        const sum = ref(0)
        const isBooked = ref(false)
        const authErrorMessage = ref(false)
        const bookedTickets = ref()

        onMounted(async()=>{
            loading.value = true
            session.value = await store.dispatch('gettingInfo/loadByID',{
                rType:'sessions',
                id:route.params.ids,
            },)
             document.title = `Сеанс "${session.value.sessionFilmName}" `

             await store.dispatch('gettingInfo/load',{
                rType:'cinemas',
            },)  
             await store.dispatch('gettingInfo/load',{
                rType:'films',
            },)           
             


            
            loading.value = false

        })

               const cinemas = computed(()=> store.getters['gettingInfo/cinemas'])
               const findOut = ()=>{
                //    console.log(cinemas.value);
                //    console.log(session.value);

                //    val[session.hallnumber]
                   cinema.value = cinemas.value.find(cinema=>{
                       if(cinema.cinemaName===session.value.chosenCinemaName){
                           return cinema
                       }
                       })
                       info.value = cinema.value.val[session.value.hallnumber]
                    // console.log(info.value);
                    // console.log();
               }
                const film = ref({})
                const keyToChange = ref(0)
                const films = computed(()=> store.getters['gettingInfo/films'])
                const checkDates = (event)=>{
                    film.value = films.value.find(film =>{
                   if(session.value.sessionFilmName === film.filmName) {
                        return film
                   }
                })
                if(new Date(event)<new Date(film.value.finishTime).getTime() && new Date(event)>new Date(film.value.startTime).getTime()){
                    error.value=false
                    keyToChange.value++

                }else{
                    error.value = true
                    keyToChange.value = 0
                }

                
                }

  

               const bookPlace = (event)=>{
                   bookTickets.value = event
                //    console.log(bookTickets.value);
               }

               const buyTickets = async()=>{
                if(store.getters['authClient/isAuthenticated']){
                    console.log('бронь мест', bookTickets.value)
                     for (let value of bookTickets.value) {
                         value.forEach(elem=>{
                            //  console.log(elem);
                             if(elem.type ==='vipPl')
                                sum.value+=Number.parseFloat(session.value.pricesVPl)
                             if(elem.type ==='couplePl')
                                sum.value+=Number.parseFloat(session.value.pricesCPl)
                             if(elem.type ==='simplePl')
                                sum.value+=Number.parseFloat(session.value.pricesSPl)
                             })
                     }
                    // console.log(sum.value);
                    // console.log('К оплате', currency(sum.value));
                    // sum.value=0
                    isBooked.value = true
                    bookedTickets.value = info.value
                    info.value = {}
                }
                else{
                    authErrorMessage.value = true
                    // console.log('Пожалуйста, ввойдите в аккаунт или зарегистрируйстесь')
                }
            //     await store.dispatch('gettingInfo/buyTickets',{
            //     rType:'orders',
            //     info:bookTickets.value,
            // },)
            // await store.dispatch('gettingInfo/load',{
            //     rType:'cinemas',
            // },)

        }


        return{
            loading,

            session,
            film,
            id:route.params.ids,

            findOut,
            info,

            bookPlace,
            bookTickets,
            buyTickets,

            currency,
            // date,
            dateChosen,
            checkDates,
            error,
            keyToChange,
            sum,
            isBooked,
            // days

            authErrorMessage,

            bookedTickets

        }
    }
}
</script>

<style scoped>
    small{
        color:red;
    }
    .row{
        text-align:center;
    }
    .sessionT{
      list-style-type: none;    
      }
    .bookTicket {
    text-align: center;
    }
    .hall{
        text-align: center;
    }
    button{
        font-size:16px;
    }
</style>