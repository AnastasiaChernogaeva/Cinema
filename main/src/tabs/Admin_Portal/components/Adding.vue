<template>
  <div>
    <div class="container" v-for="subtype of subtypes" :key="subtype.id">
      <h3 class="card-title">{{subtype.title}}
        <button class="btn primary" @click = "subtype.showForm = true">{{subtype.showForm?'Закрыть':'Открыть'}}</button>
      </h3>
      


       <form class="card" @submit.prevent=""  >  
        <div :class="['form-control', {'invalid':eError},]" v-for = "(labelType, ind) of subtype.types" :key="ind"> 
                <label for="labelType.idName">{{labelType.fieldName}}</label>
                  <select  id="labelType.idName" v-model="labelType.forVModel" v-if="view">
                  <option value="spb">Санкт-Петербург</option>
                  <option value="msk">Москва</option>
                  <option value="kzn">Казань</option>
                  <option value="nsk">Новосибирск</option>
                </select>
                <input
                    v-else
                    type="labelType.fieldType"
                    id="labelType.idName"
                    v-model="labelType.forVModel"
                    @blur="eBlur"
                >
                
              

                <small v-if="eError">{{eError}}</small>
        </div>

  


         

            <button class="btn primary" type="submit" :disabled="isSubmitting || tooManyAttemptsAmount" >Добавить</button>      

        </form> 
        <hr /> 

      
    </div>
</div>
</template>

<script>
import { ref,computed, watch , } from "vue";
import * as yup from 'yup';
import { useField, useForm } from "vee-validate";
import { useStore } from "vuex";
import { useRouter } from "vue-router";

export default {
  setup(){
        const store = useStore()
        const router = useRouter()
        const {handleSubmit, isSubmitting, submitCount} = useForm()

      

let validationArr;


// subtypes.forEach(subtype=>{
//   validationArr = subtype.types.map(labelType=>{
//     const arr=[],
//       const {value:labelType.idName, errorMessage:fNError, handleBlur:eBlur} = useField('email',yup
//             .string()
//             .trim()
//             .required('Это обязательное поле! Пожалуйста, введите email.')
//             .email('Необходим ввести корректный email.'))
//   }])
// })













    const subtypes = [
      {   
        title:'Фильмы', 
        types:[
           {idName:"filmName", fieldName:"Название", fieldType:"text", forVModel:"filmName"},

           {idName:"filmDescription", fieldName:"Описание", fieldType:"text", forVModel:"filmDescription"},

           {idName:"startTime", fieldName:"Начало показа", fieldType:"date", forVModel:"startTime"},
           {idName:"finishTime", fieldName:"Окончание показа", fieldType:"date", forVModel:"finishTime"},
        ], 
        id:1,
        showForm:false,
      },
      {
        title:'Сеансы',
        types:[
          {idName:"chosenCinemaName", fieldName:"Кинотеатр",forVModel:"chosenCinemaName", view:true,},
          {idName:"startSessionTime", fieldName:"Время начала сеанса", fieldType:"time", forVModel:"startSessionTime"},
          {idName:"finishSessionTime", fieldName:"Время окончания сеанса", fieldType:"time", forVModel:"finishSessionTime"},
          {idName:"sessionFilmName", fieldName:"Фильм", fieldType:"text", forVModel:"sessionFilmName", view:true,},
          // 'Зал',  {idName:"chosenAddServices", fieldName:"Дополнительные услуги",  forVModel:"sessionFilmName", view:true,},
          // 'Места',
          {idName:"chosenAddServices", fieldName:"Дополнительные услуги",  forVModel:"sessionFilmName", view:true,},
          ],
        id:2,
        showForm:false,
      },
      {
        title:'Кинотеатры',
        types:[
          {idName:"city", fieldName:"Город", fieldType:"text", forVModel:"city"}, 
          {idName:"cinemaName", fieldName:"Название", fieldType:"text", forVModel:"cinemaName"}, 
          {idName:"hallamount", fieldName:"Количество залов", fieldType:"number", forVModel:"hallamount"}, 
          // 'План зала(ов)',
          ],
        id:3,
        showForm:false,
      },
      {
        title:'Дополнительные услуги',
        types:[
          {idName:"addServices", fieldName:"Название", fieldType:"text", forVModel:"addServices"}, 
          {idName:"addServicesPrice", fieldName:"Цена", fieldType:"text", forVModel:"addServicesPrice"}, 
          ],
        id:4,
        showForm:false,},
    ]

    return{
      subtypes,
    }
  }

}
</script>

