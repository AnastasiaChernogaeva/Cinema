export default{
    namespaced:true,
    state(){
        return{
            message:null,
        }
    },
    mutations:{
        setMessage(state, message){
            state.message = message
        },
        clearMessage(state){
            state.message = null
        }
    },
    action:{
        setMess({commit}, message){
            commit('setMessage', message)
            setTimeout(()=>{
                commit('clearMessage')
            }
            ,5000)
        },

    },
    getters:{
        fn(state){
            return state.isStarted
        }
    },

}