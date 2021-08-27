import { ref, onMounted} from "vue";
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
    //     // .min("12:00",'Раньше 10 утра кинотеатр не откроется.')
    //     // .max("00:00",'Последний сеанс может заканчиваться до 00:00')
    //     )

        const onSubmit = handleSubmit(func)
        const arr = ref(['films', 'services', 'cinemas',])
        const cinemasCity = ref([])
        const info = ref({})

        onMounted(async ()=>{
          await store.dispatch('requests/loadAll', arr.value );
        }) 
         setTimeout(()=> {  
          const cinemas =  store.getters['requests/cinemas']
          const films =  store.getters['requests/films']
          const services =  store.getters['requests/services']
          console.log(  cinemas);
          info.value['cinemas'] =  cinemas
          info.value['films'] = films
          info.value['services'] = services
          // console.log( info.value.cinemas.forEach(cinema=>cinema.cinemaName==='Lovi_Movie'?halls.value=cinema.val:null))
          // console.log(halls.value);
          },2000)

        const halls=ref({})



        const chosen = ()=>{
          info.value.cinemas.forEach(cinema=>cinema.cinemaName==='Lovi_Movie'?halls.value=cinema.val:null)
          console.log(halls.value);
          console.log(halls.value[id1]);

         }

        return{
            chosen,
            info,
            cinemasCity,
            chosenAddServices,
            chosenCinemaName,
            cityName, sessionFilmName,
            // chosenAddServices,
            hallnumber, places, onSubmit,isSubmitting,
            startSessionTime, startSessionTimeBlur, startSessionTimeError, 
            
            // finishSessionTimBlur,finishSessionTime,finishSessionTimeError,
        }
};