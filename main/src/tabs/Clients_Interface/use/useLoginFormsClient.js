import { computed, watch } from "vue";
import * as yup from 'yup';
import { useField, useForm } from "vee-validate";
import { useStore } from "vuex";
import { useRouter } from "vue-router";

export function useLoginFormsClient(){

        const store = useStore()
        const router = useRouter()
        const passwordMinLength = 6
        const {handleSubmit, isSubmitting, submitCount} = useForm()

        const {value:email, errorMessage:eError, handleBlur:eBlur} = useField('email',yup
            .string()
            .trim()
            .required('Это обязательное поле! Пожалуйста, введите email.')
            .email('Необходим ввести корректный email.'))

        const {value:password, errorMessage:pError, handleBlur:pBlur} = useField('password', yup
            .string()
            .trim()
            .required('Это обязательное поле! Пожалуйста, введите пароль.')
            .min(passwordMinLength, `Пароль не может быть меньше ${passwordMinLength} символ`))

        const tooManyAttemptsAmount = computed(()=> submitCount.value>=6)

        const onSubmit = handleSubmit(async (values) =>{
            try{
                // console.log(values);
                await  store.dispatch('gettingInfo/load', {rType:'users'})
                const user = computed(()=>store.getters['gettingInfo/users'].find(user=>{
                    if(user.email === values.email && (user.nPassword === values.password||user.password === values.password)){
                        return user
                    }}))
                // let ourUser = users.value.find(user=>{
                //     if(user.email === values.email && (user.nPassword === values.password||user.password === values.password)){
                //         return user
                //     }
                // })
                   let hhInfoUser = {email:values.email, password:user.value.password}
                   await  store.dispatch('authClient/login', user.value.nPassword?hhInfoUser:values)
                   router.push('/cinemaMain') 
                
                
            } catch(error){}
        })

        watch(tooManyAttemptsAmount, valAtt=>{
            if(valAtt){
                setTimeout(()=> submitCount.value = 0, 2000)
            }
        })

        return{
            email,
            password,
            eError,
            pError,
            eBlur,
            pBlur,
            onSubmit,
            isSubmitting,
            tooManyAttemptsAmount,
        }

};