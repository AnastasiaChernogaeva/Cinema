<template>
    <div class="container">
    
    <err-message></err-message>
    <form class="card" @submit.prevent="onSubmit" >  
        <h1>Войдите в аккаунт</h1>
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

         

            <button class="btn primary" type="submit" :disabled="isSubmitting" >Войти</button>
            <button @click="forgottenPassword" class="btn danger">Забыли пароль?</button>    
            <!-- <p class="text-danger" v-if="tooManyAttemptsAmount">Большое количество попыток войти в систему. Попробуйте позже.</p>          -->

        </form> 
   
        </div>

</template>

<script>
import { useRoute, useRouter } from 'vue-router';
import { useStore } from 'vuex';
import { useLoginFormsClient } from "../use/useLoginFormsClient";
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
        // console.log(route.query.message);
        if(route.query.message){
            const resER = error(route.query.message)
            const body_D = { value:resER, type:'warning',}
            store.dispatch('clients/setMess', body_D, {root:true,})
        }
        const forgottenPassword = ()=>{router.push('/cinemaMain/forgottenPassword')}


        return {
            ...useLoginFormsClient(),
            forgottenPassword,
        }

    }
    

}
</script>


<style scoped>
h1{
            padding-top: 1rem;
}
@media all and (max-width:1010px){
    form.card{
            padding-top: 2rem;
    }
}
/* @media all and (max-width:440px){
  h1{
          font-size: 1.42rem;
  }
} */
@media all and (min-width:275px) and (max-width:440px){
  h1{
          font-size: 1.42rem;
  }
  button.btn{
          margin-bottom: 2%;
  }
}
@media all  and (max-width:274px){
  h1{
          font-size: 1.02rem;
  }
  button.btn{
          padding: 0.5rem 0.095rem;
          margin-bottom: 2%;
  }
}

</style>