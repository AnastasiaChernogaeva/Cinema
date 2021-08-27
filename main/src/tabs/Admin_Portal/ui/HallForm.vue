<template>
<div class="container">
   <div v-if="open === false" class="formhall"> <button class="btn danger" @click="open = true">Сформировать зал {{id}}</button></div>
    <form @submit.prevent="onSubmit" v-else-if="isReadyHall === false"  >  
    <h2>План зала {{id}}</h2>
  <div :class="['form-control', {'invalid':rowsError},]"> 
              <label for="rows">Количество рядов</label>
          <input
                type="number"
                id="rows"
                v-model="rows"
                @blur="rowsBlur"
        >
        <small v-if="rowsError">{{rowsError}}</small>

  </div>
   <div :class="['form-control', {'invalid':placesError},]"> 
        <label for="places">Количество мест в одном ряду </label>
          <input
                type="number"
                id="places"
                v-model="places"
                @blur="placesBlur"
        >
         <small v-if="placesError">{{placesError}}</small>

    </div>
        <div class="form-checkbox" >

            <span class="label">Выберите номера рядов с обычными местами</span>
            <!-- <button class="btn" @click="checkedAllSimple=!checkedAllSimple">Выбрать все</button> :checked="checkedAllSimple"-->

            <div class="checkbox" v-for="(row, idx) in rows" :key="idx">
                <label><input type="checkbox" name="simplePl" v-model="simplePl" :value="row" />{{row}}</label>
            </div>
        </div>

        <div class="form-checkbox" >

            <span class="label">Выберите номера рядов с VIP местами</span>
            <!-- <button class="btn" @click="checkedAllVip=!checkedAllVip">Выбрать все</button> :checked="checkedAllVip"-->


            <div class="checkbox" v-for="(row, idx) in rows" :key="idx">
                <label><input type="checkbox" name="vipPl" v-model="vipPl" :value="row" />{{row}}</label>
            </div>
        </div>

        <div class="form-checkbox" >

            <span class="label">Выберите номера рядов с местами для двоих
                 </span>
           
<!-- <button class="btn" @click="checkedAllCouple=!checkedAllCouple">Выбрать все</button> :checked="checkedAllCouple"-->

            <div class="checkbox" v-for="(row, idx) in rows" :key="idx">
                <label><input type="checkbox" name="couplePl" v-model="couplePl" :value="row" />
                {{row}}</label>
            </div>
        </div>

        <button class="btn" type="submit" :disabled="isSubmitting">Сохранить</button>
    </form>
     <hall v-if="isReadyHall" :info="info"></hall>
</div>

</template>

<script>
import { ref, watch, reactive } from "vue";
import * as yup from 'yup';
import { useField, useForm } from "vee-validate";

import Hall from "../hall/Hall.vue"


export default {
    components:{
        Hall,
    },
    props:['id'],
    emits:['hall'],
    setup( props, {emit},){
        // const rows = ref()
        // const places = ref()
        const simplePl = ref([])
        const vipPl = ref([])
        const couplePl = ref([])
        const info =  reactive ({})
        const open = ref(false)
        const isReadyHall = ref(false)
        const checkedAllCouple = ref(false)
        const checkedAllVip = ref(false)
        const checkedAllSimple = ref(false)
        // const rowsArr = ref([])



    const {handleSubmit, isSubmitting, } = useForm()


      const {value:rows, errorMessage:rowsError, handleBlur:rowsBlur} = useField('rows',yup
        .string()
        .trim()
        .required('Это обязательное поле! Пожалуйста, введите количество рядов.'))
      const {value:places, errorMessage:placesError, handleBlur:placesBlur} = useField('places',yup
        .string()
        .trim()
        .required('Это обязательное поле! Пожалуйста, введите количество мест в ряду.'))

        const save = ()=>{
            info.value = {
                val:{
                    rows:rows.value,
                    places:places.value,
                    simplePl:simplePl.value,
                    vipPl:vipPl.value,
                    couplePl:couplePl.value,
                },                
                id:props.id,
            }
            // console.log(info.value);
            isReadyHall.value = true
            emit('hall',info)
        }

        const onSubmit = handleSubmit(save)

        // rowsArr.value=rows.map(row=>row)


        return{
            rowsError, rowsBlur,
            // save,
            rows,
            places, placesBlur, placesError,
            simplePl,
            vipPl,
            couplePl,
            open,
            info,
            isReadyHall,
            checkedAllCouple, checkedAllVip, checkedAllSimple,
            isSubmitting,onSubmit
            // chooseAll
        }
    }
}
</script>

<style scoped>
    .formhall{
        margin:5%;
    }
</style>