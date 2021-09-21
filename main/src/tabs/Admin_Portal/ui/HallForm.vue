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
        <!-- <div class="form-checkbox" >

            <span class="label">Выберите номера рядов с обычными местами</span>

            <div class="checkbox" v-for="(row, idx) in rows" :key="idx">
                <label><input type="checkbox" name="simplePl" v-model="simplePl" :value="row" />{{row}}</label>
            </div>
        </div>

        <div class="form-checkbox" >

            <span class="label">Выберите номера рядов с VIP местами</span>


            <div class="checkbox" v-for="(row, idx) in rows" :key="idx">
                <label><input type="checkbox" name="vipPl" v-model="vipPl" :value="row" />{{row}}</label>
            </div>
        </div>

        <div class="form-checkbox" >

            <span class="label">Выберите номера рядов с местами для двоих
                 </span>

            <div class="checkbox" v-for="(row, idx) in rows" :key="idx">
                <label><input type="checkbox" name="couplePl" v-model="couplePl" :value="row" />
                {{row}}</label>
            </div>
        </div> -->


 <hr/>
        
   <div class="form-checkbox" >

            <span class="label">Выберите номера рядов с обычными местами</span> 
            <!-- <button class="btn" @click="checkedAllSimple=!checkedAllSimple">Выбрать все</button> :checked="checkedAllSimple"   :key="changeSimpleView!==0&&idx===?changeSimpleView:0"-->

            <div class="checkbox" v-for="(row, idx) in rows" :key="idx">
                <label><input type="checkbox" name="simplePl" :value="simplePl" @click="ifThisPlaceAdded(row, 'simple')"  :key="changeSimpleView" />{{row}}</label>
            </div>
        </div>

        <div class="form-checkbox" >

            <span class="label">Выберите номера рядов с VIP местами</span>
            <!-- <button class="btn" @click="checkedAllVip=!checkedAllVip">Выбрать все</button> :checked="checkedAllVip"-->


            <div class="checkbox" v-for="(row, idx) in rows" :key="idx">
                <label><input type="checkbox" name="vipPl" :value="vipPl" @click="ifThisPlaceAdded(row, 'vip')" :key="changeVIPView" />{{row}}</label>
            </div>
        </div>

        <div class="form-checkbox" >

            <span class="label">Выберите номера рядов с местами для двоих
                 </span>
           
<!-- <button class="btn" @click="checkedAllCouple=!checkedAllCouple">Выбрать все</button> :checked="checkedAllCouple"-->

            <div class="checkbox" v-for="(row, idx) in rows" :key="idx">
                <label><input type="checkbox" name="couplePl" :value="couplePl" @click="ifThisPlaceAdded(row, 'couple')" :key="changeCoupleView" />
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

        const changeSimpleView = ref(0)
        const changeCoupleView = ref(0)
        const changeVIPView = ref(0)

        const ifThisPlaceAdded = (row, placeType,)=>{
            switch(placeType){

                case 'simple':
                    if(couplePl.value.includes(row)){
                        let ind = couplePl.value.findIndex(elem=>elem==row)
                        couplePl.value.splice(ind,1)
                        changeCoupleView.value--
                    }
                    else if(vipPl.value.includes(row)){
                        let ind = vipPl.value.findIndex(elem=>elem==row)
                        vipPl.value.splice(ind,1)
                        changeVIPView.value--

                    }
                    // changeSimpleView.value++
                    simplePl.value.push(row)
                break;


                case 'vip':
                    if(couplePl.value.includes(row)){
                        let ind = couplePl.value.findIndex(elem=>elem==row)
                        couplePl.value.splice(ind,1)
                        changeCoupleView.value--
                    }
                    else if(simplePl.value.includes(row)){
                        let ind = simplePl.value.findIndex(elem=>elem==row)
                        simplePl.value.splice(ind,1)
                        changeSimpleView.value--

                    }
                    vipPl.value.push(row)
                    // changeVIPView.value++
                break;  


                case 'couple':
                    if(vipPl.value.includes(row)){
                        let ind = vipPl.value.findIndex(elem=>elem==row)
                        vipPl.value.splice(ind,1)
                        changeVIPView.value--

                    }
                    else if(simplePl.value.includes(row)){
                        let ind = simplePl.value.findIndex(elem=>elem==row)
                        simplePl.value.splice(ind,1)
                        changeSimpleView.value--
                    }
                    couplePl.value.push(row)
                    // changeCoupleView.value++
                break;

            }





            // console.log(simplePl.value.includes(row))
            // console.log(vipPl.value.includes(row))
            // console.log(couplePl.value.includes(row))
            



        }

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
            isSubmitting,onSubmit,
            // chooseAll
            ifThisPlaceAdded,
            changeSimpleView,
            changeCoupleView,
            changeVIPView,
        }
    }
}
</script>

<style scoped>
    .formhall{
        margin:5%;
    }
</style>