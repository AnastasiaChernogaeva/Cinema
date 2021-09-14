import { computed, watch, ref } from "vue";
import * as yup from 'yup';
import { useField, useForm } from "vee-validate";
import { useStore } from "vuex";
import { useRouter } from "vue-router";
import firebase from 'firebase/app'
import 'firebase/storage'


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

    const {value:movieposter, errorMessage:mpError,handleBlur:mpBlur } = useField('movieposter', yup.string().required('Выберите изображение')
        )

    const {value:genre, errorMessage:gError, handleBlur:gBlur} = useField('genre', yup
        .string()
        .trim()
        .required('Это обязательное поле! Пожалуйста, введите жанр фильма.'))

    // const movieposter = ref()
    const onFileChoose = async (e) => {
        const file = e.target.files[0]
        const storageRef = firebase.storage().ref()
        const fileRef = storageRef.child(file.name)
        await fileRef.put(file)
        let imageUrl = await fileRef.getDownloadURL() 
        movieposter.value = `${imageUrl}`
        mpBlur()
        console.log(movieposter.value);
    }
       
        const onSubmit = handleSubmit(func)


        return{
            finishTime, ftimeError, ftimeBlur,
            startTime, stimeError, stimeBlur,
            filmDescription, descError, descBlur,
            filmName, fnError, fnBlur,
            movieposter, 
            mpError,
            //  mpBlur,
            genre, gError, gBlur,
            onSubmit,isSubmitting,
            onFileChoose
        }

};