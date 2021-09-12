<template> 
<!-- <app-lo v-if="isReady==0"></app-lo v-ader> else-->
<div>
    <span name="Top">Main</span>
    <all-active-movies ></all-active-movies>
    <all-sessions :search="search" ></all-sessions>
    <!-- <app-footer></app-footer> -->

</div>
</template>

<script>
// import {  ref} from "vue";
import { useRouter } from 'vue-router';
import AllActiveMovies from '../../Clients_Interface/components/AllActiveMovies.vue';
import AllSessions from '../../Clients_Interface/components/Inside/AllSessions.vue';
// import AppLoader from '../../Admin_Portal/ui/AppLoader.vue'
// import AppFooter from "../ui/AppFooter.vue";

export default {
    props:['search'],
    components:{
        AllActiveMovies,
        AllSessions,
        // AppLoader
        // AppFooter
    },
     setup(){
        const router = useRouter
        // const isReady = ref(0)
        // const add = ()=>{
        //     isReady.value++
        //     console.log(isReady.value);
        // }
 



        return{
            logout:() =>{
                store.commit('authClient/logout')
                router.push('/cinemaMain/loginUser')
            },
            // isReady,
        }
    }

}
</script>
