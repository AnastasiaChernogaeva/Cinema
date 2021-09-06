<template>
<!-- <div class="card">{{info}}</div> -->
     <form class="card" @submit.prevent="submit"  >  
         <div :class="['form-control', ]">  
                <label for="cityName">Город</label>
                <!-- <select  id="cityName" v-model="cityName"   v-if="chosenCinemaName">
                      <option default selected>Выберите город</option>
                       <option v-for="(cinema,idx) of info.cinemas" :value="cinema.city" :key="idx" >{{ chosenCinemaName.includes(cinema.cinemaName)?cinema.city:null}}</option> v-else
                </select> -->
                <select  id="cinemaName" v-model="cityName">
                      <option default selected>Выберите город</option>
                       <option v-for="(cinema,idx) of info.cinemas" :value="cinema.city" :key="idx" >{{cinema.city}}</option>
                </select>
         </div>

          <div :class="['form-control', ]">  
                <label for="cinemaName">Кинотеатр</label>
                <select  id="cinemaName" v-model="chosenCinemaName" v-if="cityName"  >
                      <option default selected>Выберите кинотеатр</option>
                       <option v-for="(cinema,idx) of info.cinemas" :value="cinema.cinemaName" :key="idx" >{{ cityName.includes(cinema.city)?cinema.cinemaName:null}}</option>
                </select>
                <select  id="cinemaName" v-model="chosenCinemaName" v-else>
                      <option default selected>Выберите кинотеатр</option>
                       <option v-for="(cinema,idx) of info.cinemas" :value="cinema.cinemaName" :key="idx" >{{cinema.cinemaName}}</option>
                </select>
         </div>
          <div :class="['form-control', ]" v-if="chosenCinemaName">  
                <label for="hallnumber">Зал</label>
                <select  id="hallnumber" v-model="hallnumber" @focus="chosen"  @change="showHall">
                  
                       <option v-for="(hall,idx) of halls " :value="hall" :key="idx" >{{idx+1}}</option>
                </select>
         </div>
         <div v-if="hallInfo!=={} && hallnumber" >
         <hall :info="hallInfo" :key="newOne"></hall>

              <div :class="['form-control', ]" v-if="couplePl"> 
              <label for="pricesCPl" >Цены на места для парочек</label>
                     <input
                            type="string"
                            id="pricesCPl"
                            v-model="pricesCPl"
                     >
              
           </div>
           <div :class="['form-control', ]" v-if="vipPl"> 
              <label for="pricesVPl" >Цены на VIP места</label>
                     <input
                            type="string"
                            id="pricesVPl"
                            v-model="pricesVPl"
                     >
              
           </div>
           <div :class="['form-control', ]" v-if="simplePl"> 
              <label for="pricesSPl" >Цены на обычные места </label>
                     <input
                            type="string"
                            id="pricesSPl"
                            v-model="pricesSPl"
                     >
             
           </div>

   </div>
         

          <div :class="['form-control', ]">  
                <label for="film">Фильм</label>
                <select  id="film" v-model="sessionFilmName"  >
                       <option v-for="(film,idx) of info.films" :value="film.filmName" :key="idx" >{{film.filmName}}</option>
                </select>
         </div>

         
<div class="form-checkbox">

  <span class="label">Дополнительные услуги</span> 
<!-- @change="serVices" -->
   <div class="checkbox" v-for="(service,idx) of info.services" :key="idx" @change="serVices" >
    <label><input type="checkbox" name="chosenAddServices" v-model="chosenAddServices" :value="service.addServices"  />{{service.addServices}}</label>
  </div>

</div>



        <div :class="['form-control', {'invalid':startSessionTimeError},]"> 
                <label for="startSessionTime">Время начала сеанса</label>
                <input
                    min="10:00" max="22:00"
                    type="time"
                    id="startSessionTime"
                    v-model="startSessionTime"
                    @blur="startSessionTimeBlur"
                >
                <small style="color:green;" >Учтите время работы кинотеатра( рабочие часы: 10:00 - 24:00 )</small>
                <small v-if="startSessionTimeError">{{startSessionTimeError}}</small>
  </div> 
<!-- v-if="!cinemasCity.includes(cinema.city) && cinemasCity.push(cinema.city)" -->
            <button class="btn primary" type="submit" :disabled="isSubmitting" >Добавить</button>      

        </form> 
</template>

<script>
import { ref, onMounted, reactive, computed, } from "vue";
import * as yup from 'yup';
import { useField, useForm } from "vee-validate";
import { useStore } from "vuex";
import { useRouter } from "vue-router";

// import { useStore } from 'vuex';
// import { useSessionsForms } from "../../use/sessions-forms";
import Hall from "../../hall/Hall.vue";

export default {
  components:{
    Hall,
  },
    emits:['added'],
    setup( _, {emit},){
  const store = useStore()
    const router = useRouter()
    // const {handleSubmit, isSubmitting, } = useForm({
    //   initialErrors:{

    //   }
    // })handleSubmit,
    const { isSubmitting, } = useForm()

      const {value:chosenCinemaName,} = useField('chosenCinemaName',yup.string()
      )
      const {value:cityName,} = useField('cityName',yup.string()
      )

     const {value:sessionFilmName,} = useField('sessionFilmName',yup.string()
      )

    //  const {value:chosenAddServices,} = useField('chosenAddServices',yup.array()
    //   )
    const {value:hallnumber, errorMessage:hError, handleBlur:Blur} = useField('hallnumber',yup.number()
      )
      
    // const {value:places,} = useField('places',yup.string()
      // )
    const {value:startSessionTime, errorMessage:startSessionTimeError, handleBlur:startSessionTimeBlur} = useField('startSessionTime', yup
        .string()
        .trim()
        .required('Это обязательное поле! Пожалуйста, введите время начала сеанса.')
        )
      const chosenAddServices = ref([])
      // chosenAddServices.yup.oneOf()
  //     const {value:chosenAddServices,} = useField('chosenAddServices',yup.array()
  //     .default([])
  // );
      const serVices=()=>{
          console.log('chosenAddservices',chosenAddServices.value);
      }
   


        // const onSubmit = handleSubmit(func)
        const arr = ref(['films', 'services', 'cinemas',])
        const cinemasCity = ref([])
        const info = ref({})

        onMounted(async ()=>{
          await store.dispatch('requests/loadAll', arr.value );
        }) 
         setTimeout(()=> {  
          const cinemas =  store.getters['requests/cinemas']
          const films =  store.getters['requests/films']
          const services =  store.getters['requests/services']
          // console.log(  cinemas);
          info.value['cinemas'] =  cinemas
          info.value['films'] = films
          info.value['services'] = services
          // console.log( info.value.cinemas.forEach(cinema=>cinema.cinemaName==='Lovi_Movie'?halls.value=cinema.val:null))
          // console.log(halls.value);
          },2000)


        
         
        //   const cinemas = computed(()=>store.getters['requests/cinemas'])
        //   const films =  computed(()=>store.getters['requests/films'])
        //   const services =  computed(()=>store.getters['requests/services'])

        //   info.value['cities'] =  cinemas.value.map(cinema=> cinema.city)
        //   info.value['cinemaNames'] =  cinemas.value.map(cinema=> cinema.cinemaName)
        //   info.value['cinemas'] =  cinemas.value
        //   info.value['films'] = films.value
        //   info.value['services'] = services.value

        const halls=ref({})
        const hallInfo = reactive({})
        const newOne = ref(0)
        const couplePl = ref([])
        const simplePl = ref([])
        const vipPl = ref([])
        const pricesCPl = ref()
        const pricesSPl = ref()
        const pricesVPl = ref()





        const chosen = ()=>{
          info.value.cinemas.forEach(cinema=>cinema.cinemaName===chosenCinemaName.value?halls.value=Object.keys(cinema.val):null)
         }
      const showHall = ()=>{
          info.value.cinemas.forEach(cinema=>{
            if(cinema.cinemaName===chosenCinemaName.value){
              halls.value.forEach(id=>id===hallnumber.value?hallInfo.value={'val':cinema.val[id], 'id':id}:null)
              newOne.value+=1
              couplePl.value=hallInfo.value.val.couplePl
              simplePl.value=hallInfo.value.val.simplePl
              vipPl.value=hallInfo.value.val.vipPl
              
            }
          })}
         
          const submit = async () =>{
            const v={'pricesCPl':pricesCPl.value,'pricesSPl':pricesSPl.value,'pricesVPl':pricesVPl.value, 'chosenAddServices':chosenAddServices.value, 'startSessionTime':startSessionTime.value, 'hallnumber':hallnumber.value, 'sessionFilmName':sessionFilmName.value, 'cityName':cityName.value, 'chosenCinemaName':chosenCinemaName.value, }
            console.log('VALUES',v)
            await store.dispatch('requests/create',{'value':v, 'rType':'sessions', } );
            emit('added')
        }


        return{
            couplePl, simplePl, vipPl,
            newOne,
            chosen,showHall,
            info,
            halls,hallInfo,
            cinemasCity,chosenAddServices,chosenCinemaName,cityName, sessionFilmName,
            chosenAddServices,
            hallnumber, 
            submit,
             isSubmitting,
            startSessionTime, startSessionTimeBlur, startSessionTimeError, 
            serVices,
            pricesCPl,pricesSPl,pricesVPl,
        }
       //      return{
       //          ...useSessionsForms()   
                 
       //      }
    }

}
</script>

<style>

</style>