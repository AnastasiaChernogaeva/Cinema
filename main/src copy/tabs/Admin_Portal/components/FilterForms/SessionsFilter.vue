<template>
   <div class="filter">
       <div class="form-control">
           <input type="text" placeholder="Введите название фильма" v-model="filmname">
       </div>
        <div class="form-control">
           <input type="text" placeholder="Введите название кинотеатра" v-model="cinemaname">
       </div>
       <div class="form-control">
           <input type="text" placeholder="Введите название города" v-model="cityname">
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
        const filmname = ref()
        const cinemaname = ref()
        const cityname = ref()

        cityname
        // const genre = ref()genre||genre.value


        watch([filmname, cinemaname, cityname], values=>{
            emit('update:modelValue',{
                filmname:values[0],
                cinemaname:values[1],
                cityname: values[2],
                // genre:values[2],
            })
        })

        const isActive = computed(()=>filmname.value||cinemaname.value||cityname.value)

        return{
            filmname,
            cinemaname,
            cityname,
            // genre,
            isActive,
            reset:()=>{
                cinemaname.value = ''
                filmname.value = ''
                cityname.value = ''
            }
        }
    }

}
</script>
