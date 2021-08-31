<template>

  <h4 v-if="films.length === 0" class="text-center">Фильмов пока нет</h4>
    <div v-else >
      <table class="table">
      <thead>
        <tr>
          <th>#</th>
          <th>Название</th>
          <!-- <th>Жанр</th> -->
          <th>Начало показа</th>
          <th>Окончание показа</th>
          <th>Постер</th>
          <th>Статус</th>
          <!-- <th>Действие</th> -->
        </tr>
      </thead>
      <tbody>
        <tr v-for="(film,idx) in films" :key="idx">
<router-link v-slot="{navigate}" custom :to="{name:'film', params:{idf:film.id}}">
          <td>{{ idx + 1}}</td>
          <td @click="navigate">{{film.filmName}}</td>
          <!-- <td>{{film.genre}}</td> -->
          <td>{{date(film.startTime)}}</td>
          <td>{{date(film.finishTime)}}</td>
          <td><img :alt="film.filmName" :src="film.movieposter" ></td>
          <!-- {{film.movieposter}} -->
          <td><app-status :className="Date.parse(film.finishTime)>Date.parse(new Date())?'primary':'danger'">{{Date.parse(film.finishTime)>Date.parse(new Date())?"В прокате":"Показ завершен"}}</app-status></td>
          <!--  -->
     <!-- 
          <td>
            <button class="btn primary"   >Открыть</button>
          </td>  
     --></router-link>
        </tr>
      </tbody>
    </table>
    <hr/>
    <small>Для получения подробной информации о фильме нажмите на строку с ним</small>
    </div>
</template>

<script>
import {date} from '../use/date'
import AppStatus from "../ui/AppStatus.vue";

export default {
  props:['films'],
  components:{
    AppStatus,
  },
  setup(){
    return{
      date
    }
  }
}
</script>

<style>

</style>