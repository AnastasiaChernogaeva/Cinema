<template>

  <h4 v-if="cinemas.length === 0" class="text-center">Кинотеатров пока нет</h4>
   <div v-else >
    <table  class="table">
      <thead>
        <tr>
          <th>#</th>
          <th>Город</th>
          <th>Название</th>
          <th>Количество залов</th>
          <!-- <th>План зала(ов)</th> -->
        </tr>
      </thead>
      <tbody>
        <tr v-for="(cinema,idx) in cinemas" :key="idx">
          <router-link v-slot="{navigate}" custom :to="{name:'cinema', params:{idc:cinema.id}}">
          <td>{{idx + 1}}</td>
          <td >{{cinema.city}}</td>
          <td @click="navigate">{{cinema.cinemaName}}</td>
          <td>{{cinema.hallamounts}}</td>
          <!-- <td></td> -->
          </router-link> 

        </tr>
      </tbody>
    </table>
    <hr/>
    <small>Нажмите на кинотеатр для получения дополнительной информации</small>
    </div>
</template>

<script>
export default {
  props:['cinemas']
}
</script>

<style>

</style>