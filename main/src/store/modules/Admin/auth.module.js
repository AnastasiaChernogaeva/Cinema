import axios from "axios";
import store from "../..";
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

                // const data = await response.json()

                // if(response.ok){
                //             console.log(data)
                //             commit('setToken', data.idToken)
                // }
                // else{
                //     const err = data.error.message
                //     console.log('Error:', err)
                //        dispatch('admin/setMess',{value:error(err), type:'danger',}, {root:true,});
                //     throw new Error()
                //     }

                try{
                const {data} = await axios.post(`https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=${process.env.VUE_APP_FB_KEY}`, {...payload, returnSecureToken:true,})
                // console.log(data.idToken)
                commit('setToken', data.idToken)
                } catch(e){
                    // console.log(store._modules.root._children.admin.action.setMess)
                    dispatch('admin/setMess',{value:error(e.response.data.error.message), type:'danger',}, {root:true,})
                    // console.log(error(e.response.data.error.message));
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