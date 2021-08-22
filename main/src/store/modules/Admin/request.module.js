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
            state[requests.rType=='services'?'addServices':requests.rType] = requests.info
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
                const {data} = await axios.post(`/${payload.rType}.json?auth=${token}`,payload.value)
                commit('addRequest',{...payload, id:data.name});
                    const body_D = {value:'Добавление прошло успешно', type:'primary',}
                    dispatch('admin/setMess', body_D , {root:true,})
           }catch(e){
            const body_D = {value:e.message, type:'danger',}
            dispatch('admin/setMess', body_D , {root:true,})
           }
        },

        async load({commit, dispatch}, payload){
           try{
                const token = store.getters['authAdmin/token']
                const {data} = await axios.get(`/${payload.rType=='services'?'addServices':payload.rType}.json?auth=${token}`)
                const requests = Object.keys(data).map(id =>({...data[id], id}))
                commit('setRequests',{...payload, info:requests,});
           }catch(e){
           }
        },
        async loadByID(_, payload){
            try{
                 const token = store.getters['authAdmin/token']
                 const {data} = await axios.get(`/${payload.rType=='services'?'addServices':payload.rType}/${payload.id}.json?auth=${token}`)
                 return data
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