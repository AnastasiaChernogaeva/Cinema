
<template>
         <form class="card" @submit.prevent="onSubmit"  > 



        <div :class="['form-control', ]"> 
                <label for="cityName">Город</label>
                <select  id="cityName" v-model="cityName">
                  <option value="spb">Санкт-Петербург</option>
                  <option value="msk">Москва</option>
                  <option value="kzn">Казань</option>
                  <option value="nsk">Новосибирск</option>
                       <!-- <option v-for="city of cities" value="city.value" >{{city.name}}</option> -->
                </select>

      </div>


    <div :class="['form-control']"> 
                <label for="chosenCinemaName">Кинотеатр</label>

<!-- cinemas=[{name:"Hey,Lee!", value:"hle",}, {name:"Voka!", value:"vka",}] -->
        <select  id="chosenCinemaName" v-model="chosenCinemaName">
        <option value="msk">Москва</option>
       <option value="kzn">Казань</option>
       <option value="nsk">Новосибирск</option>
                          <!-- <option v-for="cinema of cinemas" value="cinema.value" >{{cinema.name}}</option> -->
        </select>

      </div>

      
        <div :class="['form-control', ]"> 
                <label for="cityName">Фильм</label>
                <select  id="sessionFilmName" v-model="sessionFilmName">
                  <option value="wlf">Wolf</option>
                  <option value="msk">Москва</option>
                       <!-- <option v-for="film of films" value="film.value" >{{film.name}}</option> -->
                </select>

      </div>

      <div :class="['form-control', ]"> 
                <label for="hallnumber">Номер зала</label>
                <select  id="hallnumber" v-model="hallnumber">
                  <option value="wlf">Wolf</option>
                  <option value="msk">Москва</option>
                       <!-- <option v-for="film of films" value="film.value" >{{film.name}}</option> -->
                </select>

      </div>
<!-- Подумать, как установить цену для мест -->
            <div :class="['form-control', ]"> 
                <label for="places">Места</label>
                <select  id="places" v-model="places" >
                  <option value="wlf">Wolf</option>
                  <option value="msk">Москва</option>
                       <!-- <option v-for="film of films" value="film.value" >{{film.name}}</option> -->
                </select>

      </div>

            <div :class="['form-control', ]"> 
                <label for="chosenAddServices">Дополнительные услуги</label>
                <select  id="chosenAddServices" v-model="chosenAddServices">
                  <option value="chosenAddServices">chosenAddServices</option>
                  <option value="msk">Москва</option>
                       <!-- <option v-for="service of services" value="service.value" >{{service.name}}</option> -->
                </select>

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
                <small class >Учтите время работы кинотеатра( рабочие часы: 10:00 - 24:00 )</small>
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
import { useSessionsForm} from "../../use/sessions-forms";

export default {
    setup(){
     return{
        ...useSessionsForm()
     }
    }

}
</script>

<style>

</style>

