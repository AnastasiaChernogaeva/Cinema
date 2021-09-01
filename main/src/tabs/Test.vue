<template>
  <div class="card">
            <p><label><b> Выберите дату:</b>&nbsp;<input type="date" @blur="checkDates"  v-model="dateChosen"></label></p>
      <small v-if="errorMessageForDay===true">Фильм не показывают в этот день</small> 
  </div>
</template>

<script>
import {ref, onMounted, computed, reactive} from 'vue'
import { useStore } from "vuex";
import { useRoute } from 'vue-router';

export default {
    setup(){
        const store = useStore()
        const route = useRoute()
        const session = ref({})

        onMounted(async()=>{
            session.value = await store.dispatch('gettingInfo/loadByID',{
                rType:'sessions',
                id:route.params.ids,
            },)

             await store.dispatch('gettingInfo/load',{
                rType:'films',
            },)           
             

        })


                const film = ref({})
                const errorMessageForDay = ref(false)
                const dateChosen =ref()

                const films = computed(()=> store.getters['gettingInfo/films'])

                const checkDates = (event)=>{
                  film.value = films.value.find(film =>{
                        if(session.sessionFilmName === film.filmName) {
                            return film
                        }}
                  )
                 if(new Date(event)<new Date(film.finishTime).getTime() && new Date(event)>new Date(film.startTime).getTime()){
                    errorMessageForDay.value=false

                }else{
                    console.log('errorMessageForDay.value', errorMessageForDay.value)
                    errorMessageForDay.value = true
                }

                
                }  
                // checkDates.value
        //         console.log(films.value.find(film =>{
        //                 if(session.value.sessionFilmName === film.filmName) {
        //                     return film
        //                 }
        //                 }
        //             ).startTime);

        //   const {value:dateChosen, errorMessage:errorMessageForDay, handleBlur:checkDates} = useField('dateChosen',yup
        //     .date()
        //     .max(films.value.find(film =>{
        //                 if(session.value.sessionFilmName === film.filmName) {
        //                     return film
        //                 }
        //                 }
        //             ).value.finishTime, `Фильм в прокате только ${film.value.startTime}- ${film.value.finishTime}`)
        //     .min(films.value.find(film =>{
        //                 if(session.value.sessionFilmName === film.filmName) {
        //                     return film
        //                 }
        //                 }
        //             ).value.startTime, `Фильм в прокате только ${film.value.startTime}- ${film.value.finishTime}`)
        //     )



        return{
            session,
            film,

            // date,
            dateChosen:dateChosen,
            checkDates:checkDates,
            errorMessageForDay:errorMessageForDay.value,

        }
    }
}
</script>