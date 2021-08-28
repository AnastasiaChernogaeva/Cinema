import { ref, onMounted, reactive} from "vue";
import * as yup from 'yup';
import { useField, useForm } from "vee-validate";
import { useStore } from "vuex";
import { useRouter } from "vue-router";

// func
export function useSessionsForms(){

    const store = useStore()
    const router = useRouter()
    // const {handleSubmit, isSubmitting, } = useForm({
    //   initialErrors:{

    //   }
    // })handleSubmit,
    const { isSubmitting, } = useForm()

      const {value:chosenCinemaName,} = useField('chosenCinemaName',yup.string()
      )
      const {value:cityName,} = useField('cityName',yup.string()
      )

     const {value:sessionFilmName,} = useField('sessionFilmName',yup.string()
      )

    //  const {value:chosenAddServices,} = useField('chosenAddServices',yup.array()
    //   )
    const {value:hallnumber, errorMessage:hError, handleBlur:Blur} = useField('hallnumber',yup.number()
      )
      
    // const {value:places,} = useField('places',yup.string()
      // )
    const {value:startSessionTime, errorMessage:startSessionTimeError, handleBlur:startSessionTimeBlur} = useField('startSessionTime', yup
        .string()
        .trim()
        .required('Это обязательное поле! Пожалуйста, введите время начала сеанса.')
        )
      const chosenAddServices = ref([])
      // chosenAddServices.yup.oneOf()
  //     const {value:chosenAddServices,} = useField('chosenAddServices',yup.array()
  //     .default([])
  // );
      const serVices=()=>{
          console.log('chosenAddservices',chosenAddServices.value);
      }
   


        // const onSubmit = handleSubmit(func)
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
          info.value.cinemas.forEach(cinema=>cinema.cinemaName===chosenCinemaName.value?halls.value=Object.keys(cinema.val):null)
         }
      const showHall = ()=>{
          info.value.cinemas.forEach(cinema=>{
            if(cinema.cinemaName===chosenCinemaName.value){
              halls.value.forEach(id=>id===hallnumber.value?hallInfo.value={'val':cinema.val[id], 'id':id}:null)
              newOne.value+=1
              couplePl.value=hallInfo.value.val.couplePl
              simplePl.value=hallInfo.value.val.simplePl
              vipPl.value=hallInfo.value.val.vipPl
              
            }
          })}
         
          const submit = async () =>{
            const v={'pricesCPl':pricesCPl.value,'pricesSPl':pricesSPl.value,'pricesVPl':pricesVPl.value, 'chosenAddServices':chosenAddServices.value, 'startSessionTime':startSessionTime.value, 'hallnumber':hallnumber.value, 'sessionFilmName':sessionFilmName.value, 'cityName':cityName.value, 'chosenCinemaName':chosenCinemaName.value, }
            console.log('VALUES',v)
            await store.dispatch('requests/create',{'value':v, 'rType':'sessions', } );
            emit('added')
        }

        return{
            couplePl, simplePl, vipPl,
            newOne,
            chosen,showHall,
            info,
            halls,hallInfo,
            cinemasCity,chosenAddServices,chosenCinemaName,cityName, sessionFilmName,
            chosenAddServices,
            hallnumber, 
            //  onSubmit,
            submit,
             isSubmitting,
            startSessionTime, startSessionTimeBlur, startSessionTimeError, 
            serVices,
            pricesCPl,pricesSPl,pricesVPl,
            // places,
        }
};