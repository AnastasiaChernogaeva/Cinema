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
                max=15
                v-model="places"
                @blur="placesBlur"
        >
         <small v-if="placesError">{{placesError}}</small>

    </div>
        
   <div class="form-checkbox" >

            <span class="label">Выберите номера рядов с обычными местами</span> 
            <input type="button" class="btn" @click="checkAllPLaces('simple')" value="Выбрать все"/> 


            <div class="checkbox" v-for="(row, idx) in rows" :key="idx">
                <label><input type="checkbox" name="simplePl" :value="simplePl" @click="ifThisPlaceAdded(row, 'simple', idx+1)"  :key="idx+1===changeSimpleView?(changeSimpleView*-1):idx"  :checked="checkedAllSimple===true"/>{{row}}</label>
            </div>
        </div>

        <div class="form-checkbox" >

            <span class="label">Выберите номера рядов с VIP местами</span>
            <input type="button" class="btn" @click="checkAllPLaces('vip')" value="Выбрать все"/> 



            <div class="checkbox" v-for="(row, idx) in rows" :key="idx">
                <label><input type="checkbox" name="vipPl" :value="vipPl" @click="ifThisPlaceAdded(row, 'vip', idx+1)" :key="idx+1===changeVIPView?(changeVIPView*-1):idx" :checked="checkedAllVip===true" />{{row}}</label>
            </div>
        </div>

        <div class="form-checkbox"  >

            <span class="label">Выберите номера рядов с местами для двоих </span>
           
            <input type="button" class="btn" @click="checkAllPLaces('couple')" value="Выбрать все"/> 


            <div class="checkbox" v-for="(row, idx) in rows" :key="idx">
                <label><input type="checkbox" name="couplePl" :value="couplePl" @click="ifThisPlaceAdded(row, 'couple', idx+1)" :key="idx+1===changeCoupleView?(changeCoupleView*-1):idx" :checked="checkedAllCouple===true" />
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
        const simplePl = ref([])
        const vipPl = ref([])
        const couplePl = ref([])

        const info =  reactive ({})

        const open = ref(false)
        const isReadyHall = ref(false)

        const checkedAllCouple = ref(false)
        const checkedAllVip = ref(false)
        const checkedAllSimple = ref(false)

     




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
            isReadyHall.value = true
            emit('hall',info)
        }

        const onSubmit = handleSubmit(save)

        const changeSimpleView = ref(0)
        const changeCoupleView = ref(0)
        const changeVIPView = ref(0)

        const ifThisPlaceAdded = (row, placeType, idx)=>{
            switch(placeType){

                case 'simple':
                    if(couplePl.value.includes(row)){
                        let ind = couplePl.value.findIndex(elem=>elem==row)
                        couplePl.value.splice(ind,1)
                        changeCoupleView.value=idx
                    }
                    else if(vipPl.value.includes(row)){
                        let ind = vipPl.value.findIndex(elem=>elem==row)
                        vipPl.value.splice(ind,1)
                        changeVIPView.value=idx

                    }
                    simplePl.value.push(row)
                break;


                case 'vip':
                    if(couplePl.value.includes(row)){
                        let ind = couplePl.value.findIndex(elem=>elem==row)
                        couplePl.value.splice(ind,1)
                        changeCoupleView.value=idx
                    }
                    else if(simplePl.value.includes(row)){
                        let ind = simplePl.value.findIndex(elem=>elem==row)
                        simplePl.value.splice(ind,1)
                        changeSimpleView.value=idx

                    }
                    vipPl.value.push(row)
                break;  


                case 'couple':
                    if(vipPl.value.includes(row)){
                        let ind = vipPl.value.findIndex(elem=>elem==row)
                        vipPl.value.splice(ind,1)
                        changeVIPView.value=idx

                    }
                    else if(simplePl.value.includes(row)){
                        let ind = simplePl.value.findIndex(elem=>elem==row)
                        simplePl.value.splice(ind,1)
                        changeSimpleView.value=idx
                    }
                    couplePl.value.push(row)
                break;

            }

        }


        const checkAllPLaces = (placeType) =>{
                switch(placeType){

                case 'simple':
                    if(couplePl.value.length!=0){
                        couplePl.value=[]
                        checkedAllCouple.value=!checkedAllCouple.value
                    }
                    else if(vipPl.value.length!=0){
                        vipPl.value=[]
                        checkedAllVip.value=!checkedAllVip.value
                    }
                    if(simplePl.value.length!=0){
                        simplePl.value=[]
                    }
                    else{
                         for (let i=1; i<=rows.value; i++){
                        simplePl.value.push(i)
                    }
                    }
                   checkedAllSimple.value=!checkedAllSimple.value
                break;


                case 'vip':
                    if(couplePl.value.length!=0){
                        couplePl.value=[]
                        checkedAllCouple.value=!checkedAllCouple.value
                    }
                    else if(simplePl.value.length!=0){
                        simplePl.value=[]
                        checkedAllSimple.value=!checkedAllSimple.value
                    }
                    if(vipPl.value.length!=0){
                        vipPl.value=[]
                    }
                    else{
                     for (let i=1; i<=rows.value; i++){
                        vipPl.value.push(i)
                    }
                    }
                    checkedAllVip.value=!checkedAllVip.value
                break;  


                case 'couple':
                    if(vipPl.value.length!=0){
                        vipPl.value=[]
                        checkedAllVip.value=!checkedAllVip.value
                    }
                    else if(simplePl.value.length!=0){
                        simplePl.value=[]
                        checkedAllSimple.value=!checkedAllSimple.value
                    }
                    if(couplePl.value.length!=0){
                        couplePl.value=[]
                    }
                    else{
                    for (let i=1; i<=rows.value; i++){
                        couplePl.value.push(i)
                    }
                    }
                    checkedAllCouple.value=!checkedAllCouple.value
                break;

            }
        }



        return{
            rowsError, rowsBlur,
            rows,
            places, placesBlur, placesError,
            simplePl,
            vipPl,
            couplePl,
            open,
            info,
            isReadyHall,
            checkedAllCouple, checkedAllVip, checkedAllSimple,
            isSubmitting,onSubmit,
            ifThisPlaceAdded,
            changeSimpleView,
            changeCoupleView,
            changeVIPView,
            checkAllPLaces,
        }
    }
}
</script>

<style scoped>
    .formhall{
        margin:5%;
    }
</style>