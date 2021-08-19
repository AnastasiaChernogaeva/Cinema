<template>
  <h4 v-if="cinemas.length === 0" class="text-center">Кинотеатров пока нет</h4>
    <table v-else class="table">
      <thead>
        <tr>
          <th>#</th>
          <th>Город</th>
          <th>Название</th>
          <th>Количество залов</th>
          <th>План зала(ов)</th>
        </tr>
      </thead>
      <tbody>
        <tr>
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
  props:['cinemas']
}
</script>

<style>

</style>