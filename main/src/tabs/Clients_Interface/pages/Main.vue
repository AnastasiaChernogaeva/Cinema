<template> 
<div>
    <all-active-movies></all-active-movies>
    <all-sessions :search="search"></all-sessions>
    </div>
</template>

<script>
import { useStore } from 'vuex';
import { onMounted, onUpdated, ref, computed,watch} from "vue";
import AllActiveMovies from '../../Clients_Interface/components/AllActiveMovies.vue';
import AllSessions from '../../Clients_Interface/components/Inside/AllSessions.vue';

export default {
    props:['search'],
    components:{
        AllActiveMovies,
        AllSessions,
    },
}
</script>

<style>

</style>