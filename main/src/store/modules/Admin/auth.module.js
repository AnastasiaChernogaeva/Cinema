const TOKEN_KEY = 'jwt-token'

export default{
    namespaced:true,
    state(){
        return{
            token:localStorage.getItem(TOKEN_KEY),
        }
    },
    mutations:{
        setToken(state, token){
            state.token = token
            localStorage.setItem(TOKEN_KEY, token)
        },
        logout(state){
            state.token = null
            localStorage.removeItem(TOKEN_KEY)
        },
    },
    actions:{
        async login({commit}, payload){
            // console.log(payload);//payload - это тело, которое мы должны отправить на сервер
            // commit('setToken', "TEST TOKEN")

            // console.log(payload, process.env.VUE_APP_FB_KEY);
               
        try{
     const response = await fetch(`https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=${process.env.VUE_APP_FB_KEY}`,{
        method:'POST',
        headers:{
          'Content-Type':'application/json',
        },
        body:JSON.stringify(payload)
      })
      const data = await response.json()
    //   console.log(data)
    }
    catch(e){
        console.log('Error:', e.message)
    }
        },

    },
    getters:{
        token(state){
            return state.token
        },
        isAuthenticated(_, getters){
            return !!getters.token
        },

    },


}