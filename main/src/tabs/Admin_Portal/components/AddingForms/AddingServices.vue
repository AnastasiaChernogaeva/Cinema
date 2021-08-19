<template>
      <form class="card" @submit.prevent=""  >  
        <div :class="['form-control', {'invalid':asError},]"> 
                <label for="addServices">Название</label>
                <input
                    type="text"
                    id="addServices"
                    v-model="addServices"
                    @blur="asBlur"
                >
                
              

                <small v-if="asError">{{asError}}</small>
        </div>

  
  <div :class="['form-control', {'invalid':priceError},]"> 
                <label for="addServicesPrice">Цена</label>
                <input
                    type="number"
                    id="addServicesPrice"
                    v-model="addServicesPrice"
                    @blur="priceBlur"
                >
                
              

                <small v-if="priceError">{{priceError}}</small>
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

          const {value:addServices, errorMessage:asError, handleBlur:asBlur} = useField('addServices',yup
            .string()
            .trim()
            .required('Это обязательное поле! Пожалуйста, введите название услуги.'))

        const {value:addServicesPrice, errorMessage:priceError, handleBlur:priceBlur} = useField('addServicesPrice', yup
            .string()
            .trim()
            .required('Это обязательное поле! Пожалуйста, введите цену.'))


            return{
                addServicesPrice,
                priceError,
                priceBlur,
                addServices,
                asError,
                asBlur,
            }
    }

}
</script>

<style>

</style>