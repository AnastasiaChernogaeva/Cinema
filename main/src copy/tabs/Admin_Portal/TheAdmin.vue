<template>
<div class="container">
        <div class="card portal">
        <small class="admin">Админский портал </small>
        </div>
        
        <component :is="layout" v-if="layout"></component>
</div>
</template>

<script>
import { computed, } from "vue";
import { useRoute, useRouter  } from "vue-router";
import MainAdmin from "./layout/Main.vue";
import Login from "./layout/Login.vue";


export default{
        components:{
                MainAdmin,
                Login,
        },
        setup(){
                const route = useRoute()
                
                // console.log(route.matched)
                return{
                        layout:computed(()=>route.meta.layout),
                }
        },
}
        
</script>
