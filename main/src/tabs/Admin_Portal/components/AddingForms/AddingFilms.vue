<template>
         <form class="card" @submit.prevent=""  >  
        <div :class="['form-control', {'invalid':fnError},]"> 
                <label for="filmName">Название</label>
                <input
                    type="text"
                    id="filmName"
                    v-model="filmName"
                    @blur="fnBlur"
                >
                <small v-if="fnError">{{fnError}}</small>
      </div>

        <div :class="['form-control', {'invalid':descError},]"> 
                <label for="filmDescription">Описание</label>
                <input
                    type="text"
                    id="filmDescription"
                    v-model="filmDescription"
                    @blur="descBlur"
                >
                <small v-if="descError">{{descError}}</small>
  </div>

  
  <div :class="['form-control', {'invalid':stimeError},]"> 
                <label for="startTime">Описание</label>
                <input
                    type="date"
                    id="startTime"
                    v-model="startTime"
                    @blur="stimeBlur"
                >
                <small v-if="stimeError">{{stimeError}}</small>
  </div>

          <div :class="['form-control', {'invalid':ftimeError},]"> 
                <label for="finishTime">Название</label>
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
        const {handleSubmit, isSubmitting, submitCount} = useForm()

          const {value:filmName, errorMessage:fnError, handleBlur:fnBlur} = useField('filmName',yup
            .string()
            .trim()
            .required('Это обязательное поле! Пожалуйста, введите название фильма.'))

        const {value:filmDescription, errorMessage:descError, handleBlur:descBlur} = useField('filmDescription', yup
            .string()
            .trim()
            .required('Это обязательное поле! Пожалуйста, введите описание фильма.'))

        const {value:startTime, errorMessage:stimeError, handleBlur:stimeBlur} = useField('startTime',yup
            .string()
            .trim()
            .required('Это обязательное поле! Пожалуйста, введите начала показа.'))

        const {value:finishTime, errorMessage:ftimeError, handleBlur:ftimeBlur} = useField('finishTime', yup
            .string()
            .trim()
            .required('Это обязательное поле! Пожалуйста, введите окончание показа.'))


            return{
                finishTime, ftimeError, ftimeBlur,
                startTime, stimeError, stimeBlur,
                filmDescription, descError, descBlur,
                filmName, fnError, fnBlur,
            }
    }

}
</script>

<style>

</style>