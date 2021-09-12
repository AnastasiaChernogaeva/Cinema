<template>
    <div class="container">
    
    <err-message></err-message>
    <form class="card" @submit.prevent="onSubmit" >  
        <h1>Зарегистрироваться</h1>
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

         <!-- <div :class="['form-control', {'invalid':reError},]" v-if="password">
                <label for="repassword ">Подтвердите пароль</label>
                <input
                    type="password"
                    id="repassword"
                    placeholder="Введите пароль"
                    v-model="repassword"
                    @blur="reBlur"
                >
                <small v-if="reError">{{reError}}</small>
                <br/>

         </div> -->

         

            <button class="btn primary" type="submit" :disabled="isSubmitting " >Зарегистрироваться</button>        

        </form> 

   <!-- || tooManyAttemptsAmount -->
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


<style scoped>
h1{
            padding-top: 3rem;
}
@media all and (max-width:1010px){
    form.card{
            padding-top: 4rem;
    }
}
@media all and (min-width:275px) and (max-width:440px){
  h1{
          font-size: 1.42rem;
  }
}
@media all  and (max-width:274px){
  h1{
          font-size: 1.02rem;
  }
  button.btn{
          padding: 0.5rem 0.095rem;
  }
}
</style>