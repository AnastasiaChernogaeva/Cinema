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
          <li><b>Дополнительные услуги:</b>&nbsp;
            <span v-if="session.chosenAddServices && session.chosenAddServices.length>0"> <span v-for="(oneservice, idx) of session.chosenAddServices" v-bind:key="idx">{{oneservice}};&nbsp;</span></span>
          <span v-else>Нет</span>
          </li>

         
       </ul>
      <p><b> Выберите дату:</b>&nbsp;<input type="date"   :value="dateChosen" @change="ch" :max="film.finishTime" :min="film.startTime"> </p>

      <hr/>
      <button class="btn" @click="findOut" v-if="!info" :disabled="!dateChosen">Выбрать места</button>
      <hall class="hall" v-if="info" :info="info={'val':{...info}, id:session.hallnumber,}"  :book="isBooked" 
      @choosePlace="bookPlace"></hall> 
      <div v-if="info && bookTickets">
      <div :class="[{'bookTicket':bookTickets}, ]" v-if="bookTickets.length!=0">
          <h2>Забронировать билеты</h2>
          <div v-for="(bookTicket, idx) of bookTickets" :key="idx">
              <div v-for="(rowPlaces, id) of bookTicket" :key="id">
                  <div>
                      <h3><b>{{session.sessionFilmName}}</b></h3>
                      <h4><b>Дата:</b>&nbsp;{{date(dateChosen)}}</h4>
                      <h4><b>Время:</b>&nbsp;{{session.startSessionTime}}</h4>
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

            <!-- <div v-if=" boughtTickets">
      <div :class="[{'bookTicket':boughtTickets}, ]" v-if="boughtTickets.length!=0">
          <h2>Ваши билеты</h2>
          <div v-for="(bookTicket, idx) of boughtTickets" :key="idx">
              <div v-for="(rowPlaces, id) of boughtTickets" :key="id">
                  <div>
                      <h3><b>{{session.sessionFilmName}}</b></h3>
                      <h4><b>Дата:</b>&nbsp;{{date(dateChosen)}}</h4>
                      <h4><b>Время:</b>&nbsp;{{session.startSessionTime}}</h4>
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
         <p>К оплате {{currency(sumTickets)}}</p>

        </div>
    </div> -->
      </div>

    <h3 class="text-center text-white" v-else>
      Сеанса с таким ID = {{$route.params.ids}} нет.
  </h3>
</template>

<script>
import {ref, onMounted, computed,} from 'vue'
import {useRoute, useRouter} from 'vue-router'
import { useStore } from "vuex";
import {currency, } from "../../../Admin_Portal/use/currency"
import { date } from "../../../Admin_Portal/use/date";
import  AppLoader from '../../../Admin_Portal/ui/AppLoader.vue'
import Hall from '../../../Admin_Portal/hall/Hall.vue'

export default {
      components:{
        AppLoader,
        Hall,
    },
    setup(_,{emit}){
        const route = useRoute()
        const router = useRouter()
        const store = useStore()
        const loading = ref(false)
        const session = ref({})
        const cinema = ref([])
        const info = ref()
        const bookTickets = ref([])
        const dateChosen = ref()
        const sum = ref(0)
        const sumTickets = ref(0)
        const isBooked = ref(false)
        const authErrorMessage = ref(false)
        const boughtTickets = ref()
        const film = ref({})
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
             
            await store.dispatch('gettingInfo/load',{
                rType:'films',
            },)           
              const films = computed(()=> store.getters['gettingInfo/films'])
              film.value = films.value.find(filmO =>{
                                    if(session.value.sessionFilmName === filmO.filmName) {
                                        return filmO
                                    }
                            } )

            
            loading.value = false

        })

               const cinemas = computed(()=> store.getters['gettingInfo/cinemas'])
               const findOut = ()=>{
                   cinema.value = cinemas.value.find(cinema=>{
                       if(cinema.cinemaName===session.value.chosenCinemaName){
                           return cinema
                       }
                       })
                       info.value = cinema.value.val[session.value.hallnumber]
               }


           

               const bookPlace = (event)=>{
                   bookTickets.value = event
               }

               const buyTickets = async()=>{
                if(store.getters['authClient/isAuthenticated']){
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
                    isBooked.value = true
                    boughtTickets.value = bookTickets.value
                    // bookTickets.value = []
                    // sumTickets.value = sum.value
                    // sum.value = 0
                    // console.log('boughtTickets', );

                     await store.dispatch('gettingInfo/buyTickets',{
                            rType:'orders',
                            info:{places:Array.from(boughtTickets.value), date:dateChosen.value, dateToBuy:`${new Date().getFullYear()}-${new Date().getMonth()+1>9?new Date().getMonth()+1:'0'+(new Date().getMonth()+1)}-${new Date().getDate()>9?new Date().getDate():'0'+new Date().getDate()}`,sessionId:route.params.ids, sum:sum.value}
                    },)

                    setTimeout(()=> {
                        if(route.path.includes('cinema/session'+route.params.ids)){
                             router.push('/cinemaMain/uorders')
                            //  console.log('I have worked out');
                        }
                        // else
                            //  console.log("I won't work out");

                       
                        },1000)

                }
                else{
                    authErrorMessage.value = true
                }

        }


        const ch = (event)=>{
            dateChosen.value=event.target.value
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
            dateChosen,
            ch,
            sum,
            isBooked,

            authErrorMessage,

            boughtTickets,
            sumTickets,
            date

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