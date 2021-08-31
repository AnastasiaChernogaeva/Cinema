<template>
    <div class="container">
    
    <err-message></err-message>
    <form class="card" @submit.prevent="onSubmit" >  
        <h1>Зарегистрироваться</h1>
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

         

            <button class="btn primary" type="submit" :disabled="isSubmitting || tooManyAttemptsAmount" >Зарегистрироваться</button>        

        </form> 

   
        </div>

</template>

<script>
import { useRoute, useRouter } from 'vue-router';
import { useStore } from 'vuex';
import { useSignupUser } from "../use/useSignupUser";
import {error} from '../../Admin_Portal/utils/error'
import ErrMessage from "../ui/ErrMessage.vue";


export default {
    components:{
        ErrMessage,
    },
    setup() {
        const route = useRoute()
        const router = useRouter()
        const store = useStore()
        if(route.query.message){
            const resER = error(route.query.message)
            const body_D = { value:resER, type:'warning',}
            store.dispatch('clients/setMess', body_D, {root:true,})
        }


        return { ...useSignupUser()}

    }
    

}
</script>


<style>

</style>