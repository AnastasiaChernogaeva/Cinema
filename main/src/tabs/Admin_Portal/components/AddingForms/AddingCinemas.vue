<template>
         <form class="card" @submit.prevent=""  >  
        <div :class="['form-control', {'invalid':cityError},]"> 
                <label for="filmName">Город</label>
                <input
                    type="text"
                    id="city"
                    v-model="city"
                    @blur="cityBlur"
                >
                <small v-if="cityError">{{cityError}}</small>
      </div>

        <div :class="['form-control', {'invalid':Error},]"> 
                <label for="cinemaName">Название кинотеатра</label>
                <input
                    type="text"
                    id="cinemaName"
                    v-model="cinemaName"
                    @blur="cinemaBlur"
                >
                <small v-if="cinemaError">{{cinemaError}}</small>
  </div>

  
  <div :class="['form-control', {'invalid':hallamountError},]"> 
                <label for="hallamount">Количество залов</label>
                <input
                    type="number"
                    id="hallamount"
                    v-model="hallamount"
                    @blur="hallamountBlur"
                >
                <small v-if="hallamountError">{{hallamountError}}</small>
  </div>

          <div :class="['form-control',]" v-if="hallamount > 0"> 
                <label for="finishTime">План зала(ов)</label>
                <input
                    type="date"
                    id="finishTime"
                    v-model="finishTime"
                    @blur="ftimeBlur"
                >
                <small v-if="ftimeError">{{ftimeError}}</small>
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
        const {handleSubmit, isSubmitting, } = useForm()

          const {value:city, errorMessage:cityError, handleBlur:cityBlur} = useField('city',yup
            .string()
            .trim()
            .required('Это обязательное поле! Пожалуйста, введите название города.'))

        const {value:cinemaName, errorMessage:cinemaError, handleBlur:cinemaBlur} = useField('cinemaName', yup
            .string()
            .trim()
            .required('Это обязательное поле! Пожалуйста, введите название кинотеатра.'))

        const {value:hallamount, errorMessage:hallamountError, handleBlur:hallamountBlur} = useField('hallamount',yup
            .string()
            .trim()
            .required('Это обязательное поле! Пожалуйста, введите количество залов.')
            .min(0,'Введите количество залов')
            )

            // Добавить план залов(количество рядов, мест, виды мест и т.д.)

        // const {value:finishTime, errorMessage:ftimeError, handleBlur:ftimeBlur} = useField('finishTime', yup
        //     .string()
        //     .trim()
        //     .required('Это обязательное поле! Пожалуйста, введите окончание показа.'))


            return{
                city, cityError, cityBlur,
                cinemaName, cinemaError, cinemaBlur,
                hallamount, hallamountError, hallamountBlur,
                // filmName, fnError, fnBlur,
            }
    }

}
</script>

<style>

</style>