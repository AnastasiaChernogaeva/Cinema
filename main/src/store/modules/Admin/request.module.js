import axios from '../../../axios/requests'
import store from "../../index";

export default {
    namespaced:true,
    state(){
        return{
            films:[],
            cinemas:[],
            sessions:[],
            addServices:[],
        }
    },
    mutations:{
        setRequests(state, requests){
            state.requests = requests
        },
        addRequest(state, request){
            state[request.rType].push(request.value)
        },

    },
    actions:{
        async create({commit, dispatch}, payload){
           try{
               console.log(store);
                const token = store.getters['authAdmin/token']
                console.log(token);
                const {data} = await axios.post(`/${payload.rType}.json?auth=${token}`,payload.value)
                console.log(data.name);
                commit('addRequest',{...payload, id:data.name});
                    const body_D = {value:'Добавление прошло успешно', type:'primary',}
                    dispatch('admin/setMess', body_D , {root:true,})
           }catch(e){
            const body_D = {value:e.message, type:'danger',}
            dispatch('admin/setMess', body_D , {root:true,})
           }
        },
        async load({commit, dispatch},){
           try{
                const token = store.getters['authAdmin/token']
                const {data} = await axios.get(`/${payload.rType}.json?auth=${token}`)
                // commit('setRequests',{...payload, id:data.name});
           }catch(e){
           }
        },
        
    },
    getters:{
        films(state){
          return  state.films
        },
        cinemas(state){
            return  state.cinemas
          },
        sessions(state){
            return  state.sessions
          },
        addServices(state){
            return  state.addServices
          },
        
    }
}