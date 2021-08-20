import { computed, watch } from "vue";
import * as yup from 'yup';
import { useField, useForm } from "vee-validate";
import { useStore } from "vuex";
import { useRouter } from "vue-router";


export function useFilmsForms(func){

    const store = useStore()
    const router = useRouter()
    const {handleSubmit, isSubmitting} = useForm()

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

    const {value:movieposter, errorMessage:mpError, handleBlur:mpBlur} = useField('movieposter', yup
        .string()
        .trim()
        .required('Это обязательное поле! Пожалуйста, введите url картинки.'))

        
        const onSubmit = handleSubmit(func)


        return{
            finishTime, ftimeError, ftimeBlur,
            startTime, stimeError, stimeBlur,
            filmDescription, descError, descBlur,
            filmName, fnError, fnBlur,
            movieposter, mpError, mpBlur,
            onSubmit,isSubmitting
        }

};