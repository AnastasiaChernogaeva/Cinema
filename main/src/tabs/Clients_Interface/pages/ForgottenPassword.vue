<template>
  <div class="card container">
    <h2>Забыли пароль?</h2>
    <div v-if="beforeChangePassword">
      <div class="form-control" >
        <label for="name">Имя</label>
        <input type="text" placeholder="Введите свое имя" v-model="name">
      </div>
      <div class="form-control" >
        <label for="surname">Фамилия</label>
        <input type="text" placeholder="Введите свою фамилию" v-model="surname">
      </div>
      <div class="form-control" >
        <label for="email">Email</label>
        <input type="text" placeholder="Введите ваш email" v-model="email">
      </div>
      <br>
        <button class="btn danger" @click="changePassword">Изменить пароль</button>
    </div>
    <div v-else>
        <div v-if="dontHaveSuchAUser">
          <span>Такого пользователя нет. Пройти регистрацию можно <router-link to="/signupUser">здесь</router-link>.</span><br><span><router-link to="/cinemaMain">Вернуться на главную</router-link></span>
        </div>
        <div class="form-control" v-else>
        <label for="password">Пароль</label>
        <input type="text" placeholder="Введите новый пароль" v-model="password">
        </div>
    </div>

      
  </div>
</template>

<script>
import {computed, onMounted, ref} from 'vue'
import { useStore } from 'vuex'
export default {
  setup(){
    const store = useStore()
    const email = ref()
    const name = ref()
    const surname = ref()
    const password = ref()    
    const beforeChangePassword = ref(true)
    const dontHaveSuchAUser = ref(true)

   onMounted(async()=>{
     await store.dispatch(
       'gettingInfo/load',{rType:'users'}
     )
   })



    const changePassword = ()=>{
      const users = computed(()=>store.getters['gettingInfo/users'])
        beforeChangePassword.value = false
        // if(){
        //   dontHaveSuchAUser.value = false
        // }
        // else{
        //   dontHaveSuchAUser.value = true
        // }
    }
    return{
        changePassword,
        name, surname, email,
        beforeChangePassword,
        dontHaveSuchAUser,
        password
    }
  }

}
</script>

<style>

</style>