import axios from '../../../axios/requests'
import store from "../../index";

export default {
    namespaced:true,
    state(){
        return{
            requests:[]
        }
    },
    mutations:{
        setRequests(state, requests){
            state.requests = requests
        },
        addRequest(state, request){
            state.requests.push(request)
        },

    },
    actions:{
        async create({commit, dispatch}, payload){
           try{
               console.log(store);
                const token = store.getters['authAdmin/token']
                console.log(token);
                const {data} = await axios.post(`/${payload.rType}.json?auth=${token}`,payload.value)
                console.log(payload);
                    const body_D = {value:'Добавление прошло успешно', type:'primary',}
                    dispatch('admin/setMess', body_D , {root:true,})
           }catch(e){
            const body_D = {value:e.message, type:'danger',}
            dispatch('admin/setMess', body_D , {root:true,})
           }
        },
        
    },
    // mutations:{
    //     add(state, requests){
    //         state.requests = requests
    //     },
        
    // }
}