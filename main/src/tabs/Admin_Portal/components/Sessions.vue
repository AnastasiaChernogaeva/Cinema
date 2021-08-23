<template>
  <h4 v-if="sessions.length === 0" class="text-center">Сеансов пока нет</h4>
   <div v-else >
    <table  class="table">
      <thead>
        <tr>
          <th>#</th>
          <th>Кинотеатр</th>
          <th>Время</th>
          <th>Фильм</th>
          <th>Зал</th>
          <th>Места</th>
          <th>Дополнительные услуги</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(session,idx) in sessions" :key="idx" >
          <!-- <router-link v-slot="{navigate}" custom :to="{name:'session', params:{ids:session.id}}"> -->
          <td></td>
          <td></td>
          <!-- <td @click="navigate"></td> -->
          <td></td>
          <td></td>
          <td></td>
          <td></td>
          <!-- </router-link> -->
        </tr>
      </tbody>
    </table>
        <hr/>
    <small>Нажмите на сеанс для получения дополнительной информации</small>
    </div>
</template>

<script>
export default {
  props:['sessions']
}
</script>

<style>

</style>