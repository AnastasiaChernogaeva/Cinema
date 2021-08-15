export default{
    
    state(){
        return{
            isStarted:false,
        }
    },
    mutations:{
        ideas(state){
            state.isStarted=true
        }

    },
    getters:{
        val(state){
            return state.isStarted
        }
    },

}