<template>
<!-- <div class="card">{{info}}</div> -->
     <form class="card" @submit.prevent="onSubmit"  >  
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
                <select  id="hallnumber" v-model="hallnumber" @focus="chosen" >
                  
                       <option v-for="(hall,idx) of halls " :value="'id'+(idx+1)" :key="idx" >{{hall[idx+1]}}</option>
                </select>
         </div>
         <!-- <div :class="['form-control', ]" v-if="chosenCinemaName">  @blur="chosen"
                <label for="hallnumber">Зал</label>
                <div class="checkbox" v-for="(hall,idx) of halls " :value="hall" :key="idx">
    <label><input type="checkbox" name="skills" v-model="hallnumber" :value="hall"/>{{hall}}</label>
  </div>
                
         </div> -->
          <div :class="['form-control', ]">  
                <label for="film">Фильм</label>
                <select  id="film" v-model="sessionFilmName"  >
                       <option v-for="(film,idx) of info.films" :value="film.filmName" :key="idx" >{{film.filmName}}</option>
                </select>
         </div>

         
<div class="form-checkbox">

  <span class="label">Дополнительные услуги</span> 

   <div class="checkbox" v-for="(service,idx) of info.services" :key="idx">
    <label><input type="checkbox" name="chosenAddServices" v-model="chosenAddServices" :value="service.addServices"/>{{service.addServices}}</label>
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
import {ref, onMounted, computed} from 'vue'
import { useStore } from 'vuex';
import { useSessionsForms } from "../../use/sessions-forms";

export default {
    emits:['added'],
    setup( _, {emit},){
        const store = useStore()
        // const arr = ref(['films', 'services', 'cinemas',])
        // const cinemasCity = ref([])
        // const info = ref({})

        // onMounted(async ()=>{
        //   await store.dispatch('requests/loadAll', arr.value );
        //   // console.log(res)
        //   // if (res){const res = 
         
        //   // }
        // }) 
        //  setTimeout(()=> {  
        //   const cinemas =  store.getters['requests/cinemas']
        //   const films =  store.getters['requests/films']
        //   const services =  store.getters['requests/services']
        //   console.log(  cinemas);
        //   info.value['cinemas'] =  cinemas
        //   info.value['films'] = films
        //   info.value['services'] = services
        //   // console.log( info.value.cinemas.forEach(cinema=>cinema.cinemaName==='Lovi_Movie'?halls.value=cinema.val:null))
        //   // console.log(halls.value);
        //   },2000)

          // const chosen = ()=>{
          //  info.value.cinemas.forEach(cinema=>cinema.cinemaName==='Lovi_Movie'?halls.value=cinema.val:null)

          // }
          


        const submit = async values =>{
            await store.dispatch('requests/create',{'value':values, 'rType':'sessions', } );
            emit('added')
        }
            return{
              // halls,
              // info,
              // cinemasCity,
                ...useSessionsForms(submit)    
            }
    }

}
</script>

<style>

</style>