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