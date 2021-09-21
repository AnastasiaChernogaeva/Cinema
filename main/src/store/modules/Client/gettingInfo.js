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
            orders:[],
            users:[],
        }
    },
    mutations:{
        setRequests(state, requests){
            state[requests.rType] = requests.info
        },
        // addRequestsMeaning(state, requests){
        //     state[requests.rType].push(requests.info)
        // },

    },
    actions:{
        async create({commit, dispatch}, payload){
            try{
                 const token = store.getters['authClient/token']
                 const {data} = await axios.post(`/${payload.rType}.json?auth=${token}`,payload.value)
                //  commit('addRequest',{...payload, id:data.name});
                 // console.log({data})
                     const body_D = {value:'Добавление прошло успешно', type:'primary',}
                     dispatch('clients/setMess', body_D , {root:true,})
            }catch(e){
             const body_D = {value:e.message, type:'danger',}
             dispatch('clients/setMess', body_D , {root:true,})
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
                //  console.log(data);
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
                const {data} = await axios.get(`/users.json`)
                const email = store.getters['authClient/activeUserEmail']
                const keys = Object.keys(data)
                let key 
                keys.forEach((kkey, )=>{
                    if (data[kkey].email===email){
                        key = kkey
                    }
                })
                if(key===undefined){
                    commit('authClient/logout', null, {root:true,})
                }
                else{
                    const {data:inData} =  await axios.post(`/${payload.rType}.json`, {...payload.info, uid:key, })
                }
                
                // console.log(inData);
                // await store.dispatch('gettingInfo/load', {rType:'orders'})
                // commit('addRequestsMeaning',{rType:payload.rType, info:{...payload.info, uid:key, },});


           }catch(e){
           }
        },   

        async resetPassword({commit}, payload){
           try{
                const {data:inData} =  await axios.patch(`/${payload.rType}/${payload.id}.json`, {...payload.info,nPassword:payload.nPassword})
              


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
        orders(state){
            return  state.orders
        },
        
        
    }
}