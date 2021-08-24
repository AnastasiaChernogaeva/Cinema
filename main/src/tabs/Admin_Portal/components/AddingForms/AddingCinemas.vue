<template>
         <form class="card" @submit.prevent="onSubmit"  >  
        <div :class="['form-control', {'invalid':cityError},]"> 
                <label for="filmName">Город</label>
                <input
                    type="text"
                    id="city"
                    v-model="city"
                    @blur="cityBlur"
                >
                <small v-if="cityError">{{cityError}}</small>
      </div>

        <div :class="['form-control', {'invalid':Error},]"> 
                <label for="cinemaName">Название кинотеатра</label>
                <input
                    type="text"
                    id="cinemaName"
                    v-model="cinemaName"
                    @blur="cinemaBlur"
                >
                <small v-if="cinemaError">{{cinemaError}}</small>
  </div>

  
  <div :class="['form-control', {'invalid':hallamountsError},]"> 
                <label for="hallamounts">Количество залов</label>
                <input
                    type="number"
                    id="hallamounts"
                    v-model="hallamounts"
                    @blur="hallamountsBlur"
                >
                 <small v-if="hallamountsError">{{hallamountsError}}</small>
  </div> 

  <div v-if="hallamounts!==0">
        <div v-for="(el,idx) in hallamounts" :key="idx">
          <hall-form  :id="el" @hall="newHall"></hall-form>
      </div>
   </div>

    <button class="btn primary" type="submit" :disabled="isSubmitting || tooManyAttemptsAmount" >Добавить</button>      

   </form> 
</template>

<script>
import {ref,reactive, watch} from "vue"
import { useStore } from 'vuex';
import { useCinemasForms } from "../../use/cinemas-forms";
import HallForm from "../../ui/HallForm.vue"


export default {
    components:{
        HallForm,
    },
    emits:['added'],
    setup( _, {emit},){
        const store = useStore()
        const hallForm = reactive({})

        
        const submit = async values =>{
            const v = {...values, val:hallForm}
            console.log(v);
            await store.dispatch('requests/create', {'value':v, 'rType':'cinemas',});
            emit('added')
        } 

        const newHall = (res) =>{
            hallForm[`id${res.value.id}`] = res.value.val
        }




        return{
            ...useCinemasForms(submit),
            newHall,
            hallForm
        }
       
    }

}
</script>

<style>

</style>