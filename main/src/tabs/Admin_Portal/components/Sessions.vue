<template>
  <h4 v-if="sessions.length === 0" class="text-center">Сеансов пока нет</h4>
   <div v-else >
    <table  class="table">
      <thead>
        <tr>
          <th>#</th>
          <th>Город</th>
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
          <router-link v-slot="{navigate}" custom :to="{name:'session', params:{ids:session.id}}">
          <td>{{idx+1}}</td>
          <td>{{session.cityName}}</td>
          <td @click="navigate">{{session.chosenCinemaName}}</td>
          <td>{{session.startSessionTime}}</td>
          <td>{{session.sessionFilmName}}</td>
          <td>{{session.hallnumber.split("")[session.hallnumber.split("").length-1]}}</td>
          <td>
            <div>{{session.pricesCPl?`Места для двоих - ${session.pricesCPl}BYN`:null}}</div>
            <br>
            <div>{{session.pricesSPl?`Обычные места - ${session.pricesSPl}BYN`:null}}</div>
            <br>
            <div>{{session.pricesVPl?`VIP места - ${session.pricesVPl}BYN`:null}}</div>

            </td>
             <td>
               {{session.chosenAddServices && session.chosenAddServices.length>0?'Есть':'Нет'}}
            </td>
          </router-link>
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

<style scoped>
td{
  width:12%
}

</style>