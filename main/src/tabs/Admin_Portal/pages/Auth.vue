<template>
    <form class="card" @submit.prevent="authentification" >  
        <h1>Войдите в система</h1>
        <div class='form-control'>
                <label for="Email">Email</label>
                <input
                    type="email"
                    id="email"
                    placeholder="Введите почту"
                    v-model.trim="email"
                >
                <!-- <small v-if="errors.login">{{errors.login}}</small> -->
        </div>
        <div class='form-control'>
                <label for="password">Пароль</label>
                <input
                    type="password"
                    id="password"
                    placeholder="Введите пароль"
                    v-model.trim="password"
                >
                <!-- <small v-if="errors.password">{{errors.password}}</small> -->
                <br/>

         </div>

         

            <button class="btn primary" type="submit" >Войти</button>
         

        </form> 
           <!-- <button @click="forgottenPassword" class="btn danger">Забыли пароль?</button>     -->
   
        

</template>

<script>
import { ref } from "vue";
import {  useRouter, useRoute} from "vue-router";
// import { mapActions } from "vuex";

export default {
    setup() {

        const router = useRouter()
        const route = useRoute()
        // const store = useStore()

        const login = ref('')
        const password = ref('')

    //   const authentification = mapActions('TheAdminModule',['authentification'])

        // const authentification = () => store.dispatch('authentification')

         const authentification = () => console.log('authentification')
  


        const forgottenPassword = () => router.push(route.value+'forgottenPassword')

                // const forgottenPassword = () => console.log(route.value)

        return {
            // currentRoute: computed(()=> route.value),
            login,
            password,
            authentification,
            forgottenPassword,
        }
    }
    

}
</script>

<style>

</style>