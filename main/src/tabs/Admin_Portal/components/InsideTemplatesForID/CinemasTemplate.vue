<template>
   <app-loader v-if="loading"/>
  <div class="card" v-else-if="cinema">
           <div class="breadcrumbs">
          <router-link to="/admin/cinemas">Вернуться к списку кинотеатров</router-link>
      </div>
       <h3 class="card-title">
          <span>{{cinema.cinemaName }}</span> 
      </h3>
      <p>г.{{cinema.city}}</p>
      <div v-if="cinema.hallamounts>0">
        <hall v-for=" el of cinema.hallamounts " :key="el" :info="info={'val':{...cinema.val[`id${el}`]}, id:el}" ></hall>
      </div>
     <!-- :id='el' -->
      
      <hr/>
      <button class="btn" @click="update">Изменить</button>
      <button class="btn danger" @click="remove">Удалить</button>

  </div>
    <h3 class="text-center text-white" v-else>
      Кинотеатра с таким ID = {{$route.params.idc}} нет.
  </h3>
</template>

<script>
// import {computed} from 'vue'
import {ref, onMounted} from 'vue'
import {useRoute, useRouter} from 'vue-router'
import { useStore } from "vuex";
// import {date} from '../../use/date'
import  AppLoader from '../../ui/AppLoader.vue'
import Hall from '../../hall/Hall.vue';

export default {
      components:{
        AppLoader,
            Hall,
    },
    setup(){
        const route = useRoute()
        const router = useRouter()
        const store = useStore()
        const loading = ref(false)
        const cinema = ref({})
        // const keyS = route.path.split('/')[route.path.split('/').length-1]
        // const films =  computed(()=> store.getters['requests/films'].filter(elem =>elem.id === keyS))
        // const film = films.value[0]


        onMounted(async()=>{
            loading.value = true
            cinema.value = await store.dispatch('requests/loadByID',{
                rType:'cinemas',
                id:route.params.idc,
            },)
            loading.value = false
            console.log(cinema);

        })
        const remove =async()=>{
            await store.dispatch('requests/remove',{
                rType:'cinemas',
                id:route.params.idc,
            },)
            router.push('/admin/cinemas')
        }

        const update = ()=>{
            
        }        
        
        return{
            loading,
            // date,
            cinema,
            remove,
            update
        }
    }
}
</script>

<style scoped>
    /* .wrapper-Canvas {
    width: 500px;
    height: 250px;
    background: lightblue;
} */
</style>