<template>
   <div class="filter">
       <div class="form-control">
           <input type="text" placeholder="Введите название кинотеатра" v-model="cinemaName">
       </div>
      <div class="form-control">
           <input type="text" placeholder="Введите название города" v-model="city">
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
        const cinemaName = ref()
        const city = ref()

        watch([cinemaName, city,], values=>{
            emit('update:modelValue',{
                cinemaName:values[0],
                city:values[1],
            })
        })

        const isActive = computed(()=>cinemaName.value||city.value)

        return{
            cinemaName,
            city,
            isActive,
            reset:()=>{
                cinemaName.value = ''
                city.value = null
            }
        }
    }

}
</script>
