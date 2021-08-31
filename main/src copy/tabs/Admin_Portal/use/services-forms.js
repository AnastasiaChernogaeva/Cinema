import { computed, watch } from "vue";
import * as yup from 'yup';
import { useField, useForm } from "vee-validate";
import { useStore } from "vuex";
import { useRouter } from "vue-router";

export function useServicesForms(func){

    const store = useStore()
    const router = useRouter()
    const {handleSubmit, isSubmitting, } = useForm()

      const {value:addServices, errorMessage:asError, handleBlur:asBlur} = useField('addServices',yup
        .string()
        .trim()
        .required('Это обязательное поле! Пожалуйста, введите название услуги.'))

    const {value:addServicesPrice, errorMessage:priceError, handleBlur:priceBlur} = useField('addServicesPrice', yup
        .string()
        .trim()
        .required('Это обязательное поле! Пожалуйста, введите цену.')
        .test(
            "Проверка на положительно число",
            'Введите число!', 
            (value) => value >=0
          )
        )

        const onSubmit = handleSubmit(func)


        return{
            addServicesPrice,
            priceError,
            priceBlur,
            addServices,
            asError,
            asBlur,
            onSubmit,
            isSubmitting
        }

};