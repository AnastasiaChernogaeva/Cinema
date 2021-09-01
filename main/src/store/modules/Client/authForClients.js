import axios from "axios";
import store from "../..";
import {error} from "../../../tabs/Admin_Portal/utils/error";

const TOKEN_KEY_CLIENT = 'jwt-token-client'

export default{
    namespaced:true,
    state(){
        return{
            token:localStorage.getItem(TOKEN_KEY_CLIENT),
        }
    },
    mutations:{
        setToken(state, token){
            state.token = token
            localStorage.setItem(TOKEN_KEY_CLIENT, token)
        },
        logout(state){
            state.token = null
            localStorage.removeItem(TOKEN_KEY_CLIENT)
        },
    },
    actions:{
        async login({commit, dispatch,}, payload){

                try{
                const {data} = await axios.post(`https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=${process.env.VUE_APP_FB_KEY}`, {...payload, returnSecureToken:true,})
                commit('setToken', data.idToken)
                commit('clients/clearMessage', null, {root:true,})
                } catch(e){
                    const resER = error(e.response.data.error.message)
                    const body_D = {value:resER, type:'danger',}
                    dispatch('clients/setMess', body_D , {root:true,})
                    // console.log(error(e.response.data.error.message));
                    throw new Error()
                }
        },
        async register({commit, dispatch,}, payload){

            try{
            const {data} = await axios.post(`https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=${process.env.VUE_APP_FB_KEY}`, {...payload, returnSecureToken:false,})
            commit('setToken', data.idToken)
            commit('clients/clearMessage', null, {root:true,})
            dispatch('gettingInfo/create', {rType:"users", value:{...payload} } , {root:true,})
            } catch(e){
                const resER = error(e.response.data.error.message)
                const body_D = {value:resER, type:'danger',}
                dispatch('clients/setMess', body_D , {root:true,})
                


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