<template>
   <div class="filter">
       <div class="form-control">
           <input type="text" placeholder="Введите название фильма" v-model="name">
       </div>
       <div class="form-control">
           <select  v-model="status">
               <option selected=true disabled >Выберите статус</option>
               <option value="on" >В прокате</option>
               <option value="off">Показ завершен</option>
           </select>
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
        const name = ref()
        const status = ref()

        watch([name, status,], values=>{
            emit('update:modelValue',{
                name:values[0],
                status:values[1],
            })
        })

        const isActive = computed(()=>name.value||status.value)

        return{
            name,
            status,
            isActive,
            reset:()=>{
                name.value = ''
                status.value = null
            }
        }
    }

}
</script>
