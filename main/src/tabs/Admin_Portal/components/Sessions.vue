<template>
  <h4 v-if="sessions.length === 0" class="text-center">Сеансов пока нет</h4>
    <table v-else class="table">
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
        <tr>
          <td></td>
          <td></td>
          <td></td>
          <td></td>
          <td></td>
          <td></td>
          <td></td>
        </tr>
      </tbody>
    </table>
</template>

<script>
export default {
  props:['sessions']
}
</script>

<style>

</style>