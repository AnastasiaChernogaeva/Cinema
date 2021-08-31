<template>
   <div class="filter">
       <div class="form-control">
           <input type="text" placeholder="Введите название услуги" v-model="aServices">
       </div>
        <!-- <div class="form-control"> -->
            <!-- <select v-model="priceServices">
                <option disabled selected>Отсортировать по цене</option>
                <option value="max">по убыванию</option>
                <option value="min">по возрастанию</option>
            </select> -->
           <!-- <input type="number" placeholder="Введите цену" v-model="priceServices">
       </div> -->
        <button class="btn warning" v-if="isActive" @click="reset" > Сбросить</button>
   </div>
</template>

<script>
import {ref, watch, computed} from 'vue'

export default {
    emits:['update:modelValue'],
    props:['modelValue'],
    setup(_,{emit}){
        const aServices = ref()
        // const priceServices = ref()


        // watch(['nameAServices','priceServices'], values=>{
        //     emit('update:modelValue',{
        //         aServices:values[0],
        //         priceServices:values[1],
        //     })
        // })

        // const isActive = computed(()=>aServices.value||priceServices.value)


        // return{
        //     isActive,
        //     aServices,
        //     priceServices,
        //     reset:()=>{
        //         aServices.value = ''
        //         priceServices.value = ''
        //     }
        // }
        //         watch(['aServices','priceServices'], values=>{
        //     emit('update:modelValue',{
        //         aServices:values[0],
        //         priceServices:values[1],
        //     })
        // })

        // const isActive = computed(()=>aServices.value ||priceServices.value )

        //         return{
        //     isActive,
        //     aServices,priceServices,
        //     reset:()=>{
        //         aServices.value = ''
        //     }
        // }

        watch(aServices, value=>{
            emit('update:modelValue',{
                aServices:value,
            })
        })

        const isActive = computed(()=>aServices.value )


        return{
            isActive,
            aServices,
            reset:()=>{
                aServices.value = ''
            }
        }
    }

}
</script>