<template>
<!-- <div class="card">{{info}}</div> -->
     <form class="card" @submit.prevent="onSubmit"  >  
         <div :class="['form-control', ]">  
                <label for="cityName">Город</label>
                <select  id="cityName" v-model="cityName"  >
                       <option v-for="(cinema,idx) of info.cinemas" value="city" :key="idx" >{{cinema.city}}</option>
                </select>
         </div>
<!-- v-if="!cinemasCity.includes(cinema.city) && cinemasCity.push(cinema.city)" -->
            <button class="btn primary" type="submit" :disabled="isSubmitting" >Добавить</button>      

        </form> 
</template>

<script>
import {ref, onMounted, reactive} from 'vue'
import { useStore } from 'vuex';
import { useSessionsForms } from "../../use/sessions-forms";

export default {
    emits:['added'],
    setup( _, {emit},){
        const store = useStore()
        const arr = ref(['films', 'services', 'cinemas',])
        const cinemasCity = ref([])
        const info = ref({})

        onMounted(async ()=>{
          await store.dispatch('requests/loadAll', arr.value );
          // console.log(res)
          // if (res){const res = 
         
          // }
        }) 
         setTimeout(()=> {  
          const cinemas =  store.getters['requests/cinemas']
          const films =  store.getters['requests/films']
          const services =  store.getters['requests/services']
          console.log(  cinemas);
          info.value['cinemas'] =  cinemas
          info.value['films'] = films
          info.value['services'] = services
          console.log( info.value);},2000)

          // if(info.value!=={}){
          //   var cinemas = info.value.cinemas
          //   console.log('CCC',info.value.cinemas);
          //   // cinemasCity.value = cinemas.map(cinema=>cinemasCity.includes(cinema.city)?'':cinema.city)
          //   console.log(cinemasCity);
          // }
          


        const submit = async values =>{
            await store.dispatch('requests/create',{'value':values, 'rType':'sessions', } );
            emit('added')
        }
            return{
              info,
              cinemasCity,
                ...useSessionsForms(submit)    
            }
    }

}
</script>

<style>

</style>