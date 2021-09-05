<template>
<div>
   <div class="filter">
       <!-- <div class="form-control">
           <input type="text" placeholder="Введите имя или фамилию покупателя" v-model="userName">
       </div>
      <div class="form-control">
           <input type="text" placeholder="Введите инфо о сеансах" v-model="session">
       </div> -->
       <div class="form-control">
           <input type="date" placeholder="Выберите дату сеанса" v-model="dateSearch">
            <!-- <p><small>
            1 - выбор даты сеанса
        </small></p> -->
       </div>
        <div class="form-control">
           <input type="date" placeholder="Выберите дату покупкт" v-model="dateBuy">
           <!-- <p> <small>
            2 - выбор даты покупки билетов
        </small></p> -->
       </div>
        <button class="btn warning" v-if="isActive" @click="reset" > Сбросить</button>

   </div>
      
         <p><small>
            1 - выбор даты сеанса
        </small><br>
         <small>
            2 - выбор даты покупки билетов
        </small></p>   
    </div>
</template>

<script>
import {ref, watch, computed} from 'vue'

export default {
    emits:['update:modelValue'],
    props:['modelValue'],
    setup(_,{emit}){
        const userName = ref()
        const session = ref()
        const  dateSearch = ref()
        const  dateBuy = ref()


        watch([
            // userName, session, 
            dateBuy,
            dateSearch], values=>{
            emit('update:modelValue',{
                // userName:values[0],
                // session:values[1],
                dateBuy:values[0],
                dateSearch:values[1],
            })
        })

        const isActive = computed(()=>
        // userName.value||session.value||
        dateBuy.value||
        dateSearch.value)

        return{
            // userName,
            // session,
            dateBuy,
            dateSearch,
            isActive,
            reset:()=>{
                // userName.value = ''
                // session.value = ''
                dateBuy.value = null,
                dateSearch.value = null
            }
        }
    }

}
</script>

<style scoped>
small{
    color:green;
    text-align: center;
}
</style>
