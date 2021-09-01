<template>
  <div class="card">
        <b> Выберите дату:</b>&nbsp;<input type="date"   :value="dateChosen" @blur="ch" :max="film.finishTime" :min="film.startTime">
        <!-- <small v-if="errorMessageForDay===true" :key="kk">Фильм не показывают в этот день</small>  -->
  </div>
</template>

<script>// @change="checkDates"
import {ref, onMounted, computed, } from 'vue'
import { useStore } from "vuex";

export default {
    setup(){
        const store = useStore()
        const session = ref({})
                const film = ref({})
                const dateChosen =ref()
        onMounted(async()=>{
            session.value = await store.dispatch('gettingInfo/loadByID',{
                rType:'sessions',
                id:'-MiGwOycpHIYSXxYaOtt',
            },)

             await store.dispatch('gettingInfo/load',{
                rType:'films',
            },)           
              const films = computed(()=> store.getters['gettingInfo/films'])
              film.value = films.value.find(filmO =>{
                                    if(session.value.sessionFilmName === filmO.filmName) {
                                        return filmO
                                    }
                            } )
        })




        const ch = (event)=>{
            console.log(event.target.value);
        }



        return{
            session,
            film,

            dateChosen,
            ch,

        }
    }
}
</script>