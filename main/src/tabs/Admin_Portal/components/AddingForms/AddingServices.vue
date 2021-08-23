<template>
      <form class="card" @submit.prevent="onSubmit"  >  
        <div :class="['form-control', {'invalid':asError},]"> 
                <label for="addServices">Название</label>
                <input
                    type="text"
                    id="addServices"
                    v-model="addServices"
                    @blur="asBlur"
                >
                
              

                <small v-if="asError">{{asError}}</small>
        </div>

  
  <div :class="['form-control', {'invalid':priceError},]"> 
                <label for="addServicesPrice">Цена в бел.рублях</label>
                <input
                    type="number"
                    id="addServicesPrice"
                    v-model.number="addServicesPrice"
                    @blur="priceBlur"
                >
                
              

                <small v-if="priceError">{{priceError}}</small>
        </div>

            <button class="btn primary" type="submit" :disabled="isSubmitting" >Добавить</button>      

        </form> 
</template>

<script>
import { useStore } from 'vuex';
import { useServicesForms } from "../../use/services-forms";

export default {
    emits:['added'],
    setup( _, {emit},){
        const store = useStore()
        const submit = async values =>{
            await store.dispatch('requests/create',{'value':values, 'rType':'services', } );
            emit('added')
            
            
        }
            return{
                ...useServicesForms(submit)    
            }
    }

}
</script>

<style>

</style>