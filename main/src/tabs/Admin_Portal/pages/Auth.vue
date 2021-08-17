<template>
    <form class="card" @submit.prevent="onSubmit" >  
        <h1>Войдите в система</h1>
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
        <div :class="['form-control', {'invalid':pError},]">
                <label for="password">Пароль</label>
                <input
                    type="password"
                    id="password"
                    placeholder="Введите пароль"
                    v-model="password"
                    @blur="pBlur"
                >
                <small v-if="pError">{{pError}}</small>
                <br/>

         </div>

         

            <button class="btn primary" type="submit" :disabled="isSubmitting || tooManyAttemptsAmount" >Войти</button>

            <p class="text-danger" v-if="tooManyAttemptsAmount">Большое количество попыток войти в систему. Попробуйте позже.</p>         

        </form> 
           <!-- <button @click="forgottenPassword" class="btn danger">Забыли пароль?</button>     -->
   
        

</template>

<script>
import { useRoute } from 'vue-router';
import { useStore } from 'vuex';
import {  useLoginForm} from "../use/login-form";
import {error} from '../utils/error'


export default {
    setup() {
        const route = useRoute()
        const store = useStore()
        if(route.query.message){
            store.dispatch('admin/setMess', { value:error(route.query.message), type:'warning',}, {root:true,})
        }

        return {...useLoginForm()}

    }
    

}
</script>


<style>

</style>