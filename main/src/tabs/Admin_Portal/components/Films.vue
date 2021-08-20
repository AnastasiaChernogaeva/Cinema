<template>
  <h4 v-if="films.length === 0" class="text-center">Фильмов пока нет</h4>
    <table v-else class="table">
      <thead>
        <tr>
          <th>#</th>
          <th>Название</th>
          <th>Описание</th>
          <th>Начало показа</th>
          <th>Окончание показа</th>
          <th>Постер</th>
          <th>Статус</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(film,idx) in films" :key="idx">
          <td>{{ idx + 1}}</td>
          <td>{{film.filmName}}</td>
          <td>{{film.filmDescription}}</td>
          <td>{{film.startTime}}</td>
          <td>{{film.finishTime}}</td>
          <td><img :alt="film.filmName" :src="film.movieposter" ></td>
          <!-- {{film.movieposter}} -->
          <td>{{Date.parse(film.finishTime)>Date.parse(new Date())?"В прокате":"Показ завершен"}}</td>
        </tr>
      </tbody>
    </table>
</template>

<script>
export default {
  props:['films'],
}
</script>

<style>

</style>