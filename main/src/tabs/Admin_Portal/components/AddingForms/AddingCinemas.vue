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

    <hall-form v-for="(el,idx) in hallamounts" :key="idx" :id="el"></hall-form>

    <span>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Debitis, porro. Alias ducimus ratione beatae libero officia totam animi unde quaerat deleniti. Recusandae, optio fugiat veritatis consequuntur quasi aspernatur minus dicta.</span>


<!-- <div  v-if="hallamounts > 0"> -->

          
    <!-- <div :class="['form-control']" v-for="hallamount in hallamounts " :key="hallamount" > 
    
              <h3>План зала {{hallamount}}</h3> -->
              <!-- <hall-form v-model="hallForm" :id="hallamount"></hall-form> -->
                <!-- <small v-if="hfError">{{hfError}}</small>  -->
       <!-- </div> -->
 <!-- </div>  -->



         

            <button class="btn primary" type="submit" :disabled="isSubmitting || tooManyAttemptsAmount" >Добавить</button>      

        </form> 
</template>
<script>
import {ref} from "vue"
import { useStore } from 'vuex';
import { useCinemasForms } from "../../use/cinemas-forms";
import CanvasHalls from "../../canvas/CanvasHalls.vue"
import HallForm from "../../ui/HallForm.vue"


export default {
    components:{
        CanvasHalls,
        HallForm,
    },
    emits:['added'],
    setup( _, {emit},){
        const store = useStore()
        const submit = async values =>{
            await store.dispatch('requests/create', {'value':values, 'rType':'cinemas',});
            console.log(values);
            emit('added')
        }  
        const hallForm = ref({})

        // console.log(hallamounts)
        return{
            hallForm,
            ...useCinemasForms(submit)
        }
       
    }

}
</script>

<style>

</style>