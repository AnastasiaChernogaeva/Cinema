<template>
   <app-loader v-if="loading"/>
  <div class="card" v-else-if="film">
     <div class="breadcrumbs">
          <router-link to="/admin/films">Вернуться к списку фильмов</router-link>
      </div>
       <h3 class="card-title">
           <!-- <span>LOVE is in the AIR </span> -->
          <span>{{film.filmName}}</span> 
          <span v-if="film.startTime"><small>Время показа: {{date(film.startTime)}} - {{date(film.finishTime)}}</small></span>
      </h3>
      <small>Жанр:{{film.genre}}</small>
      <hr/>
      <div>
          <img :alt="film.filmName" :src="film.movieposter" class="templateImg" >
          <h3>Описание
          </h3>
          <p>
              {{film.filmDescription}}
          </p>
      </div>
      
      <hr/>
      <!-- <button class="btn primary" @click="update">Изменить</button> -->
      <button class="btn danger" @click="remove">Удалить</button>

  </div>
    <h3 class="text-center text-white" v-else>
      Фильма с таким ID = {{$route.params.idf}} нет.
  </h3>
</template>

<script>
// import {computed} from 'vue'
import {ref, onMounted} from 'vue'
import {useRoute, useRouter} from 'vue-router'
import { useStore } from "vuex";
import {date} from '../../use/date'
import  AppLoader from '../../ui/AppLoader.vue'

export default {
      components:{
        AppLoader,
    },
    setup(){
        const route = useRoute()
        const router = useRouter()
        const store = useStore()
        const loading = ref(false)
        const film = ref({})
        // const keyS = route.path.split('/')[route.path.split('/').length-1]
        // const films =  computed(()=> store.getters['requests/films'].filter(elem =>elem.id === keyS))
        // const film = films.value[0]


        onMounted(async()=>{
            loading.value = true
            film.value = await store.dispatch('requests/loadByID',{
                rType:'films',
                id:route.params.idf,
            },)
            loading.value = false

        })

         const remove = async()=>{
            await store.dispatch('requests/remove',{
                rType:'films',
                id:route.params.idf,
            },)
            router.push('/admin/films')
        }

        const update = ()=>{
            
        }
        return{
            loading,
            date,
            film,
            remove,
            update
        }
    }
}
</script>

<style scoped>

@media all and (max-width:1010px){
   div.card {
    padding-top:8rem;
}
}
</style>