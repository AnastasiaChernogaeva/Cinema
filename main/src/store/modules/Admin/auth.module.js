import axios from "axios";
import {error} from "../../../tabs/Admin_Portal/utils/error";

const TOKEN_KEY = 'jwt-token'

export default{
    namespaced:true,
    state(){
        return{
            token:localStorage.getItem(TOKEN_KEY),
        }
    },
    mutations:{
        setToken(state, token){
            state.token = token
            localStorage.setItem(TOKEN_KEY, token)
        },
        logout(state){
            state.token = null
            localStorage.removeItem(TOKEN_KEY)
        },
    },
    actions:{
        async login({commit, dispatch,}, payload){
            // console.log(payload);//payload - это тело, которое мы должны отправить на сервер
            // commit('setToken', "TEST TOKEN")

            // console.log(payload, process.env.VUE_APP_FB_KEY);
               
                
                // const response = await fetch(`https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=${process.env.VUE_APP_FB_KEY}`,{
                //     method:'POST',
                //     headers:{
                //     'Content-Type':'application/json',
                //     },
                //     body:JSON.stringify(payload)
                // })

                // if(response.ok){
                //             const data = await response.json()
                //             console.log(data)
                // }
                // else{
                //     console.log('Error:', response)
                //     }

                try{
                const {data} = await axios.post(`https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=${process.env.VUE_APP_FB_KEY}`, {...payload, returnSecureToken:true,})
                // console.log(data.idToken)
                commit('setToken', data.idToken)
                } catch(e){
                    console.log(error(e.response.data.error.message));
                    dispatch('adminModule/setMess',{
                        value:error(e.response.data.error.message),
                        type:'danger',
                    }, {root:true,})
                    throw new Error()
                }
        },

    },
    getters:{
        token(state){
            return state.token
        },
        isAuthenticated(_, getters){
            return !!getters.token
        },

    },


}