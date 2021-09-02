import axios from '../../../axios/requests'
import store from "../../index";

export default {
    namespaced:true,
    state(){
        return{
            films:[],
            cinemas:[],
            sessions:[],
            services:[],
            users:[],
        }
    },
    mutations:{
        setRequests(state, requests){
            state[requests.rType] = requests.info
        },

    },
    actions:{
        async create({commit, dispatch}, payload){
            try{
                 const token = store.getters['authClient/token']
                 const {data} = await axios.post(`/${payload.rType}.json?auth=${token}`,payload.value)
                 commit('addRequest',{...payload, id:data.name});
                 // console.log({data})
                     const body_D = {value:'Добавление прошло успешно', type:'primary',}
                     dispatch('client/setMess', body_D , {root:true,})
            }catch(e){
             const body_D = {value:e.message, type:'danger',}
             dispatch('client/setMess', body_D , {root:true,})
            }
         },
        
         loadAll({commit,}, arr){
            try{

                 arr.forEach(async element => {
                 const {data} = await axios.get(`/${element}.json`)
                 if(data){
                  const requests = Object.keys(data).map(id =>({...data[id], id}))
                  commit('setRequests',{rType:element, info:requests,});
                 }
                }
                    
                );
            }catch(e){
                return false
            }
         },
         
        async loadByID(_, payload){
            try{
                 const {data} = await axios.get(`/${payload.rType}/${payload.id}.json`)
                 return data
            }catch(e){
            }
         }, 

        async load({commit}, payload){
           try{
                const {data} = await axios.get(`/${payload.rType}.json`)
                const requests = Object.keys(data).map(id =>({...data[id], id}))
                commit('setRequests',{...payload, info:requests,});
                return requests
           }catch(e){
           }
        },   

        async buyTickets({commit}, payload){
           try{
                const token = store.getters['authClient/token']
                const {data} = await axios.get(`/${payload.rType}/${payload.id}.json?auth=${token}`)
                console.log(data);
                // let sessionInfo=data.sessionInfo||{}
                // sessionInfo[payload.value.id] = payload.value.info
                // const requests ={...data, }
                // commit('setRequests',{...payload, info:requests,});
                return requests
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
          services(state){
            return  state.services
          },
          users(state){
            return  state.users
          },
        
        
    }
}