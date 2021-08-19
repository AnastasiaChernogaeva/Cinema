<template>
  <h4 v-if="additionalServices.length === 0" class="text-center">Дополнительных услуг пока нет</h4>
    <table v-else class="table">
      <thead>
        <tr>
          <th>#</th>
          <th>Название</th>
          <th>Цена</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td></td>
          <td></td>
          <td></td>
        </tr>
      </tbody>
    </table>
</template>

<script>
export default {
  props:['additionalServices']
}
</script>

<style>

</style>