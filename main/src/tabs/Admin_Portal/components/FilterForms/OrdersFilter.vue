<template>
   <div class="filter">
       <div class="form-control">
           <input type="text" placeholder="Введите имя или фамилию покупателя" v-model="userName">
       </div>
      <div class="form-control">
           <input type="text" placeholder="Введите инфо о сеансах" v-model="session">
       </div>
       <div class="form-control">
           <input type="date" placeholder="Выберите дату" v-model="dateSearch">
       </div>
        <button class="btn warning" v-if="isActive" @click="reset" > Сбросить</button>

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

        watch([
            userName, session, 
            dateSearch], values=>{
            emit('update:modelValue',{
                userName:values[0],
                session:values[1],
                dateSearch:values[2],
            })
        })

        const isActive = computed(()=>
        userName.value||session.value||
        dateSearch.value)

        return{
            userName,
            session,
            dateSearch,
            isActive,
            reset:()=>{
                userName.value = ''
                session.value = ''
                dateSearch.value = null
            }
        }
    }

}
</script>
