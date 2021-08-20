import { computed, watch } from "vue";
import * as yup from 'yup';
import { useField, useForm } from "vee-validate";
import { useStore } from "vuex";
import { useRouter } from "vue-router";


export function useCinemasForms(func){

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


    const onSubmit = handleSubmit(func)


        return{
            city, cityError, cityBlur,
            cinemaName, cinemaError, cinemaBlur,
            hallamount, hallamountError, hallamountBlur, onSubmit,isSubmitting
            // filmName, fnError, fnBlur,
        }

};