<template>
  <h4 v-if="additionalServices.length === 0" class="text-center">Дополнительных услуг пока нет</h4>
    <table v-else class="table">
      <thead>
        <tr>
          <th>#</th>
          <th>Название</th>
          <th>Цена в бел.рублях</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(service,idx) in additionalServices" :key="idx">
          <td>{{idx + 1}}</td>
          <td>{{service.addServices}}</td>
          <td>{{service.addServicesPrice}}</td>
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