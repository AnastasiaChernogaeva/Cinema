import { ref, onMounted, reactive} from "vue";
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
      const chosenAddServices = ref([])
      // const serVices=()=>{
      //     console.log('chosenAddservices',chosenAddServices.value);
      // }
   


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
          // console.log(  cinemas);
          info.value['cinemas'] =  cinemas
          info.value['films'] = films
          info.value['services'] = services
          // console.log( info.value.cinemas.forEach(cinema=>cinema.cinemaName==='Lovi_Movie'?halls.value=cinema.val:null))
          // console.log(halls.value);
          },2000)

        const halls=ref({})
        const hallInfo = reactive({})
        const newOne = ref(0)
        const couplePl = ref([])
        const simplePl = ref([])
        const vipPl = ref([])
        const pricesCPl = ref()
        const pricesSPl = ref()
        const pricesVPl = ref()





        const chosen = ()=>{
          // console.log('Название выьранного кинотеатра', chosenCinemaName.value);
          info.value.cinemas.forEach(cinema=>cinema.cinemaName===chosenCinemaName.value?halls.value=Object.keys(cinema.val):null)
          // console.log('ID залов',halls.value);
          // console.log(Object.keys(halls.value));
         }
      const showHall = ()=>{
          info.value.cinemas.forEach(cinema=>{
            if(cinema.cinemaName===chosenCinemaName.value){
              halls.value.forEach(id=>id===hallnumber.value?hallInfo.value={'val':cinema.val[id], 'id':id}:null)
              newOne.value+=1
              couplePl.value=hallInfo.value.val.couplePl
              simplePl.value=hallInfo.value.val.simplePl
              vipPl.value=hallInfo.value.val.vipPl

              // console.log('инфо о конкретном зале', hallInfo.value.val);
              
            }
          })}
   
          // console.log(hallInfo.value);
          // console.log(Object.keys(halls.value));

         

        return{
            couplePl, simplePl, vipPl,
            newOne,
            chosen,showHall,
            info,
            halls,hallInfo,
            cinemasCity,chosenAddServices,chosenCinemaName,cityName, sessionFilmName,
            chosenAddServices,
            hallnumber, places, onSubmit,isSubmitting,
            startSessionTime, startSessionTimeBlur, startSessionTimeError, 
            // serVices,
            pricesCPl,pricesSPl,pricesVPl,
            
            // finishSessionTimBlur,finishSessionTime,finishSessionTimeError,
        }
};