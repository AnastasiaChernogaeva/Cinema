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
          <th>Статус</th>
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
        </tr>
      </tbody>
    </table>
</template>

<script>
export default {
  props:['films']
}
</script>

<style>

</style>