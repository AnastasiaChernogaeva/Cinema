export default{
    
    state(){
        return{
            auth:true,
            // auth:false,
            isStarted:false,
        }
    },
    mutations:{

    },
    action:{
        authentification(state, payload){
           setTimeout(()=>{
               state.auth=true
               console.log("LogIn")
        }, 500) 
        },

    },
    getters:{
        fn(state){
            return state.isStarted
        }
    },

}