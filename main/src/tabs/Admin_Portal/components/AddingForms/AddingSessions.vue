
<template>
         <form class="card" @submit.prevent=""  > 



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
                    type="time"
                    id="startSessionTime"
                    v-model="startSessionTime"
                    @blur="startSessionTimeBlur"
                >
                <small v-if="startSessionTimeError">{{startSessionTimeError}}</small>
  </div>

  
        <div :class="['form-control', {'invalid':finishSessionTimeError},]"> 
                <label for="finishSessionTime">Время окончания сеанса</label>
                <input
                    type="time"
                    id="finishSessionTime"
                    v-model="finishSessionTime"
                    @blur="finishSessionTimeBlur"
                >
                <small v-if="finishSessionTimeBlur">{{finishSessionTimeBlur}}</small>
  </div>

  

         

            <button class="btn primary" type="submit" :disabled="isSubmitting || tooManyAttemptsAmount" >Добавить</button>      

        </form> 
</template>
<script>
import { computed, watch } from "vue";
import * as yup from 'yup';
import { useField, useForm } from "vee-validate";
import { useStore } from "vuex";
import { useRouter } from "vue-router";

export default {
    setup(){
        const store = useStore()
        const router = useRouter()
        const {handleSubmit, isSubmitting, submitCount} = useForm()

          const {value:chosenCinemaName,} = useField('chosenCinemaName',yup.string()
          )
          const {value:cityName,} = useField('cityName',yup.string()
          )

         const {value:sessionFilmName,} = useField('sessionFilmName',yup.string()
          )

         const {value:chosenAddServices,} = useField('chosenAddServices',yup.string()
          )
        const {value:hallnumber,} = useField('hallnumber',yup.string()
          )
          
        const {value:places,} = useField('places',yup.string()
          )
        const {value:startSessionTime, errorMessage:startSessionTimeError, handleBlur:startSessionTimeBlur} = useField('startSessionTime', yup
            .string()
            .trim()
            .required('Это обязательное поле! Пожалуйста, введите время начала сеанса.'))

        
        const {value:finishSessionTime, errorMessage:finishSessionTimeError, handleBlur:finishSessionTimBlur} = useField('startSessionTime', yup
            .string()
            .trim()
            .required('Это обязательное поле! Пожалуйста, введите время окончания сеанса.'))

      


            return{
                chosenCinemaName,
                cityName, sessionFilmName, chosenAddServices,
                hallnumber, places, finishSessionTime,
                startSessionTime, startSessionTimeBlur, startSessionTimeError, finishSessionTimeError,finishSessionTimBlur,
            }
    }

}
</script>

<style>

</style>

