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
    actions:{
        setMess(state, message){
            state.commit('setMessage', message)
            setTimeout(()=>{
                state.commit('clearMessage')
            }
            ,5000)
        },

    },
    getters:{
        message(state){
            return state.message
        },
    },

}