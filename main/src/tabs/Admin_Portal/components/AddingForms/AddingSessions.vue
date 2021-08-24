
<template>
         <form class="card" @submit.prevent="onSubmit"  > 
        <div :class="['form-control', ]"> 
                <label for="cityName">Город</label>
                <select  id="cityName" v-model="cityName">
                  <!-- <option value="spb">Санкт-Петербург</option>
                  <option value="msk">Москва</option>
                  <option value="kzn">Казань</option>
                  <option value="nsk">Новосибирск</option> -->
                       <option v-for="(key,idx) of cinemas" value="key.city" :key="idx" >{{key.city}}</option>
                </select>

      </div>


    <div :class="['form-control']"> 
                <label for="chosenCinemaName">Кинотеатр</label>

<!-- cinemas=[{name:"Hey,Lee!", value:"hle",}, {name:"Voka!", value:"vka",}] -->
        <select  id="chosenCinemaName" v-model="chosenCinemaName">
        <!-- <option value="msk">Москва</option>
       <option value="kzn">Казань</option>
       <option value="nsk">Новосибирск</option> -->
                          <option v-for="(key,idx) of cinemas" value="key.city" :key="idx">{{key.cinemaName}}</option>
        </select>

      </div>

      
        <div :class="['form-control', ]"> 
                <label for="cityName">Фильм</label>
                <select  id="sessionFilmName" v-model="sessionFilmName">
                  <!-- <option value="wlf">Wolf</option>
                  <option value="msk">Москва</option> -->
                       <option v-for="(key,idx) of films" value="key.city" :key="idx" >{{key.filmName}}</option>
                </select>

      </div>

      <div :class="['form-control', ]"> 
                <label for="hallnumber">Номер зала</label>
                <select  id="hallnumber" v-model="hallnumber">
                  <!-- <option value=1>1</option>
                  <option value=2>2</option> -->
                       <option v-for="(key,idx) of cinemas" value="idx+1" :key="idx" >{{idx+1}}</option>
                </select>

      </div>
<!-- Подумать, как установить цену для мест -->
            <!-- <div :class="['form-control', ]"> 
                <label for="places">Места</label>
                <select  id="places" v-model="places" >
                  <option value="wlf">Wolf</option>
                  <option value="msk">Москва</option> -->
                       <!-- <option v-for="film of films" value="film.value" >{{film.name}}</option> -->
                <!-- </select>

      </div> -->

            <!-- <div :class="['form-control', ]"> 
                <label for="chosenAddServices">Дополнительные услуги</label>
                <select  id="chosenAddServices" v-model="chosenAddServices">
                  <option value="chosenAddServices">chosenAddServices</option>
                  <option value="msk">Москва</option>
                       <option v-for="service of services" value="service.value" >{{service.name}}</option> -->
                <!-- </select>

      </div> --> 

<!-- <div class="form-checkbox">

  <span class="label">Дополнительные услуги</span> -->

   <!-- <div class="checkbox" v-for>
    <label><input type="checkbox" name="skills" v-model="skills" value="Vuex"/> pop-corn</label>
  </div> -->
<!-- 
  <div class="checkbox">
    <label><input type="checkbox" name="AddServices" v-model="chosenAddServices" value="Vuex"/> pop-corn</label>
  </div>

  <div class="checkbox">
    <label><input type="checkbox" name="AddServices" v-model="chosenAddServices" value="vue CLI"/> coca</label>
  </div>

  <div class="checkbox">
    <label><input type="checkbox" name="AddServices" v-model="chosenAddServices" value="Vue router"/> sprite</label>
  </div>

</div> -->



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

  
        <!-- <div :class="['form-control', {'invalid':finishSessionTimeError},]"> 
                <label for="finishSessionTime">Время окончания сеанса</label>
                <input
                    type="time"
                    id="finishSessionTime"
                    v-model="finishSessionTime"
                    @blur="finishSessionTimeBlur"
                >
                <small v-if="finishSessionTimeBlur">{{finishSessionTimeBlur}}</small>
  </div> -->

  
  <button class="btn primary" type="submit" :disabled="isSubmitting" >Добавить</button>      

        </form> 
</template>

<script>
import {ref,onMounted, onUpdated} from 'vue'
import { useStore } from 'vuex';
import { useSessionsForms } from "../../use/sessions-forms";

export default {
    emits:['added'],
    setup( _, {emit},){
        const store = useStore()
        const cityName = ref()
        const chosenCinemaName = ref()
        const sessionFilmName = ref()
        const hallnumber = ref()
        const startSessionTime = ref()
        const places = ref([])

        const films = ref()
        const cinemas = ref()
        const services = ref()



        onMounted(
        //   async ()=>{
        //   allInfo.value = await store.dispatch('requests/loadAll')
        //   console.log(allInfo.value);
        // }
        ()=>{
          films.value = store.getters['requests/films']
          cinemas.value = store.getters['requests/cinemas']
          services.value = store.getters['requests/services']
          console.log(films.value,cinemas.value, services.value);
        },
        )
          
        
        // onUpdated(
        // //   async ()=>{
        // //   allInfo.value = await store.dispatch('requests/loadAll')
        // //   console.log(allInfo.value);
        // // }
        // )
          

        const submit = async values =>{
            await store.dispatch('requests/create',{'value':values, 'rType':'sessions',});
            console.log(values);
            emit('added')
        }  

        return{
          // allInfo,
          places, startSessionTime, hallnumber, sessionFilmName, chosenCinemaName, cityName,
            ...useSessionsForms(submit),
        films, cinemas, services,
        }
    
    }
}
</script>

<style>

</style>

