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
        }
    },
    mutations:{
        setRequests(state, requests){
            state[requests.rType] = requests.info
        },

    },
    actions:{
        
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
        
    }
}