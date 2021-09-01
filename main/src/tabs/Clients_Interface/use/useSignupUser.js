import { computed, watch } from "vue";
import * as yup from 'yup';
import { useField, useForm } from "vee-validate";
import { useStore } from "vuex";
import { useRouter } from "vue-router";

export function useSignupUser(){

        const store = useStore()
        const router = useRouter()
        const passwordMinLength = 6
        const {handleSubmit, isSubmitting, submitCount} = useForm()

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

        const {value:password, errorMessage:pError, handleBlur:pBlur} = useField('password', yup
            .string()
            .trim()
            .required('Это обязательное поле! Пожалуйста, введите пароль.')
            .min(passwordMinLength, `Пароль не может быть меньше ${passwordMinLength} символ`))

        // const {value:repassword, errorMessage:reError, handleBlur:reBlur} = useField('repassword', yup
        //     .string()
        //     .trim()
        //     .required('Это обязательное поле! Пожалуйста, подтвердите пароль.')
        //     // .min(passwordMinLength, `Пароль не может быть меньше ${passwordMinLength} символ`)
        //     .test('Проверка паролей',
        //         'Пароли не совпадают',
        //         value=> {console.log(password.value)})
        //     )

        // const tooManyAttemptsAmount = computed(()=> submitCount.value>=6)

        const onSubmit = handleSubmit(async (values) =>{
            try{
                await  store.dispatch('authClient/register', values)
                router.push('/cinemaMain/loginUser')
            } catch(error){}
        })


        return{
            email, eError,eBlur,
            password, pError,pBlur,
            // repassword, reError,reBlur,
            onSubmit,
            isSubmitting,
            name, nError, nBlur,
            surname, sError, sBlur

        }

};