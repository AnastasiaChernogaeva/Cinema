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
import { useStore } from 'vuex';
import { useSessionsForms } from "../../use/sessions-forms";
import Hall from "../../hall/Hall.vue";

export default {
  components:{
    Hall,
  },
    emits:['added'],
    setup( _, {emit},){
        const store = useStore()
 
       //  const submit = async () =>{
       //      const v={'pricesCPl':pricesCPl,'pricesSPl':pricesSPl,'pricesVPl':pricesVPl, 'chosenAddServices':chosenAddServices, 'startSessionTime':startSessionTime, 'hallnumber':hallnumber, 'sessionFilmName':sessionFilmName, 'cityName':cityName, 'chosenCinemaName':chosenCinemaName, }
       //      console.log('VALUES',v)
       //      await store.dispatch('requests/create',{'value':v, 'rType':'sessions', } );
       //      emit('added')
       //  }
            return{
                ...useSessionsForms()   
                 
            }
    }

}
</script>

<style>

</style>