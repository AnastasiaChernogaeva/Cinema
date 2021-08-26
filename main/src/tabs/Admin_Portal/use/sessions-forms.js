import { computed, watch } from "vue";
import * as yup from 'yup';
import { useField, useForm } from "vee-validate";
import { useStore } from "vuex";
import { useRouter } from "vue-router";


export function useSessionsForms(func){

    const store = useStore()
    const router = useRouter()
    // const {handleSubmit, isSubmitting, } = useForm({
    //   initialErrors:{

    //   }
    // })
    const {handleSubmit, isSubmitting, } = useForm()

      const {value:chosenCinemaName,} = useField('chosenCinemaName',yup.string()
      )
      const {value:cityName,} = useField('cityName',yup.string()
      )

     const {value:sessionFilmName,} = useField('sessionFilmName',yup.string()
      )

    //  const {value:chosenAddServices,} = useField('chosenAddServices',yup.string()
    //   )
    const {value:hallnumber,} = useField('hallnumber',yup.number()
      )
      
    const {value:places,} = useField('places',yup.string()
      )
    const {value:startSessionTime, errorMessage:startSessionTimeError, handleBlur:startSessionTimeBlur} = useField('startSessionTime', yup
        .string()
        .trim()
        .required('Это обязательное поле! Пожалуйста, введите время начала сеанса.')
        // .min("10:00",'Раньше 10 утра кинотеатр не откроется.')
        // .max("22:00",'Последний сеанс может начаться не позже 22:00')
        )
      const chosenAddServices = []
     // console.log(chosenAddServices);

    
    // const {value:finishSessionTime, errorMessage:finishSessionTimeError, handleBlur:finishSessionTimBlur} = useField('startSessionTime', yup
    //     .string()
    //     .trim()
    //     .required('Это обязательное поле! Пожалуйста, введите время окончания сеанса.')
    //     .min("12:00",'Раньше 10 утра кинотеатр не откроется.')
    //     .max("00:00",'Последний сеанс может заканчиваться до 00:00')
    //     )

        const onSubmit = handleSubmit(func)


        return{
            chosenCinemaName,
            cityName, sessionFilmName,
            // chosenAddServices,
            hallnumber, places, onSubmit,isSubmitting,
            startSessionTime, startSessionTimeBlur, startSessionTimeError, 
            
            // finishSessionTimBlur,finishSessionTime,finishSessionTimeError,
        }
};