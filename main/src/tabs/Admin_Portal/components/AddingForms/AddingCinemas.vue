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

  
  <div :class="['form-control', {'invalid':hallamountError},]"> 
                <label for="hallamount">Количество залов</label>
                <input
                    type="number"
                    id="hallamount"
                    v-model.number="hallamount"
                    @blur="hallamountBlur"
                >
                <small v-if="hallamountError">{{hallamountError}}</small>
  </div>

<!-- <div  v-if="hallamount > 0">
          <div :class="['form-control',]" v-for="n in hallamount " > 
                <label for="`places${n}`">План зала {{n}}</label>
                <input
                    type="text"
                    id="`places${n}`"
                    v-model="place"
                    @blur="placesBlur"
                >
                <small v-if="placesError">{{placesError}}</small>
      </div> -->
<!-- </div> -->



         

            <button class="btn primary" type="submit" :disabled="isSubmitting || tooManyAttemptsAmount" >Добавить</button>      

        </form> 
</template>
<script>
import { useStore } from 'vuex';
import { useCinemasForms } from "../../use/cinemas-forms";

export default {
    emits:['added'],
    setup( _, {emit},){
        const store = useStore()
        const submit = async values =>{
            await store.dispatch('requests/create', {'value':values, 'rType':'cinemas',});
            console.log(values);
            emit('added')
        }  
        return{
            ...useCinemasForms(submit)
        }
       
    }

}
</script>

<style>

</style>