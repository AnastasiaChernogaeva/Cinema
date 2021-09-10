<template>
  <div class="card container" v-if="!successfulyChanged">
    <h2>Забыли пароль?</h2>
    <div v-if="beforeChangePassword">
      <div :class="['form-control', {'invalid':nError},]">
                <label for="name">Имя</label>
                <input
                    type="text"
                    id="name"
                    placeholder="Введите имя"
                    v-model="name"
                    @blur="nBlur"
                >
                <small v-if="nError">{{nError}}</small>
        </div>

         <div :class="['form-control', {'invalid':sError},]">
                <label for="surname">Фамилия</label>
                <input
                    type="text"
                    id="surname"
                    placeholder="Введите фамилию"
                    v-model="surname"
                    @blur="sBlur"
                >
                <small v-if="sError">{{sError}}</small>
        </div>

        <div :class="['form-control', {'invalid':eError},]">
                <label for="Email">Email</label>
                <input
                    type="email"
                    id="email"
                    placeholder="Введите почту"
                    v-model="email"
                    @blur="eBlur"
                >
                <small v-if="eError">{{eError}}</small>
        </div>
      <br>
        <button class="btn danger" @click="changePassword" :disabled="!surname || !name || !email || eError || sError || nError">Изменить пароль</button>
    </div>
    <div v-else>
        <div v-if="dontHaveSuchAUser">
          <span>Такого пользователя нет. Пройти регистрацию можно <router-link to="/signupUser">здесь</router-link>.</span><br><p><router-link to="/cinemaMain">Вернуться на главную</router-link></p>
        </div>
        <div v-else>
        <div :class="['form-control', {'invalid':pError},]" >
                <label for="newpassword">Пароль</label>
                <input
                    type="password"
                    id="newpassword"
                    placeholder="Введите новый пароль"
                    v-model="newpassword"
                    @blur="pBlur"
                >
                <small v-if="pError">{{pError}}</small>
                <br/>

         </div>
    <button class="btn primary" @click="saveNewPassword" :disabled="isSubmitting">
      Сохранить новый пароль
    </button> 
    </div>
 
</div>
      
  </div>
    <div class="card container" v-else-if="successfulyChanged">
    <p>
      Пароль успешно изменен!
      <router-link to="/cinemaMain">Вернуться на главную</router-link>
    </p>
  </div>

</template>

<script>
import {computed, onMounted, ref} from 'vue'
import { useStore } from 'vuex'
import * as yup from 'yup';
import { useField, useForm } from "vee-validate";
import { useRouter } from 'vue-router';

export default {
  setup(){
    const store = useStore()
    const router = useRouter()


        const passwordMinLength = 6
        const {handleSubmit, isSubmitting} = useForm()

        const {value:name, errorMessage:nError, handleBlur:nBlur} = useField('name',yup
        .string()
        .trim()
        .required('Это обязательное поле! Пожалуйста, введите имя.')
        )
        const {value:surname, errorMessage:sError, handleBlur:sBlur} = useField('surname',yup
        .string()
        .trim()
        .required('Это обязательное поле! Пожалуйста, введите фамилию.')
        )

        const {value:email, errorMessage:eError, handleBlur:eBlur} = useField('email',yup
            .string()
            .trim()
            .required('Это обязательное поле! Пожалуйста, введите email.')
            .email('Необходим ввести корректный email.'))

        const {value:newpassword, errorMessage:pError, handleBlur:pBlur} = useField('password', yup
            .string()
            .trim()
            .required('Это обязательное поле! Пожалуйста, введите пароль.')
            .min(passwordMinLength, `Пароль не может быть меньше ${passwordMinLength} символ`))








    const beforeChangePassword = ref(true)
    const dontHaveSuchAUser = ref(true)

   onMounted(async()=>{
     await store.dispatch(
       'gettingInfo/load',{rType:'users'}
     )
   })

    const successfulyChanged = ref(false)

    const user = ref()
    const changePassword = async()=>{
      const users = computed(()=>store.getters['gettingInfo/users'])
      // console.log(users.value);
        if(users.value){
         user.value = users.value.find(user=>user.email===email.value && user.name===name.value && user.surname===surname.value )
         if(user.value!==undefined){
          dontHaveSuchAUser.value = false
         }else{
          dontHaveSuchAUser.value = true
        }        
        }
        
        beforeChangePassword.value = false

    }
    const saveNewPassword = handleSubmit(async(values)=>{
      // console.log(values);
      // console.log(values.password);
      let nPassword = values.password;
      delete values.password
      // console.log(values);

      await store.dispatch('gettingInfo/resetPassword',{rType:'users', id:user.value.id, info:values, nPassword:nPassword,})
         successfulyChanged.value = true
       setTimeout(() => {
         router.push('/loginUser')
      }, 2500);
    })
    return{
        changePassword,
        beforeChangePassword,
        dontHaveSuchAUser,
            email, eError,eBlur,
            newpassword, pError,pBlur,
            isSubmitting,
            name, nError, nBlur,
            surname, sError, sBlur,
            saveNewPassword,
            successfulyChanged
    }
  }

}
</script>

<style>

</style>