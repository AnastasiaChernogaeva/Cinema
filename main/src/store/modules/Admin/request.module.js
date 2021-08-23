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
                const {data} = await axios.get(`/${payload.rType}.json?auth=${token}`)
                const requests = Object.keys(data).map(id =>({...data[id], id}))
                commit('setRequests',{...payload, info:requests,});
           }catch(e){
           }
        },
        async loadByID(_, payload){
            try{
                 const token = store.getters['authAdmin/token']
                 const {data} = await axios.get(`/${payload.rType}/${payload.id}.json?auth=${token}`)
                 return data
            }catch(e){
            }
         },   
         async remove({dispatch}, payload){
            try{
                 const token = store.getters['authAdmin/token']
                await axios.delete(`/${payload.rType}/${payload.id}.json?auth=${token}`)
                const body_D = {value:'Удаление прошло успешно', type:'primary',}
                dispatch('admin/setMess', body_D , {root:true,})

            }catch(e){
                const body_D = {value:e.message, type:'danger',}
                dispatch('admin/setMess', body_D , {root:true,})
            }
         }, 
        //  async update({dispatch}, payload){
        //     try{
        //          const token = store.getters['authAdmin/token']
        //         await axios.put(`/${payload.rType=='services'?'addServices':payload.rType}/${payload.id}.json?auth=${token}`, payload.value )
        //         const body_D = {value:'Обновление прошло успешно', type:'primary',}
        //         dispatch('admin/setMess', body_D , {root:true,})
        //     }catch(e){
        //         const body_D = {value:e.message, type:'danger',}
        //         dispatch('admin/setMess', body_D , {root:true,})
        //     }
        //  },         
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